import {promisify} from 'util';
import {exec} from 'child_process';
import {pino} from 'pino';

const execP = promisify(exec);
const logger = pino();

export class JqService {
    async run(input: object | Array<any>, program: string): Promise<Record<string, unknown>> {

        try {
            const jsonString = JSON.stringify(input);
            const execResponse = await execP(`echo '${jsonString}' | jq '${program}'`);
            if (execResponse.stderr) {
                throw execResponse.stderr;
            }
            const stdout = JSON.parse(execResponse.stdout);
            return stdout;
        } catch (e) {
            logger.error(e);
            throw e;
        }

    }
}

