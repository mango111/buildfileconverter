export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "www.buildfileconverter.com") {
      url.hostname = "buildfileconverter.com";
      return Response.redirect(url.toString(), 301);
    }

    const legacyRoutes = {
      "/poe2-build-converter": "/poe2-build-link-converter/",
      "/poe2-build-file-importer": "/poe2-build-importer/",
      "/templates": "/poe2-build-template/"
    };
    if (legacyRoutes[url.pathname]) {
      url.pathname = legacyRoutes[url.pathname];
      return Response.redirect(url.toString(), 301);
    }

    const canonicalRoutes = new Set([
      "/",
      "/privacy",
      "/privacy/",
      "/terms",
      "/terms/",
      "/poe2-build-planner/",
      "/poe2-build-importer/",
      "/poe2-build-link-converter/",
      "/poe2-pob2-build-converter/",
      "/poe2-build-template/",
      "/path-of-exile-2-build-tools/",
      "/pobb-in-to-build-file/"
    ]);

    const assetExtensions = /\.(css|js|json|xml|txt|svg|png|ico|webmanifest)$/i;
    if (!canonicalRoutes.has(url.pathname) && !assetExtensions.test(url.pathname)) {
      const notFoundUrl = new URL(request.url);
      notFoundUrl.pathname = "/404.html";
      const notFoundRequest = new Request(notFoundUrl.toString(), request);
      const response = await env.ASSETS.fetch(notFoundRequest);
      return new Response(response.body, {
        status: 404,
        headers: response.headers
      });
    }

    return env.ASSETS.fetch(request);
  }
};
