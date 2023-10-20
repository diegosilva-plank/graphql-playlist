import lodash from 'lodash'
import { Arg, Field, FieldResolver, InputType, Mutation, ObjectType, Query, Resolver, Root } from 'type-graphql'
import { AuthorDB } from '../models/author'
import { BookDB } from '../models/book'

// dummy data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
    { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
    { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
    { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
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
        const bookDB = await BookDB.findById(id)
        if (!bookDB) throw new Error('Book not found')
        const book: Book = {
            id: bookDB._id.toString(),
            name: bookDB.name,
            genre: bookDB.genre,
            authorId: bookDB.authorId,
        }
        return book
    }

    @Query(() => [Book])
    async books() {
        const booksDB = await BookDB.find()
        const books: Book[] = lodash.map(booksDB, bookDB => {
            return {
                id: bookDB._id.toString(),
                name: bookDB.name,
                genre: bookDB.genre,
                authorId: bookDB.authorId,
            }
        })
        return books
    }

    @Mutation(() => Book)
    async addBook(@Arg('name') name: string, @Arg('genre') genre: string, @Arg('authorId') authorId: string) {
        const bookDB = new BookDB({ name, genre, authorId })
        await bookDB.save()
        const book: Book = {
            id: bookDB._id.toString(),
            name: bookDB.name,
            genre: bookDB.genre,
            authorId: bookDB.authorId,
        }
        return book
    }

    @FieldResolver(() => Author)
    async author(@Root() book: Book) {
        const authorDB = await AuthorDB.findById(book.authorId)
        if (!authorDB) throw new Error('Author not found')
        const author: Author = {
            id: authorDB._id.toString(),
            name: authorDB.name,
            age: authorDB.age,
        }
        return author
    }
}

@Resolver(() => Author)
export class AuthorResolver {
    @Query(() => Author)
    async author(@Arg('id') id: string) {
        const authorDB = await AuthorDB.findById(id)
        if (!authorDB) throw new Error('Author not found')
        const author: Author = {
            id: authorDB._id.toString(),
            name: authorDB.name,
            age: authorDB.age,
        }
        return author
    }

    @Query(() => [Author])
    async authors() {
        const authorsDB = await AuthorDB.find()
        const authors: Author[] = lodash.map(authorsDB, authorDB => {
            return {
                id: authorDB._id.toString(),
                name: authorDB.name,
                age: authorDB.age,
            }
        })
        return authors
    }

    @Mutation(() => Author)
    async addAuthor(@Arg('name') name: string, @Arg('age') age: number) {
        const author = new AuthorDB({ name, age })
        await author.save()
        return author
    }

    @FieldResolver(() => [Book])
    async books(@Root() author: Author) {
        const booksDB = await BookDB.find({ authorId: author.id })
        const books: Book[] = lodash.map(booksDB, bookDB => {
            return {
                id: bookDB._id.toString(),
                name: bookDB.name,
                genre: bookDB.genre,
                authorId: bookDB.authorId,
            }
        })
        return books
    }
}