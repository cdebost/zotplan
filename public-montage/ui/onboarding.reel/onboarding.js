/**
 * @module ui/onboarding.reel
 */
var Component = require("montage/ui/component").Component,
    GoogleAuthService = require("core/service/google-auth-service").GoogleAuthService;

/**
 * @class Onboarding
 * @extends Component
 */
exports.Onboarding = Component.specialize(/** @lends Onboarding# */ {

    _signInWithGoogleButton: {
        value: null
    },

    _errorMessage: {
        value: null
    },

    enterDocument: {
        value: function () {
            if (!this._googleAuthService) {
                this._googleAuthService = new GoogleAuthService().init();
                this._googleAuthService.addEventListener(
                        "didGetIdToken",
                        this.handleDidGetGoogleIdToken.bind(this));
                this._googleAuthService.addEventListener(
                        "signInError",
                        this.handleGoogleSignInError.bind(this));
            }
        }
    },

    exitDocument: {
        value: function () {
            if (this._googleAuthService) {
                this._googleAuthService.removeEventListener(
                        "didGetIdToken",
                        this.handleDidGetGoogleIdToken.bind(this));
                this._googleAuthService.removeEventListener(
                        "signInError",
                        this.handleGoogleSignInError.bind(this));
                this._googleAuthService = null;
            }
        }
    },

    handleSignInButtonAction: {
        value: function () {
            var self = this;
            this.application.delegate.signIn(this.username, this.password)
                .then(function () {
                    self.username = "";
                })
                .catch(function (err) {
                    self.errorMessage = err.message;
                })
                .finally(function () {
                    self.password = "";
                })
        }
    },

    handleSignInWithGoogleButtonAction: {
        value: function () {
            var self = this;
            this._googleAuthService.signIn();
        }
    },

    handleDidGetGoogleIdToken: {
        value: function (e) {
            var self = this,
                token = e.detail;
            this.application.delegate.signInWithGoogle(token)
                .catch(function (err) {
                    self.errorMessage = err.message;
                })
        }
    },

    handleGoogleSignInError: {
        value: function (e) {
            var error = e.detail;
            this.errorMessage = error.message;
            console.error(error);
        }
    }
});
