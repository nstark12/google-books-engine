import { gql } from "@apollo/client"

export const CREATE_USER = gql`
    mutation CreateUser($user: UserInput) {
        createUser(user: $user) {
        token
        user {
            _id
            email
            username
            savedBooks {
            _id
            authors
            bookId
            description
            link
            title
            }
        }
        }
    }

`
  
  
  export const LOGIN = gql`
    mutation Login($password: String!, $username: String, $email: String) {
        login(password: $password, username: $username, email: $email) {
        token
        user {
            _id
            email
            username
            savedBooks {
            _id
            authors
            bookId
            description
            link
            title
            }
        }
        }
    }
  `
  
  
  export const SAVE_BOOK = gql`
    mutation SaveBook($_id: ID!, $book: BookInput!) {
        saveBook(_id: $_id, book: $book) {
        _id
            email
            username
            savedBooks {
            _id
            authors
            bookId
            description
            link
            title
            }
        }
    }
  `
  
  
  export const DELETE_BOOK = gql`
    mutation DeleteBook($_id: ID!, $bookId: ID!) {
        deleteBook(_id: $_id, bookId: $bookId) {
        _id
            email
            username
            savedBooks {
            _id
            authors
            bookId
            description
            link
            title
            }
        }
    }
  `

