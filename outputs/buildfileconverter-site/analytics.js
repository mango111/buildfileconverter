(function () {
  var measurementId = window.BFC_GA_MEASUREMENT_ID;
  var isPlaceholder = !measurementId || measurementId === "G-XXXXXXXXXX";

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  if (isPlaceholder) {
    window.BFC_ANALYTICS_ENABLED = false;
    document.documentElement.dataset.analytics = "disabled-placeholder";
    return;
  }

  window.BFC_ANALYTICS_ENABLED = true;
  document.documentElement.dataset.analytics = "enabled";
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    send_page_view: true,
    anonymize_ip: true
  });

  var script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
  document.head.appendChild(script);
})();
