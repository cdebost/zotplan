var application = require("montage/core/application").application,
    Montage = require("montage").Montage;

exports.UserService = Montage.specialize({
   
    getOwnUser: {
        value: function () {
            return new Promise(function (resolve, reject) {
                var req = new XMLHttpRequest();
                req.open("GET", application.config.apiBaseUrl + "user");
                req.onload = function () {
                    if (req.status === 200) {
                        resolve(JSON.parse(req.response));
                    } else {
                        reject(new Error("Not signed in"));
                    }
                }
                req.send();
            });
        }
    }
});
