// Import the configuration object containing API key, client ID, and client secret
import config from './config.js';

document.addEventListener('DOMContentLoaded', function (e) {

    // Extract client ID from the imported config object
    const clientId = config.clientId;

    // Debounce Handler function to limit the rate of execution for a specific action
    function debounce(fn, delay, immediate) {
        var timeout;
        return function (e) {
            e.stopPropagation();
            e.preventDefault();

            var context = this;
            var args = arguments;
            var callNow = immediate && !timeout;

            clearTimeout(timeout);

            timeout = setTimeout(function () {
                timeout = null;
                if (!immediate) fn.apply(context, args);
            }, delay);

            if (callNow) fn.apply(context, args);
        };
    }

    // Add click event listener to the start button with debounce
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', debounce(event => {

        // Initialize variables
        const redirectUri = 'http://spike.byethost6.com/callback.html';

        // Construct the authorization URL
        const authUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' +
            'client_id=' + clientId +
            '&redirect_uri=' + encodeURIComponent(redirectUri) +
            '&scope=https://www.googleapis.com/auth/youtube.force-ssl' +
            '&response_type=code' +
            '&prompt=consent' +
            '&access_type=offline';
        
        // Redirect the user to the authorization URL
        window.location.href = authUrl;

    }, 1000, true));

});
