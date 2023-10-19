import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { RootQuery } from './schema/schema'
import path from 'node:path'

async function bootstrap() {
    const schema = await buildSchema({
        resolvers: [
            RootQuery,
        ],
        emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
        validate: {
            forbidUnknownValues: false,
        }
    })

    const server = new ApolloServer({
        schema,
    })

    const { url } = await server.listen()
    
    console.log(`🚀  HTTP server running at ${url}`)
}

bootstrap()