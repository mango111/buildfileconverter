export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "www.buildfileconverter.com") {
      url.hostname = "buildfileconverter.com";
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  }
};
