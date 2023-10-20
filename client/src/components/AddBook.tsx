import { useMutation, useQuery } from "@apollo/client";
import { Author } from "../gql/graphql";
import { addBookMutation, getAuthorsQuery } from "../queries/queries";
import { useState } from "react";

export const AddBook = () => {
    const getAuthors = useQuery(getAuthorsQuery)
    const [addBook, _] = useMutation(addBookMutation)
    const [selectedAuthor, setSelectedAuthor] = useState<string>('')
    const [bookName, setBookName] = useState<string>('')
    const [genre, setGenre] = useState<string>('')

    const DisplayAuthors = ({ authors }: { authors: Author[] }) => {
        return authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>)
    }

    const Authors = () => {
        return getAuthors.loading ?
            <option>Loading authors...</option> :
            <DisplayAuthors authors={getAuthors.data.authors} />
    }

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        addBook({
            variables: {
                name: bookName,
                genre: genre,
                authorId: selectedAuthor
            }
        })
        console.log(bookName, genre, selectedAuthor)
    }

    return (
        <form id="add-book" onSubmit={submitForm}>
        
            <div className="field">
                <label>Book name:</label>
                <input type="text" onChange={ (e) => setBookName(e.target.value) } />
            </div>

            <div className="field">
                <label>Genre:</label>
                <input type="text" onChange={ (e) => setGenre(e.target.value) } />
            </div>

            <div className="field">
                <label>Author:</label>
                <select onChange={ (e) => setSelectedAuthor(e.target.value) }>
                    <option>Select author</option>
                    <Authors />
                </select>
            </div>

            <button>+</button>

        </form>
    )
}