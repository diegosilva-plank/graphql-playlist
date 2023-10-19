import lodash from 'lodash'
import { Arg, Field, InputType, ObjectType, Query, Resolver } from 'type-graphql'

// dummy data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3' },
]

@ObjectType()
export class Book {
    @Field()
    id: string

    @Field()
    name: string

    @Field()
    genre: string
}

@InputType()
export class GetBookInput {
    @Field()
    id: string;
}

@Resolver()
export class RootQuery {
    @Query(() => Book)
    async book(@Arg('id') id: string) {
        return lodash.find(books, { id })
    }
}

// const RootQuery = new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: {
//         book: {
//             type: BookType,
//             args: { id: { type: GraphQLString }},
//             resolve(parent, args) {
//                 // code to get data from db / other source
//                 return lodash.find(books, { id: args.id })
//             }
//         }
//     }
// })