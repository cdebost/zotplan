function promisifySend(request, body) {
    return new Promise((resolve, reject) => {
        request.onload = () => {
            const response = JSON.parse(request.response);
            if (request.status !== 200) {
                reject(new Error(response.error));
            }
            resolve(response);
        }
        request.onerror = () => {
            reject(request.response);
        }
        if (typeof body === 'object') {
            body = JSON.stringify(body);
        }
        request.send(body);
    });
}

const baseUrl = 'http://localhost:8000';

export function signIn(email, password) {
    const req = new XMLHttpRequest();
    req.open('POST', baseUrl + '/api/auth/zotplan');
    req.setRequestHeader('Content-Type', 'application/json');
    return promisifySend(req, { email, password });
}