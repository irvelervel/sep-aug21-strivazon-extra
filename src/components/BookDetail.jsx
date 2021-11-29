import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from 'react-redux'
import { addToCartAction } from "../actions";

// const mapStateToProps = (state) => ({
//   // this is a dummy mapStateToProps, we're writing it just to be able to declare mapDispatchToProps
//   // I'm not returning any key here because my component doesn't need to read anything from the state
//   userName: state.user.name
// })
// both these two are ALWAYS functions returning a single object
// const mapDispatchToProps = (dispatch) => ({
//   addToCart: function (bookToAdd) {
//     dispatch(addToCartAction(bookToAdd))
//   }
// })

const BookDetail = ({ bookSelected }) => {

  const [book, setBook] = useState(null)

  const userName = useSelector(state => state.user.name)
  const dispatch = useDispatch()

  useEffect(() => {
    setBook(bookSelected)
  }, [bookSelected])

  // the useEffect is doing exactly the same as this:
  // componentDidUpdate(prevProps) {
  //   if (prevProps.bookSelected !== this.props.bookSelected) {
  //     this.setState({
  //       book: this.props.bookSelected,
  //     });
  //   }
  // }

  return (
    <div className="mt-3">
      {book ? (
        <>
          <Row>
            <Col sm={12}>
              <h1>{book.title}</h1>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col sm={4}>
              <div className="mt-3">
                <img
                  className="book-cover"
                  src={book.imageUrl}
                  alt="book selected"
                />
              </div>
            </Col>
            <Col sm={8}>
              <p>
                <span className="font-weight-bold">Description:</span>
                {book.description}
              </p>
              <p>
                <span className="font-weight-bold">Price:</span>
                {book.price}
              </p>
              {
                userName ? (
                  <Button color="primary" onClick={() => dispatch(addToCartAction(book))}>
                    ADD TO CART
                  </Button>
                ) : <p>Log in to add this item to your cart!</p>
              }
            </Col>
          </Row>
        </>
      ) : (
        <Row>
          <Col sm={12}>
            <h3>Please select a book!</h3>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default BookDetail

// in here I don't need to read anything from the state
// my goal is to add an element to the cart, so I need to INTERACT with the state
// so I'll need mapDispatchToProps
// because it's the 2nd argument though, I cannot ignore the mapStateToProps,
// I still have to write it for inserting mapDispatchToProps as the second one

// const stefano = {
//   age: 34,
//   greets: function() {
//     alert('hello')
//   }
// }

// stefano.greets()