/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Author = {
  __typename?: 'Author';
  age: Scalars['Float']['output'];
  books: Array<Book>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Book = {
  __typename?: 'Book';
  author: Author;
  authorId: Scalars['String']['output'];
  genre: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAuthor: Author;
  addBook: Book;
};


export type MutationAddAuthorArgs = {
  age: Scalars['Float']['input'];
  name: Scalars['String']['input'];
};


export type MutationAddBookArgs = {
  authorId: Scalars['String']['input'];
  genre: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  author: Author;
  authors: Array<Author>;
  book: Book;
  books: Array<Book>;
};


export type QueryAuthorArgs = {
  id: Scalars['String']['input'];
};


export type QueryBookArgs = {
  id: Scalars['String']['input'];
};
