const { send, json } = require('micro');
const { greeting, sendMessage} = require('./messenger');
const { welcome } = require('./templates');

const {GENERAL_CHANNEL: channel} = process.env;

module.exports = async (req, res) => {
  try {
    const body = await json(req);
    const { type, user={}, event={} } = body;
    const { id, channel } = user;

    console.log(body)
    if (!['team_join'].includes(type)) 
      return send(res, 200, body);

    const message = greeting(id, welcome);
    const result = await sendMessage({
      channel,
      text: 'placeholder',
      blocks: message
    });

    console.log('returning ', result);
    return send(res, 200, result);
  } catch(err) {
    console.log(err);
    return send(res, 500, {
      error: 'something bad happened'
    }); 
  }
};