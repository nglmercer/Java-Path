# Configuration

Java-Path uses a central configuration for managing default paths used in operations like downloading, unpacking, and backing up files.

## Default Paths

By default, the library might use:

- `downloadPath`: Directory for saving downloaded archives.
- `unpackPath`: Directory for extracting Java installations.
- `backupPath`: Directory for creating backups.

## Customizing Paths

You can update these paths globally using the `defaultPaths` object. When paths are updated, dependent services (like `taskManager`) are automatically notified to use the new locations.

```typescript
import { defaultPaths, taskManager } from "java-path";
import path from "node:path";

// View current paths
console.log("Current Download Path:", defaultPaths.downloadPath);

// Update paths (e.g., relative to the current working directory)
defaultPaths.update({
  downloadPath: path.join(process.cwd(), "my-downloads"),
  unpackPath: path.join(process.cwd(), "my-java-installs"),
  backupPath: path.join(process.cwd(), "my-backups"),
});

// Reset to defaults if needed
// defaultPaths.reset();
```

> **Note**: Updating `defaultPaths` is reactive. Subsequent calls to `taskManager` or download services will respect these new paths immediately.
