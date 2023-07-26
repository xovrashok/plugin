const scriptTag = document.createElement("script");
document.head.appendChild(scriptTag);

scriptTag.onload = function () {
  const apiKey = "YOUR_API_KEY";
  const solver = new Captcha.Solver(apiKey);

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "solveCaptcha") {
      const siteKey = message.siteKey;
      const pageUrl = message.pageUrl;

      solver
        .recaptcha(siteKey, pageUrl)
        .then((response) => {
          console.log("Response from 2captcha:", response);
          if (response.success) {
            const captchaSolution = response.solution.gRecaptchaResponse;
            console.log("Captcha solution:", captchaSolution);
            sendResponse({ success: true, solution: captchaSolution });
          } else {
            console.error("Captcha solving failed:", response.error);
            sendResponse({
              success: false,
              message: "Captcha solving failed.",
            });
          }
        })
        .catch((error) => {
          console.error("Error while solving captcha:", error.message);
          sendResponse({
            success: false,
            message: "Error while solving captcha.",
          });
        });

      return true;
    }
  });
};
