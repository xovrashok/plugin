
function solveCaptcha(imageData) {
    const apiKey = '';
    const serviceEndpoint = 'https://2captcha.com/in.php';

    fetch(serviceEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            apiKey: apiKey,
            image: imageData,
        }),
    })
        .then((response) => response.json())
        .then((result) => {
            if (result.success) {
                const captchaSolution = result.solution;
                console.log('Captcha solution:', captchaSolution);
            } else {
                console.error('Captcha solving failed:', result.error);
            }
        })
        .catch((error) => {
            console.error('Error while solving captcha:', error);
        });
}

const injectedScript =
    '(' +
    function () {
        console.log('Script Injected');

        window.solveCaptcha = function (imageData) {
            const apiKey = '';
            const serviceEndpoint = 'https://2captcha.com/in.php';

            fetch(serviceEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    apiKey: apiKey,
                    image: imageData,
                }),
            })
                .then((response) => response.json())
                .then((result) => {
                    if (result.success) {
                        const captchaSolution = result.solution;
                        console.log('Captcha solution:', captchaSolution);
                    } else {
                        console.error('Captcha solving failed:', result.error);
                    }
                })
                .catch((error) => {
                    console.error('Error while solving captcha:', error);
                });
        };

        const monkeyPatch = () => {
            let oldXHROpen = window.XMLHttpRequest.prototype.open;
            window.XMLHttpRequest.prototype.open = function () {
                this.addEventListener('load', function () {
                    const responseBody = this.responseText;
                    console.log(`Response Body: ${responseBody}`);
                    window.solveCaptcha(responseBody);
                });
                return oldXHROpen.apply(this, arguments);
            };
        };
        monkeyPatch();
    } +
    ')();';

const injectScript = () => {
    console.log('Injecting Script');
    var script = document.createElement('script');
    script.textContent = injectedScript;
    (document.head || document.documentElement).appendChild(script);
    script.remove();
};

injectScript();
