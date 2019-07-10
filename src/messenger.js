const { WebClient } = require('@slack/web-api');
const { SLACK_TOKEN: token } = process.env;
const slack = new WebClient(token);

exports.greeting = (id='', template=[]) => {
  if (!id)
    return template;

  const payload = template.map(a => a); //simply clones, for immutability
  const userId = `${id}`.toUpperCase();

  const greeting = {
		type: "section",
		text: {
			type: "mrkdwn",
			text: `<@${userId}>... Onè pou ou! Ak respè! :wave:`
		}
  };

  payload.unshift(greeting); //prepends to list
  return payload;
}

exports.sendMessage = slack.chat.postMessage;