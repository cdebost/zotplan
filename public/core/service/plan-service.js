var application = require("montage/core/application").application,
    Montage = require("montage").Montage;

exports.PlanService = Montage.specialize({
    
    createNew: {
        value: function (data) {
            return new Promise(function (resolve, reject) {
                var req = new XMLHttpRequest(),
                    body = { name: data.name, startYear: data.startYear };
                req.open("POST", application.config.apiBaseUrl + "plan");
                req.setRequestHeader("Content-Type", "application/json");
                req.onload = function () {
                    if (req.status === 200) {
                        resolve(JSON.parse(req.response));
                    } else {
                        reject(new Error("Failed to create a plan"));
                    }
                }
                req.send(JSON.stringify(body));
            });
        }
    }
})
