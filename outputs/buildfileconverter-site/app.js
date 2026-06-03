const sampleBuild = {
  game: "poe2",
  format: "buildfileconverter.sample.v0",
  class: "Mercenary",
  skills: ["Explosive Shot"],
  notes: "Sample only. Replace with your real build data."
};

const paths = {
  windows: {
    label: "Windows path",
    value: "%USERPROFILE%\\Documents\\My Games\\Path of Exile 2\\BuildPlanner"
  },
  macos: {
    label: "macOS path",
    value: "~/Library/Application Support/Path of Exile 2/BuildPlanner"
  },
  linux: {
    label: "Linux / Steam Proton path",
    value: "~/.steam/steam/steamapps/compatdata/[APP_ID]/pfx/drive_c/users/steamuser/Documents/My Games/Path of Exile 2/BuildPlanner"
  }
};

const el = {
  sourceText: document.querySelector("#sourceText"),
  convertSourceBtn: document.querySelector("#convertSourceBtn"),
  loadSourceSampleBtn: document.querySelector("#loadSourceSampleBtn"),
  clearSourceBtn: document.querySelector("#clearSourceBtn"),
  sourceStatusCard: document.querySelector("#sourceStatusCard"),
  sourceStatusTitle: document.querySelector("#sourceStatusTitle"),
  sourceStatusCopy: document.querySelector("#sourceStatusCopy"),
  sourceTypeOut: document.querySelector("#sourceTypeOut"),
  sourceOutputOut: document.querySelector("#sourceOutputOut"),
  sourceNotesOut: document.querySelector("#sourceNotesOut"),
  downloadManifestBtn: document.querySelector("#downloadManifestBtn"),
  sendToCheckerBtn: document.querySelector("#sendToCheckerBtn"),
  fileInput: document.querySelector("#fileInput"),
  buildText: document.querySelector("#buildText"),
  analyzeBtn: document.querySelector("#analyzeBtn"),
  sampleBtn: document.querySelector("#sampleBtn"),
  trySampleTop: document.querySelector("#trySampleTop"),
  clearBtn: document.querySelector("#clearBtn"),
  statusCard: document.querySelector("#statusCard"),
  statusTitle: document.querySelector("#statusTitle"),
  statusCopy: document.querySelector("#statusCopy"),
  kindOut: document.querySelector("#kindOut"),
  sizeOut: document.querySelector("#sizeOut"),
  lineOut: document.querySelector("#lineOut"),
  keysOut: document.querySelector("#keysOut"),
  warningsOut: document.querySelector("#warningsOut"),
  downloadBtn: document.querySelector("#downloadBtn"),
  downloadSampleBtn: document.querySelector("#downloadSampleBtn"),
  tabs: document.querySelectorAll(".tab"),
  osLabel: document.querySelector("#osLabel"),
  pathOut: document.querySelector("#pathOut"),
  copyPathBtn: document.querySelector("#copyPathBtn")
};

let normalizedJson = "";
let sourceManifest = "";

