import { get } from '@yotie/micron';
import scrape from './_utils/scrape';

const { LINKTREE } = process.env;

export default get(async ({ ok }) => {
  const links = await scrape(LINKTREE)
  return ok(links);
});