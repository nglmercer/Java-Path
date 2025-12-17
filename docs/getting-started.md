# Getting Started & Usage

## Building the Library

To build the library for distribution (creating a bundled version in `dist/`):

```bash
bun run build
```

## Basic Usage

Import the necessary modules from the package:

```typescript
import {
  env,
  getJavaInfo,
  findJavaVersion,
  FileUtils,
  taskManager,
  defaultPaths,
  CommandUtils,
} from "java-path";

// 1. Get environment information
console.log(`Running on ${env.platform.name} (${env.arch})`);

// 2. Scan for Java installations
const installations = await scanJavaInstallations("/usr/lib/jvm");
console.log("Found:", installations);

// 3. Check for specific Java version (e.g., Java 17)
const java17 = await findJavaVersion("/usr/lib/jvm", 17, {
  requireValid: true,
});

if (java17) {
  console.log("Java 17 found at:", java17.installPath);
}
```

## CLI Commands

The project includes several `bun` scripts for common tasks:

| Command                       | Description                         |
| :---------------------------- | :---------------------------------- |
| `bun run index.ts`            | Run the main entry point            |
| `bun test`                    | Run all tests                       |
| `bun test --watch`            | Run tests in watch mode             |
| `bun test --coverage`         | Run tests with coverage report      |
| `bun run build`               | Build the project for production    |
| `bun run examples/install.ts` | Run the installation example script |
