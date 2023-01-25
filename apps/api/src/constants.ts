import { dotenvLoad } from 'dotenv-mono';
dotenvLoad();
export const APP_SECRET = process.env.API_SECRET as string;
