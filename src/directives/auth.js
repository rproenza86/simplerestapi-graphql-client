// externals packages
const { defaultFieldResolver } = require('graphql');
const { SchemaDirectiveVisitor } = require('apollo-server');

class AuthDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field;
        field.resolve = async (...args) => {
            const [, , context] = args;
            const { user } = context;

            if (!user) {
                throw new Error('User not authenticated');
            }

            const result = await resolve.apply(this, args);
            return result;
        };
    }
}

AuthDirective.TypeDef = `directive @auth on FIELD_DEFINITION`;

module.exports = AuthDirective;
