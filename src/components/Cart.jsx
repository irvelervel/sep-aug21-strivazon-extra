import Button from "react-bootstrap/Button";
import { FaTrash } from "react-icons/fa";
import { Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux'
// useSelector "replaces" mapStateToProps
// useDispatch "replaces" mapDispatchToProps
import { removeFromCartAction } from "../actions";

// const mapStateToProps = state => state
// const mapStateToProps = state => ({
//   cart: state.cart.content
// })

// const mapDispatchToProps = dispatch => ({
//   removeFromCart: (indexToRemove) => {
//     dispatch(removeFromCartAction(indexToRemove))
//   }
// })

// RULES OF HOOKS:
// 1) ONLY USE HOOKS INTO FUNCTIONAL REACT COMPONENTS
// 2) ONLY USE HOOK AT THE TOP LEVEL OF YOUR COMPONENT, OUTSIDE ANY LOOP/FUNCTION/CONDITION

const Cart = () => {

  // here!
  const cart = useSelector(state => state.cart.content)
  // cart now is the cart object!
  // with the content array inside of it!
  // const stockLength = useSelector(state => state.books.stock.length)
  // console.log(stockLength)
  // these properties are taken from the store but they're NOT PROPS ANY MORE!
  // they are declared directly inside the component with useSelector

  const dispatch = useDispatch()

  return (
    <Row>
      <Col sm={12}>
        <ul style={{ listStyle: "none" }}>
          {cart.map((book, i) => (
            <li key={i} className="my-4">
              <Button variant="danger" onClick={() => dispatch(removeFromCartAction(i))}>
                <FaTrash />
              </Button>
              <img
                className="book-cover-small"
                src={book.imageUrl}
                alt="book selected"
              />
              {book.title}
            </li>
          ))}
        </ul>
      </Col>
      <Row>
        <Col sm={12} className="font-weight-bold">
          TOTAL:{" "}
          {cart.reduce(
            (acc, currentValue) => acc + parseFloat(currentValue.price),
            0
          )}
        </Col>
      </Row>
    </Row>
  )
}

export default Cart;

// redux hooks allow you to skip:
// the connect function,
// the mapStateToProps function
// the mapDispatchToProps function