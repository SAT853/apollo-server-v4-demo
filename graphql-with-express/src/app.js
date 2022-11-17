var express = require('express');
var { graphqlHTTP } = require('express-graphql');
const schema = require('../schema/schema');

var app = express();

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));
app.listen(4000, () => console.log(`🚀  Server ready at: 4000`));