function trackEvent(name, params = {}) {
  if (!window.BFC_ANALYTICS_ENABLED || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

function bytes(value) {
  if (value < 1024) return `${value} B`;
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;
  return `${(value / 1024 / 1024).toFixed(1)} MB`;
}

function analyzeContent(content, fileName = "") {
  const trimmed = content.trim();
  const result = {
    inputKind: "empty",
    fileName,
    sizeBytes: new Blob([content]).size,
    lineCount: content ? content.split(/\r\n|\r|\n/).length : 0,
    topLevelKeys: [],
    warnings: [],
    errors: [],
    canDownloadNormalized: false,
    normalized: ""
  };

  if (!trimmed) {
    result.errors.push("No content found. Paste or upload a build file first.");
    return result;
  }

  if (result.sizeBytes > 512 * 1024) {
    result.warnings.push("This file is larger than 512 KB. For v0, inspect large files carefully before importing.");
  }

  try {
    const parsed = JSON.parse(trimmed);
    result.inputKind = "json";
    result.normalized = JSON.stringify(parsed, null, 2);
    result.canDownloadNormalized = true;

    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      result.topLevelKeys = Object.keys(parsed).slice(0, 12);
    } else {
      result.warnings.push("The file parses as JSON, but it is not a top-level object.");
    }

    const joinedKeys = result.topLevelKeys.join(" ").toLowerCase();
    if (!joinedKeys.includes("game") && !joinedKeys.includes("class") && !joinedKeys.includes("skill")) {
      result.warnings.push("No obvious game/class/skill keys were found. This may still import, but it is not self-descriptive.");
    }

    if (fileName && !fileName.toLowerCase().endsWith(".build") && !fileName.toLowerCase().endsWith(".json")) {
      result.warnings.push("The file extension is unusual. PoE2 import flows may expect a .build file.");
    }
  } catch (error) {
    result.inputKind = /^[\x00-\x08\x0E-\x1F]/.test(trimmed) ? "unsupported" : "text";
    result.errors.push("This content is not valid JSON. v0 can still show import guidance, but cannot normalize it.");

    if (/pobb\.in|pathofexile|poe/i.test(trimmed)) {
      result.warnings.push("This looks like a build link or note. A future converter can transform links into .build files.");
    }
    if (trimmed.length < 40) {
      result.warnings.push("The content is very short. It may be a link, note, or incomplete file.");
    }
  }

  return result;
}

function classifyBuildSource(raw) {
  const trimmed = raw.trim();
  if (!trimmed) {
    return {
      type: "empty",
      output: "none",
      manifest: "",
      canDownload: false,
      canCheck: false,
      status: "bad",
      title: "No source found",
      copy: "Paste a build link, PoB code, or JSON build file first.",
      notes: ["No source found."]
    };
  }

  try {
    const parsed = JSON.parse(trimmed);
    const manifest = JSON.stringify(parsed, null, 2);
    return {
      type: ".build JSON",
      output: "normalized .build",
      manifest,
      canDownload: true,
      canCheck: true,
      status: "good",
      title: "JSON build file normalized",
      copy: "This source can be downloaded as a normalized .build file.",
      notes: [
        "Valid JSON detected.",
        "Use the checker below to inspect top-level keys and import readiness."
      ]
    };
  } catch {}

  let url = null;
  try {
    url = new URL(trimmed);
  } catch {}

  const lower = trimmed.toLowerCase();
  const sourceType = url?.hostname.includes("pobb.in")
    ? "pobb.in link"
    : url?.hostname.includes("poe.ninja")
      ? "poe.ninja build URL"
      : url?.hostname.includes("pathofbuilding") || url?.hostname.includes("pathofexile")
        ? "Path of Exile build URL"
        : /^[a-z0-9+/=._-]{120,}$/i.test(trimmed.replace(/\s+/g, ""))
          ? "PoB code"
          : lower.includes("pobb.in")
            ? "pobb.in text"
            : lower.includes("poe.ninja")
              ? "poe.ninja text"
              : "build note";

  const manifestObject = {
    game: "poe2",
    format: "buildfileconverter.source.v1",
    importReady: false,
    conversionStatus: "source-captured",
    source: {
      type: sourceType,
      value: trimmed,
      capturedAt: new Date().toISOString()
    },
    notes: [
      "This starter file captures the build source for later conversion.",
      "Full game-ready conversion requires parsing the source format and matching the current PoE2 build schema.",
      "Use it as a clean handoff artifact, not as a guaranteed in-game import file."
    ]
  };

  return {
    type: sourceType,
    output: ".build starter",
    manifest: JSON.stringify(manifestObject, null, 2),
    canDownload: true,
    canCheck: true,
    status: "warn",
    title: "Source captured",
    copy: "A .build starter can be generated. Full game-ready conversion still needs source parsing.",
    notes: [
      `${sourceType} detected.`,
      "Generated output captures the source and conversion status.",
      "Next milestone: parse this source into real class, skill, passive, and item fields."
    ]
  };
}

function setSourceStatus(result) {
  el.sourceStatusCard.classList.remove("good", "warn", "bad");
  el.sourceStatusCard.classList.add(result.status);
  el.sourceStatusTitle.textContent = result.title;
  el.sourceStatusCopy.textContent = result.copy;
}

function renderSourceResult(result) {
  sourceManifest = result.manifest || "";
  setSourceStatus(result);
  el.sourceTypeOut.textContent = result.type;
  el.sourceOutputOut.textContent = result.output;
  el.sourceNotesOut.innerHTML = "";
  result.notes.forEach((note) => {
    const li = document.createElement("li");
    li.textContent = note;
    el.sourceNotesOut.append(li);
  });
  el.downloadManifestBtn.disabled = !result.canDownload;
  el.sendToCheckerBtn.disabled = !result.canCheck;
}

function runSourceConversion() {
  const result = classifyBuildSource(el.sourceText.value);
  renderSourceResult(result);
  trackEvent("build_source_converted", {
    source_type: result.type,
    output: result.output,
    can_download: result.canDownload
  });
}

function setStatus(result) {
  el.statusCard.classList.remove("good", "warn", "bad");
  if (result.errors.length) {
    el.statusCard.classList.add("bad");
    el.statusTitle.textContent = "Needs attention";
    el.statusCopy.textContent = result.errors[0];
  } else if (result.warnings.length) {
    el.statusCard.classList.add("warn");
    el.statusTitle.textContent = "Parseable with notes";
    el.statusCopy.textContent = "The file can be inspected, but review the warnings before importing.";
  } else {
    el.statusCard.classList.add("good");
    el.statusTitle.textContent = "Looks parseable";
    el.statusCopy.textContent = "The file structure can be normalized in this browser.";
  }
}

function renderResult(result) {
  normalizedJson = result.normalized || "";
  setStatus(result);
  el.kindOut.textContent = result.inputKind;
  el.sizeOut.textContent = bytes(result.sizeBytes);
  el.lineOut.textContent = String(result.lineCount);
  el.keysOut.textContent = result.topLevelKeys.length ? result.topLevelKeys.join(", ") : "-";

  const items = [...result.errors, ...result.warnings];
  el.warningsOut.innerHTML = "";
  const visibleItems = items.length
    ? items
    : ["No structural warnings found. Verify the file against the current game patch before importing."];
  visibleItems.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    el.warningsOut.append(li);
  });

  el.downloadBtn.disabled = !result.canDownloadNormalized;
}

