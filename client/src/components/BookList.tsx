import { useQuery } from "@apollo/client"
import { Book } from "../gql/graphql"
import { getBooksQuery } from "../queries/queries"
import { BookDetails } from "./BookDetails"
import { useState } from "react"

export const BookList = () => {
    const getBooks = useQuery(getBooksQuery)
    const [selectedBook, setSelectedBook] = useState<string>('')

    const DisplayBooks = ({ books }: { books: Book[] }) => {
        return books.map(book => <li key={book.id} onClick={ () => { setSelectedBook(book.id) } }>{book.name}</li>)
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
            <BookDetails id={selectedBook}/>
        </div>
    )
}