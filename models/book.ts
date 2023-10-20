import mongoose from 'mongoose'

const Schema = mongoose.Schema

const bookSchema = new Schema({
    name: { type: String, required: true },
    genre: { type: String, required: true },
    authorId: { type: String, required: true }
})

export const BookDB = mongoose.model('Book', bookSchema)