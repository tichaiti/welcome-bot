import fetch from 'node-fetch';
import { post } from '@yotie/micron';
import scrape from './_utils/scrape';

const { 
  LINKTREE,
  SLACK_WEBHOOK_URL: slack_webhook 
} = process.env;

export default post(async ({ ok, error }) => {
  const links = await scrape(LINKTREE);

  const buttons = links.map(({ name, link }) => {
    return {
      type: "section",
      text: {
        "type": "mrkdwn",
        "text": `To Watch on ${name}, click this button 👉🏾`
      },
      "accessory": {
        type: "button",
        url: link,
        text: {
          "type": "plain_text",
          "text": "Watch Now",
          "emoji": true
        },
        "value": "click_me_123"
      }
    }
  });

  const body = {
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "@here we're going live, make sure to join us 👀."
        }
      },
      ...buttons
    ]
  };
  
  console.log('body', JSON.stringify(body));


  const slack = await fetch(slack_webhook, {
    method: 'POST',
    body:    JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });

  console.log(slack);
  if (!slack.ok) return error({ msg: 'something went wrong' });

  return ok();
});