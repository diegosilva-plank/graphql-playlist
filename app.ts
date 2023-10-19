import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import path from 'node:path'
import { AuthorResolver, BookResolver } from './schema/schema'

async function bootstrap() {
    const schema = await buildSchema({
        resolvers: [
            BookResolver,
            AuthorResolver
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