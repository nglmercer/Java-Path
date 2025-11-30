interface PlatformInfo {
  name: string;        // "windows", "linux", "mac", "android"
  ext: string;         // ".exe" on Windows, "" on other platforms
  arch: string;         // "x86", "x64", "arm64", etc.
}

const env = {
  platform: PlatformInfo,
  isWindows(): boolean,
  isLinux(): boolean,
  isMac(): boolean,
  isAndroid(): boolean,
  isTermux(): boolean
};
```

#### Methods

- `isWindows()`: Returns `true` if running on Windows
- `isLinux()`: Returns `true` if running on Linux
- `isMac()`: Returns `true` if running on macOS
- `isAndroid()`: Returns `true` if running on Android
- `isTermux()`: Returns `true` if running on Termux (Android)

---

## Java Information

### `getJavaInfo(version: string | number): Promise<JavaInfo>`

Gets information about a specific Java version.

#### Parameters

- `version`: The Java version to get info for (e.g., "11", 17, "17.0.2")

#### Returns

A `Promise` that resolves to a `JavaInfo` object.

#### Types

```typescript
interface JavaInfoStandard {
  version: string;
  url: string;
  filename: string;
  javaBinPath: string;
  downloadPath: string;
  unpackPath: string;
  isTermux: false;
}

interface JavaInfoTermux {
  isTermux: true;
  // Platform-specific properties
}

type JavaInfo = JavaInfoStandard | JavaInfoTermux;
```

#### Example

```typescript
import { getJavaInfo } from "java-path";

const javaInfo = await getJavaInfo(17);
if (!javaInfo.isTermux) {
  console.log(`Java binary path: ${javaInfo.javaBinPath}`);
}
```

---

## Java Installation Management

### `scanJavaInstallations(directory: string): Promise<InstalledJavaVersion[]>`

Scans a directory for Java installations.

#### Parameters

- `directory`: Path to the directory to scan

#### Returns

A `Promise` that resolves to an array of `InstalledJavaVersion` objects.

#### Types

```typescript
interface InstalledJavaVersion {
  featureVersion: number;
  folderName: string;
  installPath: string;
  binPath: string;
  javaExecutable: string;
  arch: string;
  os: string;
  isValid: boolean;
}
```

### `findJavaVersion(directory: string, version: number, options?: FindOptions): Promise<InstalledJavaVersion | null>`

Finds a specific Java version in a directory.

#### Parameters

- `directory`: Path to the directory to search
- `version`: Java version to find (e.g., 11, 17)
- `options`: Optional filtering options

#### Options

```typescript
interface FindOptions {
  requireSameArch?: boolean;  // Only return matching architecture
  requireSameOS?: boolean;    // Only return matching OS
  requireValid?: boolean;     // Only return installations with valid Java executable
}
```

#### Returns

A `Promise` that resolves to an `InstalledJavaVersion` object or `null` if not found.

#### Example

```typescript
import { findJavaVersion } from "java-path";

const java11 = await findJavaVersion("/path/to/java", 11, {
  requireSameArch: true,
  requireValid: true
});
```

---

## Java Service

### `JavaInfoService`

Provides advanced Java operations.

#### Methods

##### `getInstallableVersions(): Promise<JavaVersionsInfo>`

Gets all installable Java versions from the Adoptium API.

#### Types

```typescript
interface JavaRelease {
  featureVersion: number; // e.g. 21
  releaseName: string;   // e.g. "jdk-21.0.3+9"
  downloadUrl: string;   // direct link to archive
  checksumUrl: string;   // sha256 link
  arch: string;          // e.g. "x64", "aarch64"
  os: string;            // e.g. "windows", "linux", "mac"
  [key: string]: string | number;
}

interface JavaVersionsInfo {
  available: number[];          // e.g. [8, 11, 17, 21, 22]
  lts: number[];                // e.g. [8, 11, 17, 21]
  releases: JavaRelease[];        // concrete binaries for current platform/arch
  installedInfo: InstalledJavaVersion[]; // installed Java versions found locally
  installed: number[];           // list of installed versions
}
```

##### `filter(releases: JavaRelease[], version: number): Promise<JavaRelease | false>`

Filters Java releases by version.

##### `downloadJavaRelease(release: JavaRelease, fileName?: string, onComplete?: (data: any) => void): Promise<any>`

Downloads a Java release.

##### `decompressJavaRelease(filePath: string, unpackPath?: string): Promise<any>`

Decompresses a Java release.

#### Example

```typescript
import { JavaInfoService } from "java-path";

