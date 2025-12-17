---
description: Build, Start, and NPM Publish Workflow
---

# Build, Start, and Publish Workflow

This workflow guides you through the process of building the project, verifying it starts correctly, and publishing it to NPM.

## 1. Build the Project

First, compile the TypeScript source code into JavaScript in the `dist/` directory.

```bash
bun run build
```

## 2. Verify Output

Ensure the build artifacts were created successfully.

```bash
ls dist
```

## 3. Run Tests (Optional but Recommended)

Run the test suite to ensure everything is working as expected.

```bash
bun test
```

## 4. Dry Run Publish

Check what files will be included in the package before actually publishing.

```bash
npm publish --dry-run
```

## 5. Publish to NPM

If everything looks good, publish the package to the NPM registry.
**Note**: You must be logged in to NPM (`npm login`) before running this command.

```bash
npm publish
```
