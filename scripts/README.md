# scripts/

This folder contains **local utility scripts** for development or build automation.

Use it for:

- Build helpers (e.g. SVG sprite generator, image optimizer)
- One-time migration or cleanup scripts
- Import/export tools (e.g. Excel → CMS)
- Project-specific tooling not part of the app runtime

📦 Scripts here can be run via `npm`/`pnpm`/`yarn` or manually:

```bash
node scripts/my-script.js
```

🛠 Keep scripts focused and documented. Avoid side effects unless intentional.

