# Slack Messaging API Backend

## Project Overview

This project is a Node.js/Express backend that interacts with the Slack API within a Developer Sandbox workspace. It implements core messaging functionalities, including:

- Sending immediate messages
- Scheduling future messages
- Retrieving message history
- Editing messages
- Deleting messages

It uses token-based authentication with a Slack Bot Token and targets a specified Slack channel.

---

## Prerequisites

- Node.js v18 or above (for native `fetch` support)
- A Slack Developer Sandbox Workspace with Slack App installed
- Slack Bot OAuth Token (`xoxb-...`) with required scopes:
  - `chat:write`
  - `channels:history`
  - `chat:write.public` (optional)
- Channel ID of the Slack channel to interact with

---

## Setup Instructions

1. **Clone this repository**


cd slack-messaging-assignment/backend

2. **Install dependencies**
   --
npm install


4. **Create `.env` file**

In the `backend/` folder, create a file named `.env` (do **not** commit this file) and add your credentials:

SLACK_BOT_TOKEN=xoxb-your-bot-token-here
SLACK_CHANNEL_ID=C01234567


4. **Start the server**

node server.js


The server will start on `http://localhost:3001`.

---

## API Endpoints

### 1. Send a Message

- **URL:** `/send`
- **Method:** `POST`
- **Body:** JSON

{
"text": "Your message text here"
}


- **Description:** Sends an immediate message to the configured Slack channel.
- **Response:** JSON with Slack API response.

### 2. Schedule a Message

- **URL:** `/schedule`
- **Method:** `POST`
- **Body:** JSON

{
"text": "Scheduled message text",
"post_at": 1753698000
}


- **Note:** `post_at` is a UNIX timestamp (seconds since epoch) specifying when to send.
- **Response:** JSON with scheduling confirmation.

### 3. Retrieve Message History

- **URL:** `/history?count=5`
- **Method:** `GET`
- **Description:** Retrieves the latest `<count>` messages from the Slack channel (default 10 if omitted).
- **Response:** JSON with messages array including timestamps.

### 4. Edit a Message

- **URL:** `/edit`
- **Method:** `POST`
- **Body:** JSON

{
"ts": "1753641962.222459",
"text": "Updated message text"
}


- **Description:** Edits a message with the given timestamp (`ts`) in the configured channel.
- **Response:** JSON with updated message info.

### 5. Delete a Message

- **URL:** `/delete`
- **Method:** `POST`
- **Body:** JSON

{
"ts": "1753641962.222459"
}


- **Description:** Deletes a message with the given timestamp (`ts`) from the Slack channel.
- **Response:** JSON confirming deletion.

---

### Screenshot
#send
<img width="1447" height="944" alt="Screenshot 2025-07-28 182504" src="https://github.com/user-attachments/assets/ca8955a4-601d-41a2-a685-9e5703609a25" />
--
#Schedule
<img width="1443" height="960" alt="Screenshot 2025-07-28 182737" src="https://github.com/user-attachments/assets/ed7a81d7-7054-48c3-a579-685fe2812450" />
--
#History
<img width="1442" height="976" alt="Screenshot 2025-07-28 182838" src="https://github.com/user-attachments/assets/f39e0ce6-0a70-46b5-a462-d48c42aa5316" />

--
#Edit
<img width="1453" height="984" alt="Screenshot 2025-07-28 183041" src="https://github.com/user-attachments/assets/17e77ff3-5007-4336-b6dd-03af573dd189" />

--
#Delete
<img width="1450" height="944" alt="Screenshot 2025-07-28 183205" src="https://github.com/user-attachments/assets/780043e3-7421-42de-bdaf-26ef481ae1dd" />


## Testing the APIs

- Use a tool like [Postman](https://www.postman.com/) or `curl` to send HTTP requests.
- Make sure your server is running on port 3001.
- Example `curl` to send a message:

curl -X POST http://localhost:3001/send
-H "Content-Type: application/json"
-d '{"text":"Hello from backend!"}'


- Check the target Slack channel in your sandbox workspace to see messages from the bot.

---

## Notes

- Your Slack bot **must be a member of the target channel** to read or write messages.
- Never share your `SLACK_BOT_TOKEN` publicly.
- The project currently includes only backend code; frontend/UI is optional and can be added later.
- Make sure your Slack app has the correct OAuth scopes and is installed in your sandbox workspace.

---

## Troubleshooting

- If you receive errors like `"not_in_channel"`, invite your bot to the channel using `/invite @YourBotName` in Slack.
- If you see `"message_not_found"` on edit/delete, verify you are using the correct `ts` timestamp from previously sent or retrieved messages.
- Ensure your `.env` file is correctly formatted and your server restarted after changes.

---


Thank you for reviewing my Slack Messaging API backend implementation!

