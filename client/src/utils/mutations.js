import { gql } from '@apollo/client';

// LOGIN_USER will execute the loginUser mutation set up using Apollo Server.
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

// ADD_USER will execute the addUser mutation.
export const ADD_USER = gql`
  mutation addUser ($username: String!, $password: String!, $email: String!){
    addUser(username:$username, password:$password, email: $email){
      token 
      user {
        _id
        username
      }
    }
  }
`;

// SAVE_BOOK will execute the saveBook mutation.
export const SAVE_BOOK = gql`
  mutation saveBook($authors:[String], $description:String,
    $bookId: String, $image: String, $title:String)	{
      saveBook(input: {
              authors: $authors,
              description: $description,
              bookId: $bookId,
              image: $image,
              # link: "test1",
              title: $title
      }) {
        username
        email
        savedBooks{
          authors
          description
          bookId
          image
          link
          title
        }
      }
  }
`;

// REMOVE_BOOK will execute the removeBook mutation.
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId:String!) {
    removeBook(bookId: $bookId){
      username
      email
      savedBooks {
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;