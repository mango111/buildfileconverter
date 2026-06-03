# BuildFileConverter

BuildFileConverter is a static tool site for Path of Exile 2 build workflows.

It helps players:

- Convert PoE2 build sources into `.build` starter files.
- Check pasted or uploaded build JSON structure.
- Find OS-specific import paths for build planner files.
- Download sample and normalized build files.

## Live Site

https://buildfileconverter.com/

## Project Structure

- `outputs/buildfileconverter-site/` - static site files deployed to Cloudflare Pages.
- `outputs/buildfileconverter-prd.md` - product definition notes.
- `outputs/keyword-opportunity-report-2026-06-02.md` - keyword research notes.
- `wrangler.toml` - Cloudflare Pages deployment config.

## Deploy

```sh
npx wrangler pages deploy outputs/buildfileconverter-site --project-name buildfileconverter
```

