var application = require("montage/core/application").application,
    Montage = require("montage/core/core").Montage;

exports.ZotplanAuthService = Montage.specialize({
    
    signInWithGoogle: {
        value: function (googleServerToken) {
            var self = this;
            return new Promise(function (resolve, reject) {
                var req = new XMLHttpRequest(),
                    body = {token: googleServerToken};
                req.open("POST", "/auth/google");
                req.setRequestHeader("Content-Type", "application/json");
                req.onload = function () {
                    if (req.status !== 200) {
                        return reject(new Error("Unable to sign in with Google"));
                    }
                    resolve();
                };
                req.onerror = function () {
                    reject(req.response);
                }
                req.send(JSON.stringify(body));
            });
        }
    }
});

