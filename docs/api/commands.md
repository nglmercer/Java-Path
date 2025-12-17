# Command Utilities

Utilities for executing system commands and managing packages.

```typescript
import { CommandUtils } from "java-path";
```

## `isCommandAvailable(command)`

Checks if a command acts in the system PATH.

```typescript
if (await CommandUtils.isCommandAvailable("java")) { ... }
```

## `getPackageManager()`

Detects the active package manager (npm, yarn, pnpm, bun).

## `isPackageInstalled(name, manager?)`

Checks if a specific package is installed globally or locally.

## `runCommand(cmd, args)`

Executes a shell command and returns `stdout`, `stderr`, and `exitCode`.

```typescript
const { stdout } = await CommandUtils.runCommand("java", ["-version"]);
```
