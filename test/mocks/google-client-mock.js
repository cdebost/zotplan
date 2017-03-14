export default class GoogleClientMock {

  constructor() {
    this.token = 'test token';
  }

  verifyIdToken(token, clientId, cb) {
    if (token === this.token) {
      cb(null, {
        getPayload: () => ({
          sub: 'id1',
          name: 'Google User',
          email: 'user@google.com',
        }),
      });
    } else {
      cb(new Error('Invalid token'));
    }
  }
}

