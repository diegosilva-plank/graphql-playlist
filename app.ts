import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import path from 'node:path'
import { AuthorResolver, BookResolver } from './schema/schema'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

async function bootstrap() {
    await mongoose.connect(process.env.DB_URL as string)
    console.log('🚀  MongoDB connected')
    
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