import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
// import { Button, InputGroup, FormControl } from 'react-bootstrap'
// this is not a terrible import, but on BIG apps you may have a performance hit
// not in runtime, mostly, but in BUNDLE SIZE
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { useState } from "react";
import { setUsernameAction } from "../actions";

// const mapStateToProps = (state) => state
// in this way we're giving to our component EVERY key of the redux store as a prop
// we just have cart so far, and the length of the products array can be found in
// cart.products.length

const mapStateToProps = (state) => ({
  cartLength: state.cart.content.length,
  userName: state.user.name
})

const mapDispatchToProps = (dispatch) => ({
  setReduxUsername: (name) => {
    dispatch(setUsernameAction(name))
  }
})

const CartIndicator = ({ cartLength, userName, setReduxUsername }) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')

  return (
    <div className="ml-auto mt-2">
      {
        userName ? (
          <Button color="primary" onClick={() => navigate("/cart")}>
            <FaShoppingCart />
            <span className="ml-2">{cartLength}</span>
          </Button>
        ) : (
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Set the username here"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick={() => setReduxUsername(username)}>Login!</Button>
            </InputGroup.Append>
          </InputGroup>
        )
      }
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CartIndicator)
// this is called a HOC (higher order component)

// connect can take up to 2 arguments:
// 1) mapStateToProps (for reading from the state)
// 2) mapDispatchToProps (for interacting with the state) <- not needed here