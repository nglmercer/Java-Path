# File & Folder Utilities

Helpers for interacting with the file system.

```typescript
import { FileUtils, FolderUtils } from "java-path";
```

## FileUtils

### `writeFile(base, subDir, name, content)`

Safely writes a file, creating parent directories if needed.

### `pathExists(path)`

Checks for existence. Returns generic `ServiceResponse`.

### `delete(path)`

Recursively deletes a path.

### `rename(oldPath, newPath)`

Renames a file/directory.

### `checkFileValidity(path, options)`

Validates file properties like size and extension.

```typescript
await FileUtils.checkFileValidity("config.json", {
  maxSize: 1024,
  allowedExtensions: [".json"],
});
```

---

## FolderUtils

### `getFolderDetails(path, options)`

Returns a detailed list of files in a directory, including stats like size and modification time.

### `getDirectorySummary(path)`

Returns a stats object (total size, file count, etc.).

### `getFiles(path, filters)`

Finds files matching specific criteria (extension, size, recursive depth).

```typescript
const javaFiles = await FolderUtils.getFiles("./src", {
  extension: ".java",
  recursive: true,
});
```