function runAnalysis() {
  const result = analyzeContent(el.buildText.value, el.fileInput.files[0]?.name || "");
  renderResult(result);
  trackEvent("build_file_analyzed", {
    input_kind: result.inputKind,
    has_errors: result.errors.length > 0,
    has_warnings: result.warnings.length > 0,
    can_download_normalized: result.canDownloadNormalized
  });
}

function loadSample() {
  el.buildText.value = JSON.stringify(sampleBuild, null, 2);
  el.fileInput.value = "";
  runAnalysis();
  trackEvent("sample_loaded");
}

function loadSourceSample() {
  el.sourceText.value = "https://pobb.in/example-poe2-build";
  runSourceConversion();
  trackEvent("source_sample_loaded");
}

function downloadText(name, content) {
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.append(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

el.fileInput.addEventListener("change", async () => {
  const file = el.fileInput.files[0];
  if (!file) return;
  el.buildText.value = await file.text();
  runAnalysis();
});

el.convertSourceBtn.addEventListener("click", runSourceConversion);
el.loadSourceSampleBtn.addEventListener("click", loadSourceSample);
el.clearSourceBtn.addEventListener("click", () => {
  el.sourceText.value = "";
  sourceManifest = "";
  renderSourceResult(classifyBuildSource(""));
});
el.downloadManifestBtn.addEventListener("click", () => {
  if (!sourceManifest) return;
  downloadText("poe2-build-source.build", sourceManifest);
  trackEvent("source_manifest_downloaded");
});
el.sendToCheckerBtn.addEventListener("click", () => {
  if (!sourceManifest) return;
  el.buildText.value = sourceManifest;
  el.fileInput.value = "";
  runAnalysis();
  document.querySelector("#converter")?.scrollIntoView({ behavior: "smooth", block: "center" });
  trackEvent("source_sent_to_checker");
});
el.analyzeBtn.addEventListener("click", runAnalysis);
el.sampleBtn.addEventListener("click", loadSample);
el.trySampleTop.addEventListener("click", loadSample);
el.clearBtn.addEventListener("click", () => {
  el.fileInput.value = "";
  el.buildText.value = "";
  normalizedJson = "";
  renderResult(analyzeContent(""));
});

el.downloadBtn.addEventListener("click", () => {
  if (normalizedJson) {
    downloadText("normalized.build", normalizedJson);
    trackEvent("normalized_build_downloaded");
  }
});

el.downloadSampleBtn.addEventListener("click", () => {
  downloadText("sample-poe2.build", JSON.stringify(sampleBuild, null, 2));
  trackEvent("sample_build_downloaded");
});

el.tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    el.tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    const data = paths[tab.dataset.os];
    el.osLabel.textContent = data.label;
    el.pathOut.textContent = data.value;
  });
});

el.copyPathBtn.addEventListener("click", async () => {
  const text = el.pathOut.textContent;
  try {
    await navigator.clipboard.writeText(text);
    el.copyPathBtn.textContent = "Copied";
    setTimeout(() => {
      el.copyPathBtn.textContent = "Copy path";
    }, 1400);
    trackEvent("import_path_copied", { path_label: el.osLabel.textContent });
  } catch {
    el.copyPathBtn.textContent = "Select path above";
    setTimeout(() => {
      el.copyPathBtn.textContent = "Copy path";
    }, 1600);
  }
});
