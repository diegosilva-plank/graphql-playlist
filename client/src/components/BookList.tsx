import { gql, useQuery } from "@apollo/client"
import { useEffect } from "react"

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`

export const BookList = () => {
    const books = useQuery(getBooksQuery)
    useEffect(() => {
        console.log(books.data)
    }, [books])

    return (
        <div>
            <ul id="book-list">
                <li>Book name</li>
            </ul>
        </div>
    )
}