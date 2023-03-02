import Constants from 'expo-constants';

export const imageUri = (uri: string | null | undefined): string =>
  `http://${
    Constants.manifest?.debuggerHost?.split(':').shift() ?? 'localhost'
  }:9000/${uri}`;
