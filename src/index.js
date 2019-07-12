const { send } = require('micro');
const { greeting, sendMessage} = require('./messenger');
const { welcome } = require('./templates');

const {GENERAL_CHANNEL: channel} = process.env;

module.exports = async (req, res) => {
  try {
    const { body } = req;
    const { type, user={}, event={} } = body || {};
    const { id, channel } = user;

    console.debug(`le incoming payload of type: ${typeof body} `, body);
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
    console.error(err);
    return send(res, 500, {
      error: 'something bad happened',
      data: err.data
    }); 
  }
};