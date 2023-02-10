import Constants from 'expo-constants';

export const imageUri = (uri: string): string =>
  `http://${Constants.manifest?.debuggerHost?.split(':').shift()}:9000/${uri}`;
