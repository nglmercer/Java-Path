# Task Manager

The `taskManager` handles long-running, asynchronous operations such as downloading files, calculating checksums, unpacking archives, and creating backups. It allows you to track progress and wait for completion.

```typescript
import { taskManager } from "java-path";
```

## Core Concepts

Operations return a `TaskOperation` object containing:

- `taskId`: A unique ID for tracking.
- `promise`: A Promise that resolves when the task completes.

You can listen to global task events via `taskManager.on()`.

## API

### `createBackup(source, options)`

Backs up a directory or file.

```typescript
const job = taskManager.createBackup("./data", {
  outputFilename: "backup.zip",
  useZip: true,
});
await job.promise;
```

### `restoreBackup(backupPath, options)`

Restores a backup.

```typescript
const job = taskManager.restoreBackup("./backups/data.zip", {
  destination: "./restored",
});
```

### `unpack(archivePath, options)`

Extracts an archive (zip/tar).

```typescript
const job = taskManager.unpack("./download.zip", {
  destination: "./output",
});
```

### `download(url, options)`

Downloads a file from a URL.

```typescript
const job = taskManager.download("https://example.com/file.zip", {
  fileName: "file.zip",
});
```

### Event Listening

```typescript
taskManager.on("task:progress", (task) => {
  console.log(`Task ${task.id}: ${task.progress}%`);
});

taskManager.on("task:completed", (task) => {
  console.log(`Task ${task.id} finished!`);
});
```
