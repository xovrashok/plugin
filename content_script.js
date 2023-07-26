const pageUrl = window.location.href;

function captureReCaptcha() {
    const captchaElement = document.querySelector('body > div.g-recaptcha');
    if (captchaElement) {
        const siteKey = captchaElement.getAttribute('data-sitekey');
        if (siteKey) {
            chrome.runtime.sendMessage(
                { type: 'solveCaptcha', siteKey: siteKey, pageUrl: pageUrl },
                (response) => {
                    console.log('Response from background.js:', response);
                    if (response.success) {
                      const captchaSolution = response.solution;
                      console.log("Captcha solution:", captchaSolution);
                    } else {
                      console.error("Captcha solving failed:", response);
                    }
                }
            );
        } else {
            console.error('Failed to capture ReCaptcha site key.');
        }
    } else {
        console.error('ReCaptcha element not found.');
    }
}

setTimeout(captureReCaptcha, 5000);


const injectedScript ="(" +
    function() {
        console.log("Script Injected");
        const monkeyPatch = () => {
            let oldXHROpen = window.XMLHttpRequest.prototype.open;
            window.XMLHttpRequest.prototype.open = function() {
                this.addEventListener("load", function() {
                    const responseBody = this.responseText;
                    console.log(`Response Body: ${responseBody}`);
                });
                return oldXHROpen.apply(this, arguments);
            };
        };
        monkeyPatch();
    } + ")();";
const injectScript = () => {
    console.log("Injecting Script");
    var script = document.createElement("script");
    script.textContent = injectedScript;
    (document.head || document.documentElement).appendChild(script);
    script.remove();
};
injectScript();