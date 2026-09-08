# Advanced Solar Panels
Add-on for IndustrialCraft PE for Inner Core modloader

## Development
The project uses a built-in modding toolchain optimized for TypeScript development.

### Requirements
1. [Visual Studio Code IDE](https://code.visualstudio.com/)
2. [Python 3.7](https://www.python.org/downloads/) or higher
3. [Node.js 14.17](https://nodejs.org/en/download/current) or higher
4. TypeScript compiler v5 (run `npm install -g typescript@5`), v6 and v7 are not supported!
5. [Android Debug Bridge (adb)](https://developer.android.com/tools/releases/platform-tools)
    - Extract files from `platform-tools` to `/toolchain/adb` in repo root or add ADB to your Path environment variables

### Building
1. Clone repository
2. Execute the `Download Declarations` task in VS Code (Ctrl+Shift+B)
3. Build project using the `Build Everything` task
4. You're ready to work! Use the `Build and Push Everything` task to test your changes on a phone or emulator.

## Note
It's unofficial port. All rights for textures belongs to the original author.
