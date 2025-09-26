# StorePay v4

A React Native app built with Expo and Expo Router. It uses Apollo Client for GraphQL, NativeWind for styling (Tailwind-compatible), and TypeScript. This README explains how to install, run, and work with the project.

## Prerequisites
- Node.js 18+ (LTS recommended)
- npm 9+ or pnpm/yarn
- Xcode (for iOS) and/or Android Studio with Android SDKs (for Android)
- Expo CLI (installed via npx on first run)

## Quick start
1. Install dependencies
   - npm install
2. Start the development server (choose a platform from the Expo menu)
   - npm run start
3. Or start directly on a platform
   - iOS simulator: npm run ios
   - Android emulator: npm run android
   - Web: npm run web

## Scripts
- start: expo start
- ios: expo start --ios
- android: expo start --android
- web: expo start --web
- lint: eslint . --ext .js,.jsx,.ts,.tsx
- lint:fix: eslint . --ext .js,.jsx,.ts,.tsx --fix
- format: prettier --write .
- typecheck: tsc --noEmit
- schema:download: node ./scripts/download-schema.mjs
- codegen: graphql-codegen --config codegen.yml
- codegen:all: GRAPHQL_HTTP_URL=$GRAPHQL_HTTP_URL INTROSPECTION_TOKEN=$INTROSPECTION_TOKEN npm run schema:download && npm run codegen

## Environment variables
Some scripts require environment variables (especially GraphQL):
- GRAPHQL_HTTP_URL: Your GraphQL HTTP endpoint (e.g., https://api.example.com/graphql)
- INTROSPECTION_TOKEN: Optional token required by your GraphQL server for schema introspection (if applicable)

Export them in your shell before running codegen: 
- macOS/Linux (bash/zsh):
  - export GRAPHQL_HTTP_URL="https://your-graphql-endpoint"
  - export INTROSPECTION_TOKEN="your-token-if-needed"
- Windows (Powershell):
  - $env:GRAPHQL_HTTP_URL="https://your-graphql-endpoint"
  - $env:INTROSPECTION_TOKEN="your-token-if-needed"

Then run:
- npm run codegen:all

Note: If scripts/download-schema.mjs does not exist yet, create it or adjust the schema:download script.

## Project structure (high level)
- app/ — Expo Router app directory (routes are filesystem-based)
  - (tabs)/ — Tab navigator screens (home, settings, activity)
  - (screens)/ — Stack screens (orders, profile)
  - (auth)/ — Auth screens (login)
  - +not-found.tsx — 404 screen
- src/ — Application source (stores/hooks/components, if any)
- assets/ — Images, fonts, etc.
- schema.graphql — GraphQL schema (local copy)
- codegen.yml — GraphQL Code Generator config
- app.config.ts / app.json — Expo config
- eslint.config.cjs / tailwind.config.js / tsconfig.json — Tooling configs

## Styling
This app uses NativeWind with react-native-css-interop. You can write className="..." on React Native components to apply Tailwind-like styles. See tailwind.config.js for customization.

## GraphQL
- Client: @apollo/client configured in the app (see src for setup if present)
- Uploads: apollo-upload-client
- Subscriptions: graphql-ws (if used)
- Code generation: graphql-codegen based on operations found in the project

Typical workflow:
- Update or add GraphQL operations (.graphql or gql tagged queries)
- Update schema.graphql (or re-download it)
- Run: npm run codegen

## Linting, formatting, types
- Lint: npm run lint
- Fix lint issues: npm run lint:fix
- Format code: npm run format
- Type check: npm run typecheck

## Running on devices/emulators
- iOS: Ensure Xcode and Command Line Tools are installed. Start an iOS simulator via Xcode or let Expo open one.
- Android: Install Android Studio, create an emulator, ensure ANDROID_HOME is set; then use npm run android.
- Physical devices: Install the Expo Go app on your device and scan the QR from the terminal/Expo DevTools.

## Troubleshooting
- Metro bundler cache issues: Stop the server and clear cache with: expo start -c
- iOS pod issues: From ios/ (if bare), run: pod install; for managed Expo, pods are handled internally.
- GraphQL schema/codegen errors: Check that GRAPHQL_HTTP_URL and INTROSPECTION_TOKEN are exported and reachable.
- Typescript path/alias issues: Ensure tsconfig.json and eslint-import-resolver-typescript are aligned.

## License
Proprietary. All rights reserved unless the owner specifies otherwise.