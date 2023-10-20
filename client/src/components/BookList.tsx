import { useQuery } from "@apollo/client"
import { Book } from "../gql/graphql"
import { getBooksQuery } from "../queries/queries"

export const BookList = () => {
    const getBooks = useQuery(getBooksQuery)

    const DisplayBooks = ({ books }: { books: Book[] }) => {
        return books.map(book => <li key={book.id}>{book.name}</li>)
    }

    const Books = () => {
        return getBooks.loading ?
            <li>Loading books...</li> :
            <DisplayBooks books={getBooks.data.books} />
    }

    return (
        <div>
            <ul id="book-list">
                <Books />
            </ul>
        </div>
    )
}