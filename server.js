import express from 'express';
import dotenv from 'dotenv';

// Enable .env variables
dotenv.config();

const app = express();
app.use(express.json());

const SLACK_TOKEN = process.env.SLACK_BOT_TOKEN;
const CHANNEL_ID = process.env.SLACK_CHANNEL_ID;

// Helper for Slack API calls
async function callSlackApi(endpoint, body) {
  const response = await fetch(`https://slack.com/api/${endpoint}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SLACK_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  });
  return response.json();
}

// 1. Send a message
app.post('/send', async (req, res) => {
  const { text } = req.body;
  const result = await callSlackApi('chat.postMessage', {
    channel: CHANNEL_ID,
    text
  });
  res.json(result);
});

// 2. Schedule a message
app.post('/schedule', async (req, res) => {
  const { text, post_at } = req.body; // post_at = UNIX timestamp
  const result = await callSlackApi('chat.scheduleMessage', {
    channel: CHANNEL_ID,
    text,
    post_at
  });
  res.json(result);
});

// 3. Retrieve messages
app.get('/history', async (req, res) => {
  const response = await fetch(
    `https://slack.com/api/conversations.history?channel=${CHANNEL_ID}`,
    {
      headers: { 'Authorization': `Bearer ${SLACK_TOKEN}` }
    }
  );
  const data = await response.json();
  res.json(data);
});

// 4. Edit a message
app.post('/edit', async (req, res) => {
  const { ts, text } = req.body;
  const result = await callSlackApi('chat.update', {
    channel: CHANNEL_ID,
    ts,
    text
  });
  res.json(result);
});

// 5. Delete a message
app.post('/delete', async (req, res) => {
  const { ts } = req.body;
  const result = await callSlackApi('chat.delete', {
    channel: CHANNEL_ID,
    ts
  });
  res.json(result);
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
