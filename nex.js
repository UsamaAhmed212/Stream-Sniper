document.addEventListener('DOMContentLoaded', function (e) {
    setTimeout(() => {
        console.clear();
    }, 500);

    // Debounce Handler
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

    
    const startButton = document.getElementById('start-button');
    
    // Add click event listener to the start button with debounce
    startButton.addEventListener('click', debounce(event => {
        console.log('Click Callback');

        const apiKey = 'AIzaSyDqzq0ZhroJnAsUa9soGHuNdbAKpqfc6mw';
        const videoId = 'giHWUbZqpMg';

        let commentText = "Nex Comment Here";
        
        let accessToken = 'ya29.a0AfB_byB7UxONyczk7q1Lwph7hUT-6t9YRYaLqjeviUHDmi4kp77L7KR7JyiJTeaxNFFq3NfTX1dJKA-2_P3AlYqUkDm3CGhzM-eSp_dgAMGkWFlINMVn_v63Suf88CvOcEGCgTdMxQ-RVjw2KwaxR7kw_YVvKGGu9gaCgYKAaASARASFQHGX2MistbSxTERy5DmSY4CCt0-8g0169';

        console.log('Access Token:', accessToken);

        postComment(accessToken);

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
                key: apiKey, // Replace with your actual API key
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






    }, 1000, true));

});