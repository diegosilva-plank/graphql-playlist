import mongoose from 'mongoose'

const Schema = mongoose.Schema

const authorSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true }
})

export const AuthorDB = mongoose.model('Author', authorSchema)