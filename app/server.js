/* eslint no-console: 0 */
import GoogleAuth from 'google-auth-library';
import App from './app';

const port = process.env.PORT || 8000;

const googleAuth = new GoogleAuth();
const googleAuthClient = new googleAuth.OAuth2(
  '11956410191-h0f137migio4rpp2jng7k80i2e3v4h60.apps.googleusercontent.com',
  '',
  '',
);

App({
  port: process.env.PORT || 8000,
  dbName: `mongodb://localhost/zotplan_${(process.env.NODE_ENV || 'development').toLowerCase()}`,
  googleAuthClient,
});
console.log(`Server running on localhost:${port}`);
