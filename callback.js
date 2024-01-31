// Import the configuration object containing API key, client ID, and client secret
import config from './config.js';

document.addEventListener('DOMContentLoaded', function (e) {

    // Extract API key, client ID, and client secret from the imported config object
    const apiKey = config.apiKey;
    const clientId = config.clientId;
    const clientSecret = config.clientSecret;

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

    // Function to extract video ID from a YouTube video URL
    const extractVideoId = url => url.match(/[?&]v=([^#&?]+)/)[1];

    // Initialize variables
    let callbackData = {};
    let commentText = "Your comment here";
    const videoUrl = 'https://www.youtube.com/watch?v=5QtoU6dNP4Q';
    const videoId = extractVideoId(videoUrl);
    const redirectUri = 'http://spike.byethost6.com/callback.html';

    // Extract authorization code from the URL
    const code = new URLSearchParams(window.location.search).get('code');

    // Add click event listener to the start button with debounce
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', debounce(event => {

        // Check if access token exists in callbackData
        if (callbackData.access_token) {
            postComment(callbackData.access_token);
        } else {
            // If access token doesn't exist, make a POST request to obtain it
            var tokenUrl = 'https://oauth2.googleapis.com/token';
            fetch(tokenUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    code: code,
                    client_id: clientId,
                    client_secret: clientSecret,
                    redirect_uri: redirectUri,
                    grant_type: 'authorization_code',
                }),
            })
            .then(response => response.json())
            .then(data => {
                callbackData = data;
                console.log(callbackData);
                postComment(callbackData.access_token);
            })
            .catch(error => {
                console.error('Error obtaining access token:', error);
            });
            
        }

    }, 1000, true));


    // Function to post a comment using the obtained access token
    function postComment(accessToken) {
            
        // Replace 'VIDEO_ID' with the ID of the video where you want to post the comment
        // var videoId = 'VIDEO_ID';

        // Comment text
        // var commentText = 'Hello, this is a test comment!';

        // YouTube API endpoint for posting comments
        var apiUrl = 'https://www.googleapis.com/youtube/v3/commentThreads';

        // Request parameters
        var params = {
            part: 'snippet',
            key: apiKey,
        };

        // Request body
        var requestBody = {
            snippet: {
                videoId: videoId,
                topLevelComment: {
                    snippet: {
                        textOriginal: commentText,
                    },
                },
            },
        };

        // Make a POST request to post the comment
        fetch(apiUrl + '?' + new URLSearchParams(params), {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Comment posted:', data);
        })
        .catch(error => {
            console.error('Error posting comment:', error);
        });
    }

});