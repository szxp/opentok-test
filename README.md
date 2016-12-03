# Video chat room 
Video chat room in browser based on WebRTC using [OpenTok](https://tokbox.com/developer/) (a.k.a. TokBox).

## Getting an API key, session ID, and token

1. [Sign up](https://tokbox.com/account/user/signup) for a TokBox Account. Free for thirty days.
2. Use your credentials to [log in](https://tokbox.com/account) to your TokBox Account.
3. Create a project by clicking add project, typing a name, and clicking view project.
4. Copy the API Key value and use it at the beginning of the `www/js/client.js` file.
5. Within the Project Tools section, click Create Session ID.
6. Copy the session ID from the box below the Create Session ID button and use it at the beginning of the `www/js/client.js` file.
7. Within the Generate Token area, click Generate token. Make sure that Publisher is selected in the Role list box.
8. Copy the token value from the box below the Generate token button and use it at the beginning of the `www/js/client.js` file.

## How to run the demo

1. Install Node.js
2. `git clone https://github.com/szxp/video-chat-room.git`
3. `cd video-chat-room` 
4. `npm install`
5. `node index.js`
6. Visit `https://localhost:8080` in the browser.