const versionsInfo = await JavaInfoService.getInstallableVersions();
console.log(`Available versions: ${versionsInfo.available.join(", ")}`);

const java17Release = await JavaInfoService.filter(versionsInfo.releases, 17);
if (java17Release) {
  console.log(`Download URL: ${java17Release.downloadUrl}`);
}
```

---

## Task Management

### `taskManager`

Manages asynchronous operations like downloads, unpacking, backups, and restores.

#### Methods

##### `createBackup(sourcePath: string, options: BackupOptions): TaskOperation<BackupResult>`

Creates a backup task.

###### Parameters

- `sourcePath`: Path to the directory or file to backup
- `options`: Backup configuration options

###### BackupOptions

```typescript
interface BackupOptions {
  outputFilename?: string;  // Name of the backup file
  useZip?: boolean;        // Use ZIP format (true) or TAR format (false)
  destination?: string;     // Custom destination directory
}
```

###### Returns

A `TaskOperation` object with `taskId` and `promise`.

##### `restoreBackup(backupPath: string, options: RestoreOptions): TaskOperation<RestoreResult>`

Creates a restore task.

###### Parameters

- `backupPath`: Path to the backup file
- `options`: Restore configuration options

###### RestoreOptions

```typescript
interface RestoreOptions {
  destinationFolderName?: string;  // Name of the destination folder
  destination?: string;            // Custom destination path
}
```

##### `unpack(archivePath: string, options: UnpackOptions): TaskOperation<UnpackResult>`

Creates an unpack task.

###### Parameters

- `archivePath`: Path to the archive file
- `options`: Unpack configuration options

###### UnpackOptions

```typescript
interface UnpackOptions {
  destination?: string;  // Destination directory (relative to unpackPath)
}
```

##### `download(url: string, options: DownloadOptions): TaskOperation<DownloadResult>`

Creates a download task.

###### Parameters

- `url`: URL to download from
- `options`: Download configuration options

###### DownloadOptions

```typescript
interface DownloadOptions {
  fileName?: string;      // Name of the file to save
  progress?: (data: ProgressData) => void;  // Progress callback
}
```

##### `waitForTask(taskId: string): Promise<TaskResult>`

Waits for a task to complete and returns its result.

##### `getTask(taskId: string): ITask | null`

Gets information about a task.

##### `getAllTasks(): ITask[]`

Gets all tasks.

##### `on(event: TaskEvent, listener: (task: ITask) => void): void`

Registers an event listener.

###### Task Events

- `task:created`: When a task is created
- `task:started`: When a task starts
- `task:progress`: When task progress is updated
- `task:completed`: When a task completes successfully
- `task:failed`: When a task fails

#### Example

```typescript
import { taskManager } from "java-path";

// Create a backup
const { taskId, promise } = taskManager.createBackup("/path/to/source", {
  outputFilename: "backup.zip",
  useZip: true
});

// Listen for events
taskManager.on("task:progress", (task) => {
  console.log(`Task ${task.id} progress: ${task.progress}%`);
});

// Wait for completion
const result = await promise;
console.log(`Backup created at: ${result.backupPath}`);
```

---

## Path Configuration

### `defaultPaths`

Allows customization of default paths used by the task manager.

#### Properties

- `downloadPath`: Path where downloads are saved
- `unpackPath`: Path where archives are unpacked
- `backupPath`: Path where backups are saved

#### Methods

##### `update(newPaths: Partial<PathConfig>): PathConfig`

Updates one or more paths.

```typescript
interface PathConfig {
  downloadPath: string;
  unpackPath: string;
  backupPath: string;
}
```

##### `reset(): PathConfig`

Resets all paths to their default values.

#### Example

```typescript
import { defaultPaths } from "java-path";

