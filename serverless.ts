import type {AWS} from '@serverless/typescript';

import {jq} from './src/functions';

const serverlessConfiguration: AWS = {
    service: 'hyde',
    frameworkVersion: '2',
    custom: {
        webpack: {
            webpackConfig: './webpack.config.js',
            includeModules: true,
        }
    },
    plugins: ['serverless-webpack'],
    provider: {
        name: 'aws',
        runtime: 'nodejs14.x',
        stage: 'prod',
        region: 'us-east-2',
        deploymentBucket: {
            name: "${self:service}-${self:provider.stage}-${self:provider.region}-sls-deploys"
        },
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
        },
        lambdaHashingVersion: '20201221',
    },
    layers: {
        jq: {
            path: 'jq-layer',
        },
    },
    functions: {jq},
}

module.exports = serverlessConfiguration;
