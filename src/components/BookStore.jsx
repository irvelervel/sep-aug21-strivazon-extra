import { Component } from "react";
import BookList from "./BookList";
import BookDetail from "./BookDetail";
import { Col, Row, Alert, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { getBooksAction } from "../actions";

const mapStateToProps = (state) => ({
  booksInStock: state.books.stock,
  booksError: state.books.isError,
  booksLoading: state.books.isLoading
})

const mapDispatchToProps = (dispatch) => ({
  getBooks: () => {
    dispatch(getBooksAction())
  }
})

class BookStore extends Component {
  state = {
    bookSelected: null,
  };

  componentDidMount = async () => {
    // we need to dispatch getBooksAction here!
    // but this component is still not connected to the redux store
    // so let's connect it first
    this.props.getBooks()
  };

  changeBook = (book) => this.setState({ bookSelected: book });

  render() {
    return (
      <Row>
        {
          this.props.booksLoading ? (
            <Spinner animation="border" variant="success" style={{
              position: 'absolute',
              top: '50%',
              left: '50%'
            }}/>
          ) : (
            <>
              <Col md={4}>
                {
                  this.props.booksError ? <div>
                    <Alert variant="danger">
                      ERROR WHILE FETCHING
                    </Alert>
                  </div> : (
                    <BookList
                      bookSelected={this.state.bookSelected}
                      changeBook={this.changeBook}
                      books={this.props.booksInStock}
                    />
                  )
                }
              </Col>
              <Col md={8}>
                <BookDetail
                  bookSelected={this.state.bookSelected}
                />
              </Col>
            </>
          )
        }

      </Row>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookStore);