// Update paths
defaultPaths.update({
  downloadPath: "/custom/downloads",
  unpackPath: "/custom/unpacked",
  backupPath: "/custom/backups"
});

// Reset to defaults
// defaultPaths.reset();

// Get current paths
console.log(defaultPaths.downloadPath);
```

---

## File Utilities

### `FileUtils`

Provides file system operations.

#### Methods

##### `writeFile(basePath: string, subDir: string, filename: string, content: string): Promise<void>`

Writes content to a file.

##### `pathExists(path: string): Promise<ServiceResponse<boolean>>`

Checks if a path exists.

##### `delete(path: string): Promise<void>`

Deletes a file or directory.

##### `rename(oldPath: string, newPath: string): Promise<void>`

Renames a file or directory.

##### `checkFileValidity(path: string, options: ValidationOptions): Promise<ServiceResponse<FileInfo>>`

Validates a file.

###### ValidationOptions

```typescript
interface ValidationOptions {
  maxSize?: number;        // Maximum file size in bytes
  allowedExtensions?: string[];  // Allowed file extensions
}
```

#### Example

```typescript
import { FileUtils } from "java-path";

// Write a file
await FileUtils.writeFile("/path/to", "", "config.txt", "key=value");

// Check if it exists
const exists = await FileUtils.pathExists("/path/to/config.txt");
if (exists.success && exists.data) {
  console.log("File exists!");
}

// Validate the file
const validation = await FileUtils.checkFileValidity("/path/to/config.txt", {
  maxSize: 1024,
  allowedExtensions: [".txt", ".json"]
});
```

---

## Installing Java

### Getting or Installing Java Versions

The library provides utilities to automatically find or download and install Java versions. This is useful for applications that need to ensure a specific Java version is available.

#### Example: Install Java Version

```typescript
import { findJavaVersion } from "java-path";
import { defaultPaths } from "java-path";
import { JavaInfoService } from "java-path";
import { taskManager } from "java-path";
import path from "path";

// Helper function to generate archive filename
const ARCHFILE_NAME = (release: JavaRelease): string => {
  const { featureVersion, arch, os } = release;
  return `${featureVersion}_${arch}_${os}.zip`;
};

async function getOrInstallJava(version = 23) {
  // First, check if the version is already installed
  const findResult = await findJavaVersion(defaultPaths.unpackPath, version);
  
  // Get all available Java versions
  const allJavaVersions = await JavaInfoService.getInstallableVersions();
  
  // Find the specific version
  const findVersion = await JavaInfoService.filter(
    allJavaVersions.data.releases,
    Number(version)
  );
  
  if (!findVersion.data) {
    console.warn("No Java version found");
    return { allJavaVersions, version };
  }
  
  // Generate the filename for the download
  const getFilename = ARCHFILE_NAME(findVersion.data);
  
  // If not installed, download and install it
  if (!findResult) {
    // Download Java
    const downloadJava = await JavaInfoService.downloadJavaRelease(
      findVersion.data,
      getFilename
    );
    
    if (!downloadJava || !downloadJava.data) {
      console.error("Failed to download Java");
      return { allJavaVersions, version };
    }
    
    // Wait for download to complete
    await downloadJava.data.promise;
    
    // Unpack the downloaded Java
    const { promise, taskId } = await taskManager.unpack(
      path.join(defaultPaths.downloadPath, getFilename)
    );
    
    await promise;
    
    // Verify the installation
    const newResult = await findJavaVersion(defaultPaths.unpackPath, version);
    return { findResult: newResult, downloadJava, allJavaVersions };
  }
  
  return { findResult, allJavaVersions };
}

// Usage
getOrInstallJava(21)
  .then((result) => {
    console.log("Installation result:", result);
  })
  .catch((error) => {
    console.error("Installation error:", error);
  });
