import fetch from 'node-fetch';
import { Message, Blocks, Elements} from 'slack-block-builder';
import { post } from '@yotie/micron';
import scrape from '../_utils/scrape';

const { 
  LINKTREE,
  SLACK_WEBHOOK_URL: slack_webhook 
} = process.env;

export default post(async ({ body, ok, error }) => {
  const links = await scrape(LINKTREE);
  const buttons = links.map(({ link, name}) => 
    Elements.Button().text(name).url(link));

  const { text, response_url } = body;
  const marker = text.indexOf(' ');
  const link = text.slice(0, marker).trim();
  const subject = text.slice(marker, text.length).trim();

  const message = Message()
    .blocks(
      Blocks.Section()
        .text(`Today we'll be talking about: *${subject}* \n Join the live here: ${link}`),
      Blocks.Section()
        .text(`Dont forget to also follow us on social media to stay up-to-date on the lastest from the community.`),
      Blocks.Divider(),
      Blocks.Actions()
        .elements(...buttons)
    )
    .buildToJSON();

  const broadcast = await fetch(slack_webhook, {
    method: 'POST',
    body:    message,
    headers: { 'Content-Type': 'application/json' },
  });
  if (!broadcast.ok) {
    console.log(await broadcast.json())
    return error({ msg: 'something went wrong' });
  }


  const confirm = Message().text(`We successfully broadcasted the announcement for *${subject}*`)
    .asUser().buildToJSON();

  const slackConfirm = await fetch(response_url, {
    method: 'POST',
    body: confirm,
    headers: { 'Content-Type': 'application/json' },
  });

  if (!slackConfirm.ok) return error({ msg: 'something went wrong' });

  return ok();
});