// import React, { useState, useEffect } from 'react';
import React, { useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

// import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';

const SavedBooks = () => {
  ///// QUERY BOOK
  const { loading, data, refetch } = useQuery(GET_ME);

  let userData = data?.me || {};

  ///// REMOVE BOOK - MUST COME AT TOP
  const[removeBook, { error }] = useMutation(REMOVE_BOOK);

  // REFRESH CATCH UPON PAGE LOAD (1 TIME ONLY - refetch is a constant)
  useEffect(() => {
    // console.log(userData);
    refetch();
  }, [refetch]);


  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    console.log('userdata: ', userData);

    if (!token) {
      return false;
    }

    try {
      console.log('remove bookId: ', bookId);

      await removeBook({variables: {bookId}});   /// MUST PASS ARGUMENTS LIKE THIS

      refetch(); // refetch from server instead of relying on cache

      // upon success, remove book's id from localStorage
      removeBookId(bookId); // keep in place
      
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }



  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
          {error && <span className="ml-2">Something went wrong...</span>}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
