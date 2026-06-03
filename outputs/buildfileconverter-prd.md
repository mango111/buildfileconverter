# BuildFileConverter PRD v1

## Current Conclusion
- Status: [NEEDS_REVIEW]
- One sentence: Build a lightweight game build file utility site, starting with a PoE2 `.build` validator/import helper instead of a full game build planner.

## Positioning
- Product name: BuildFileConverter
- Primary SEO entry: PoE2 `.build` Converter / PoE2 Build File Importer
- Site type: Utility tool + tutorial + template library
- Target market: US / English
- Core promise: Check, repair, understand, and import game build files without installing a heavy planner.

## ICP
| ICP | Job To Be Done | Pain | Priority |
|---|---|---|---|
| PoE2 player | Import a `.build` file shared by a guide or friend | Does not know where to put the file or why it fails | Primary |
| Build guide author | Share a clean build file with readers | Needs a quick validation/share workflow | Secondary |
| Tool/site operator | Convert/import build snippets across formats | Needs format examples and schema clues | Later |

## MVP Scope
### Must Have
- Upload or paste `.build` / JSON-like content.
- Detect whether the file looks like JSON, plain text, empty content, or unsupported binary.
- Show file size, line count, top-level keys, warnings, and likely import readiness.
- Offer OS-specific import paths for Windows, macOS, and Linux.
- Provide a sample `.build` template for testing.
- SEO pages for PoE2 build converter/importer/planner intent.

### Should Have
- One-click download of normalized JSON when input is valid.
- Client-side only processing note.
- Non-official disclaimer.

### Not Do
- No full passive tree editor in v1.
- No item affix database in v1.
- No DPS calculation in v1.
- No claim of official game support.
- No server-side user file storage.

## Route Contract
| Route | Index | Primary Keyword | H1 | User Task | Schema |
|---|---|---|---|---|---|
| `/` | index | build file converter | Build File Converter | Understand the tool and start validating a file | SoftwareApplication |
| `/poe2-build-converter` | index | poe2 build converter | PoE2 .build Converter | Convert/check a PoE2 build file | SoftwareApplication + FAQPage |
| `/poe2-build-file-importer` | index | poe2 build file importer | PoE2 Build File Importer | Find import paths and fix import issues | HowTo + FAQPage |
| `/poe2-build-planner` | index | poe2 build planner | PoE2 Build Planner Helper | Use planner-adjacent helper tools | Article + SoftwareApplication |
| `/templates` | index | poe2 build templates | Build File Templates | Download/sample build files | CollectionPage |
| `/privacy` | index | privacy policy | Privacy Policy | Trust/check data handling | WebPage |
| `/terms` | index | terms | Terms | Understand non-official status | WebPage |

## Page Matrix
### Home
- Hero: build file checker panel is first viewport.
- CTA: Paste a build file / Try sample.
- Sections: checks performed, import paths, why client-side.

### PoE2 Build Converter
- Above fold: same tool with PoE2-specific labels.
- Content: what `.build` files are, common errors, supported input.
- FAQ: Is this official? Does it store files? Why does import fail?

### PoE2 Build File Importer
- Above fold: OS tabs for import path instructions.
- Content: drag file location, naming tips, backup instructions.

### Templates
- Sample minimal JSON-like build file.
- Warnings that schema may change with game patches.

## Data Contract
Input is processed in browser only.

```ts
type AnalysisResult = {
  inputKind: "json" | "text" | "empty" | "unsupported";
  fileName?: string;
  sizeBytes: number;
  lineCount: number;
  topLevelKeys: string[];
  warnings: string[];
  errors: string[];
  canDownloadNormalized: boolean;
};
```

## Competitive Minimum
- A user can paste/upload a file and immediately know whether it is parseable.
- A user can find where to put a `.build` file on Windows/macOS/Linux.
- A user can download a sample file and test the workflow.
- The page is useful even if the full PoE2 schema changes.

## Risks
- P0: Brand/trademark risk if the site implies official affiliation. Mitigation: neutral domain, clear disclaimer.
- P1: Game format changes. Mitigation: frame validation as format helper, not authoritative simulator.
- P2: Competitors add richer planner features. Mitigation: start narrow, fast, and SEO-focused.

## Downstream Handoff
- Next stages: copywriting, compliance, frontend, QA.
- Must read: this PRD and `outputs/keyword-opportunity-report-2026-06-02.md`.
- Cannot assume: exact official `.build` schema or long-term patch stability.
- Recommended first build: static client-side MVP with no backend and no user data collection.
