# Framevala Frontend

This is the frontend application for **Framevala**, built with Next.js (App Router) and React 19.

The project depends on three internal libraries:

- `mr-ecom-ui`
- `serverless-ecom-nextjs`

Instead of relying on npm-installed copies inside `node_modules`, we use a controlled local bootstrap system.

The libraries are still defined in `package.json` using GitHub version tags. Example:

```json
{
  "serverless-ecom-nextjs": "github:dinesh36/serverless-ecom-nextjs#v1.25.0",
  "mr-ecom-ui": "github:dinesh36/mr-ecom-ui#v1.26.0",
}
```

During setup, a custom script:

- Reads the version tag directly from `package.json`
- Clones the repositories into the local `lib/` folder
- Checks out the exact tag version
- Keeps the local libraries in sync with `package.json`

---

## 🧩 How Dependencies Work

In `frontend/package.json`:

```json
{
  "serverless-ecom-nextjs": "github:dinesh36/serverless-ecom-nextjs#v1.25.0",
  "mr-ecom-ui": "github:dinesh36/mr-ecom-ui#v1.26.0",
}
```

TypeScript path mappings in `tsconfig.json` are configured to resolve these libraries from the local `lib/` folder instead of `node_modules`:

```json
"paths": {
  "@mr-ecom-ui/*": ["./lib/mr-ecom-ui/dist/*"],
  "@serverless-ecom-nextjs/*": ["./lib/serverless-ecom-nextjs/dist/*"]
}
```

This ensures the project always uses the locally cloned versions while version control remains centralized in `package.json`.

---

## Installation & Setup

```bash
cd frontend
npm install
```

---

### Clone & Install Internal Libraries

Run the postinstall script to clone the internal repositories listed in package.json into `lib/` and check out the specified tags:

```bash
node ./scripts/postinstall.js
```

This script will:

- Create the `lib/` folder (if missing)
- Clone `mr-ecom-ui`
- Clone `serverless-ecom-nextjs`
- Checkout the exact version defined in `package.json` for each present dependency
- Skip any repo entries that lack a corresponding dependency or tag (will warn)
