import 'source-map-support/register';
import util from 'util';
import child_process from 'child_process';
const exec = util.promisify(child_process.exec);

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';

const jq: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const execResponse = await exec('jq --version');

  return formatJSONResponse({
    execResponse: execResponse,
    event,
  });
}

export const main = middyfy(jq);
