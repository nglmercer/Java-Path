# Environment Detection (`env`)

Utilities for detecting the current platform (OS) and architecture.

## Usage

```typescript
import { env } from "java-path";

if (env.isWindows()) {
  console.log("Running on Windows");
}
```

## API

### `env` Object

| Property/Method | Type            | Description                                        |
| :-------------- | :-------------- | :------------------------------------------------- |
| `platform.name` | `string`        | "windows", "linux", "mac", or "android"            |
| `platform.ext`  | `string`        | Platform executable extension (e.g., ".exe" or "") |
| `arch`          | `string`        | System architecture ("x64", "arm64", "x86", etc.)  |
| `isWindows()`   | `() => boolean` | Returns `true` if OS is Windows.                   |
| `isLinux()`     | `() => boolean` | Returns `true` if OS is Linux.                     |
| `isMac()`       | `() => boolean` | Returns `true` if OS is macOS.                     |
| `isTermux()`    | `() => boolean` | Returns `true` if running in Termux (Android).     |
