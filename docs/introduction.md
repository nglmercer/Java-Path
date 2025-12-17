# Introduction

**Java-Path** is a comprehensive TypeScript library for detecting, managing, and working with Java installations across different platforms (Windows, macOS, Linux, and **Termux**).

It provides a robust set of tools for:

- Detecting the current operating system and architecture.
- Locating and managing multiple Java installations.
- Utilizing native Bun APIs for performance.
- Handling special environments like Termux on Android.

## Key Features

- **Platform Detection**: Automatically detect the current operating system (Windows, Linux, macOS, Android) and architecture (x64, arm64, etc.).
- **Java Version Management**: Scan directories for valid Java installations, check file integrity, and manage versions.
- **Termux Support**: Specialized handling for managing Java within the Termux environment on Android devices.
- **File Integrity Verification**: Automatic checksum and size verification for downloaded files to ensure reliability.
- **Utility Functions**: a rich set of helpers for file operations, folder traversal, command execution, and validation.
- **Type Safety**: Built with TypeScript, providing full type support and definitions.
