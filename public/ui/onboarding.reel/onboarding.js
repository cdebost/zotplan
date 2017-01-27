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

    handleSignInWithGoogleButtonAction: {
        value: function () {
            var self = this;
            this._googleAuthService.signIn();
        }
    },

    handleDidGetGoogleIdToken: {
        value: function (e) {
            var token = e.detail;
            console.log(token);
        }
    },

    handleGoogleSignInError: {
        value: function (e) {
            var error = e.detail;
            this._errorMessage = error.message;
            console.error(error);
        }
    }
});
