const express = require('express');
const graphqlHTTP = require('express-graphql');
const buildSchema = require('graphql').buildSchema;

const auth = require('./auth');

const app = express();

const MODULES = ['users', 'posts'];

const { schema, rootValue } = buildGraphQLModules(MODULES);

const graphql = graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
});

app.use('/', auth, graphql);

app.listen(4000);

console.log('Running a GraphQL API server at http://localhost:4000/graphql');




function buildGraphQLModules(modules) {
  const schema = buildSchema(`
    ${MODULES.map(module => require(`./schemas/${module}`).types || '').join('\n')}
    
    type Query {
      ${MODULES.map(module => require(`./schemas/${module}`).query || '').join('\n')}
    }
  `);

  const rootValue = MODULES.reduce((obj, module) => ({ ...obj, ...require(`./schemas/${module}`).resolver }), {});

  return { schema, rootValue };
}
