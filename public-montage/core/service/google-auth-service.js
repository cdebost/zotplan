/**
 * @module src/public/core/service/google-auth-service
 */

var Target = require("montage/core/target").Target;

exports.GoogleAuthService = Target.specialize({

    _auth2: {
        value: null
    },

    _secretButton: {
        value: null
    },

    init: {
        value: function () {
            var self = this;
            this._secretButton = document.createElement("button");
            this._secretButton.style.display = "none";
            document.body.appendChild(this._secretButton);
            gapi.load("auth2", function () {
                self._auth2 = gapi.auth2.init({
                    client_id: "11956410191-h0f137migio4rpp2jng7k80i2e3v4h60.apps.googleusercontent.com",
                    cookiepolicy: "single_host_origin"
                });
                self._auth2.attachClickHandler(self._secretButton, {},
                    function (googleUser) {
                        var idToken = googleUser.getAuthResponse().id_token;
                        self.dispatchEventNamed("didGetIdToken", false, false, idToken);
                    },
                    function (error) {
                        self.dispatchEventNamed("signInError", false, false, error);
                    }
                );
            });
            return this;
        }
    },

    signIn: {
        value: function () {
            this._secretButton.click();
        }
    }
});
