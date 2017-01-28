'use strict'

import App from './app'
import GoogleAuth from 'google-auth-library'

const GOOGLE_CLIENT_ID = '11956410191-h0f137migio4rpp2jng7k80i2e3v4h60.apps.googleusercontent.com'
const googleAuth = new GoogleAuth()

const config = {
    environment: process.env.ENVIRONMENT || 'development',
    port: 8000,
    googleClientId: GOOGLE_CLIENT_ID,
    googleClient: new googleAuth.OAuth2(GOOGLE_CLIENT_ID, '', '')
}

const app = App(config)

console.log(`Server running on ${app.server.address().port}`)

export default app

