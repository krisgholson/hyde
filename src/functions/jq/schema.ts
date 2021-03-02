export default {
    type: "object",
    properties: {
        input: {type: ['object', 'array']},
        program:{type: 'string'},
    },
    required: ['input','program']
} as const;
