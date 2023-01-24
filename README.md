# Canvass Buddy

An open source native app for organizing canvassing efforts.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `native`: The main front end for Canvass Buddy, built with [react-native](https://reactnative.dev/) and [expo](https://docs.expo.dev/). This is the front end for Canvass buddy.
- `web`: a [Next.js](https://nextjs.org/) app built with [react-native-web](https://necolas.github.io/react-native-web/). Intended for eventual marketing materials.
- `api` a [GraphQl Yoga](https://the-guild.dev/graphql/yoga-server) server.
- `ui`: a stub [react-native](https://reactnative.dev/) component library shared by both `web` and `native` applications.
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [Expo](https://docs.expo.dev/) for native development
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [Prettier](https://prettier.io) for code formatting

## Running the project

### Dependencies

The fallowing packages are required to be installed globally to run the app:
  * `npm@8.19.3`
  * `node@16.19.0`
  * `expo-cli`

### Running in development

Run the following command:

```sh
git clone git@github.com:canvass-buddy/canvass-buddy.git
cd canvass-buddy
npm i -r
npm run dev
```
