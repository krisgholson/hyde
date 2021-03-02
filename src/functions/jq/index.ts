import schema from './schema';

export default {
    handler: `${__dirname.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}/handler.main`,
    layers: [{Ref: 'JqLambdaLayer'}],
    events: [
        {
            http: {
                method: 'post',
                path: 'jq',
                request: {
                    schema: {
                        'application/json': schema
                    }
                }
            }
        }
    ]
}
