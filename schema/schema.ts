import lodash from 'lodash'
import { Arg, Field, FieldResolver, InputType, ObjectType, Query, Resolver, Root } from 'type-graphql'

// dummy data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
]

var authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Prattchet', age: 66, id: '3' },
]

@ObjectType()
export class Book {
    @Field()
    id: string

    @Field()
    name: string

    @Field()
    genre: string

    @Field()
    authorId: string
}

@ObjectType()
export class Author {
    @Field()
    id: string

    @Field()
    name: string

    @Field()
    age: number
}

@InputType()
export class GetBookInput {
    @Field()
    id: string;
}

@Resolver(() => Book)
export class BookResolver {
    @Query(() => Book)
    async book(@Arg('id') id: string) {
        return lodash.find(books, { id })
    }

    @FieldResolver(() => Author)
    async author(@Root() book: Book) {
        const author = authors.find(author => author.id === book.authorId)
        return author
    }
}

@Resolver(() => Author)
export class AuthorResolver {
    @Query(() => Author)
    async author(@Arg('id') id: string) {
        return lodash.find(authors, { id })
    }
}