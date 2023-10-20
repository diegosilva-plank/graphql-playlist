import { useQuery } from "@apollo/client"
import { getBookQuery } from "../queries/queries"
import { Book } from "../gql/graphql"

export const BookDetails = ({ id }: { id: string }) => {
    const bookQuery = useQuery(getBookQuery, { variables: { bookId: id }})

    const DisplayBookDetails = ({ book }: { book: Book }) => {
        return (
            <div>
                <h2>{book.name}</h2>
                <p>{book.genre}</p>
                <p>{book.author.name}</p>
                <p>All books by this author:</p>
                <ul className="other-books">
                    { book.author.books.map(book => <li key={book.id}>{book.name}</li>) }
                </ul>
            </div>
        )
    }

    return (
        <div id="book-details">
            {
                !bookQuery.loading && bookQuery.data && bookQuery.data.book &&
                <DisplayBookDetails book={bookQuery.data.book} />
            }
        </div>
    )
}