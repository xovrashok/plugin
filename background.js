chrome.webRequest.onCompleted.addListener(
    function(details) {
        if (details.url.includes('https://online.mfa.gov.ua/api/v1/auth/session') &&
            details.requestHeaders['X-Requested-With'] === 'XMLHttpRequest') {

            chrome.webRequest.getResponseBody(details, function(body) {
                let response = JSON.parse(body);
                console.log('response: ',response)
            });

        }
    },
    {urls: ['<all_urls>']}
);