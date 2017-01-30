export default class GoogleClientMock {
    
    verifyIdToken(token, clientId, cb) {
        if (token === 'test token') {
            cb(null, {
                getPayload: () => {
                    return {
                        sub: 'id1',
                        name: 'Google User',
                        email: 'user@google.com'
                    }
                }
            })
        } else {
            cb(new Error("Invalid token"))
        }
    }
}

