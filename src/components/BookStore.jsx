import { useState, useEffect } from "react";
import BookList from "./BookList";
import BookDetail from "./BookDetail";
import { Col, Row, Alert, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getBooksAction } from "../actions";

const BookStore = () => {

  const [bookSelected, setBookSelected] = useState(null)
  const dispatch = useDispatch()

  // const { stock: booksInStock, isError: booksError, isLoading: booksLoading } = useSelector(state => state.books)

  const booksInStock = useSelector(state => state.books.stock)
  const booksError = useSelector(state => state.books.isError)
  const booksLoading = useSelector(state => state.books.isLoading)

  useEffect(() => {
    dispatch(getBooksAction())
  }, [])

  const changeBook = (book) => setBookSelected(book);

  return (
    <Row>
      {
        booksLoading ? (
          <Spinner animation="border" variant="success" style={{
            position: 'absolute',
            top: '50%',
            left: '50%'
          }} />
        ) : (
          <>
            <Col md={4}>
              {
                booksError ? <div>
                  <Alert variant="danger">
                    ERROR WHILE FETCHING
                  </Alert>
                </div> : (
                  <BookList
                    bookSelected={bookSelected}
                    changeBook={changeBook}
                    books={booksInStock}
                  />
                )
              }
            </Col>
            <Col md={8}>
              <BookDetail
                bookSelected={bookSelected}
              />
            </Col>
          </>
        )
      }

    </Row>
  );
}

export default BookStore;
