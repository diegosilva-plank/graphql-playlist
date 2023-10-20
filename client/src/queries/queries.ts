import { gql } from "@apollo/client";

export const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`

export const getAuthorsQuery = gql`
    {
        authors {
            name
            id
        }
    }
`

export const addBookMutation = gql`
    mutation AddBook($authorId: String!, $genre: String!, $name: String!) {
        addBook(authorId: $authorId, genre: $genre, name: $name) {
            name
            genre
        }
    }
`