```

#### Process Overview

1. **Check for Existing Installation**: First, the function checks if the requested Java version is already installed using `findJavaVersion`.

2. **Get Available Versions**: It fetches all available Java versions from the Adoptium API using `JavaInfoService.getInstallableVersions()`.

3. **Filter for Specific Version**: It filters the available versions to find the exact version requested.

4. **Download if Needed**: If the version isn't installed, it downloads the appropriate package using `JavaInfoService.downloadJavaRelease`.

5. **Unpack the Download**: After downloading, it unpacks the Java distribution using `taskManager.unpack`.

6. **Verify Installation**: Finally, it verifies that the installation was successful.

#### Customization Options

You can customize the installation process in several ways:

```typescript
// Customize paths before installation
defaultPaths.update({
  downloadPath: "/custom/downloads",
  unpackPath: "/custom/unpacked"
});

// Monitor download progress
const downloadJava = await JavaInfoService.downloadJavaRelease(
  release,
  filename,
  (progress) => {
    console.log(`Download progress: ${progress.percent}%`);
  }
);

// Monitor unpack progress
const { promise, taskId } = await taskManager.unpack(archivePath);
taskManager.on("task:progress", (task) => {
  if (task.id === taskId) {
    console.log(`Unpack progress: ${task.progress}%`);
  }
});
```

---

## Folder Utilities

### `FolderUtils`

Provides directory operations.

#### Methods

##### `getFolderDetails(path: string, options?: FolderOptions): Promise<FolderDetails>`

Gets details about a folder.

##### `getFiles(path: string, options?: FileFilterOptions): Promise<FileInfo[]>`

Gets files in a directory with optional filtering.

##### `getDirectorySummary(path: string, options?: FolderOptions): Promise<DirectorySummary>`

Gets a summary of a directory.

##### `getQuickDirStats(path: string): Promise<QuickStats>`

Gets quick statistics for a directory.

#### Types

```typescript
interface FileFilterOptions {
  onlyFiles?: boolean;
  onlyDirectories?: boolean;
  extension?: string;
  minSize?: number;
  maxSize?: number;
  recursive?: boolean;
  depth?: number;
  sortBy?: "name" | "size" | "modified";
  sortOrder?: "asc" | "desc";
}
```

#### Example

```typescript
import { FolderUtils } from "java-path";

// Get all Java files recursively
const javaFiles = await FolderUtils.getFiles("/path/to/project", {
  extension: ".java",
  recursive: true
});

// Get folder summary
const summary = await FolderUtils.getDirectorySummary("/path/to/project");
console.log(`Total files: ${summary.totalFiles}`);
```

---

## Command Utilities

### `CommandUtils`

Provides utilities for executing system commands.

#### Methods

##### `isCommandAvailable(command: string): Promise<boolean>`

Checks if a command is available.

##### `getPackageManager(): Promise<string | null>`

Detects the available package manager.

##### `isPackageInstalled(packageName: string, packageManager?: string): Promise<boolean>`

Checks if a package is installed.

##### `runCommand(command: string, args?: string[]): Promise<CommandResult>`

Executes a command.

#### Types

```typescript
interface CommandResult {
  stdout: string;
  stderr: string;
  exitCode: number;
}
```

#### Example

```typescript
import { CommandUtils } from "java-path";

// Check if Git is available
const hasGit = await CommandUtils.isCommandAvailable("git");

// Get the package manager
const pm = await CommandUtils.getPackageManager();
console.log(`Package manager: ${pm || "None"}`);

// Run a command
const result = await CommandUtils.runCommand("git", ["status"]);
if (result.exitCode === 0) {
  console.log("Git repository is clean");
}
```

---

## Validation Utilities

### Response Creation Functions

##### `createSuccessResponse<T>(data: T): ServiceResponse<T>`

Creates a success response.

##### `createErrorResponse(message: string, data?: any): ServiceResponse<null>`

Creates an error response.

##### `isSuccess(response: ServiceResponse<any>): boolean`

Checks if a response is successful.

#### Types

```typescript
interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  details?: any;
}
```

#### Example

```typescript
import { createSuccessResponse, createErrorResponse, isSuccess } from "java-path";

// Create a success response
const success = createSuccessResponse({ id: 1, name: "Item 1" });

// Create an error response
const error = createErrorResponse("Failed to load data", { code: 500 });

// Check response type
if (isSuccess(response)) {
  // Handle success case
  console.log(response.data);
} else {
  // Handle error case
  console.error(response.error);
}
```
