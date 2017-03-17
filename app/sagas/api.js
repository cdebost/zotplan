function promisifySend(request, body) {
  return new Promise((resolve, reject) => {
    request.withCredentials = true;
    request.onload = () => {
      if (request.status !== 200) {
        try {
          reject(JSON.parse(request.response).error);
        } catch (e) {
          reject(request.response);
        }
      } else {
        resolve(JSON.parse(request.response));
      }
    };
    request.onerror = () => {
      reject(request.response);
    };
    const stringifiedBody = (typeof body === 'object') ? JSON.stringify(body) : body;
    request.send(stringifiedBody);
  });
}

const baseUrl = `${location.protocol}//${location.hostname}:8000`;

export function fetchOwnUser() {
  const req = new XMLHttpRequest();
  req.open('GET', `${baseUrl}/api/user`);
  req.setRequestHeader('Content-Type', 'application/json');
  return promisifySend(req);
}

export function signIn(email, password) {
  const req = new XMLHttpRequest();
  req.open('POST', `${baseUrl}/api/auth/zotplan`);
  req.setRequestHeader('Content-Type', 'application/json');
  return promisifySend(req, { email, password });
}

export function signOut() {
  const req = new XMLHttpRequest();
  req.open('DELETE', `${baseUrl}/api/auth`);
  req.setRequestHeader('Content-Type', 'application/json');
  return promisifySend(req);
}

export function createPlan(userId, name, startYear) {
  const req = new XMLHttpRequest();
  req.open('POST', `${baseUrl}/api/user/${userId}/plan`);
  req.setRequestHeader('Content-Type', 'application/json');
  return promisifySend(req, { name, startYear });
}
