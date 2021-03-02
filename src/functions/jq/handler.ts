import 'source-map-support/register';
import {pino} from 'pino';
import type {ValidatedEventAPIGatewayProxyEvent} from '@libs/apiGateway';
import {formatJSONResponse} from '@libs/apiGateway';
import {middyfy} from '@libs/lambda';
import schema from './schema';
import {JqService} from './service';

const logger = pino();
const jqService = new JqService();

const jq: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

    logger.trace(event);

    try {
        const output = await jqService.run(event.body.input, event.body.program);
        return formatJSONResponse(output);
    } catch (e) {
        logger.error(e);
        return formatJSONResponse({message: e.message}, 400);
    }
}

export const main = middyfy(jq);
