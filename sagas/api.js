function promisifySend(request, body) {
    return new Promise((resolve, reject) => {
        request.withCredentials = true;
        request.onload = () => {
            if (request.status !== 200) {
                return reject(new Error(request.response.error));
            }
            resolve(JSON.parse(request.response));
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

const baseUrl = location.protocol + '//' + location.hostname + ':8000';

export function fetchOwnUser() {
    const req = new XMLHttpRequest();
    req.open('GET', baseUrl + '/api/user');
    req.setRequestHeader('Content-Type', 'application/json');
    return promisifySend(req);
}

export function signIn(email, password) {
    const req = new XMLHttpRequest();
    req.open('POST', baseUrl + '/api/auth/zotplan');
    req.setRequestHeader('Content-Type', 'application/json');
    return promisifySend(req, { email, password });
}

export function createPlan(userId, name, startYear) {
    const req = new XMLHttpRequest();
    req.open('POST', `${baseUrl}/api/user/${userId}/plan`);
    req.setRequestHeader('Content-Type', 'application/json');
    return promisifySend(req, { name, startYear });
}