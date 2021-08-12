import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import app from "../utils/base.js";
import { AuthContext } from "../utils/Auth";
import { Form, Button, Container, Row} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from 'react-redux';

const Login = ({ history }) => {
  const storeData = useSelector((state) => state);

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app.auth().signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {   
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Container>
        <Row lg={2}>
          <Form onSubmit={handleLogin}>
            <h1>Log in</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control name="email" type="email" placeholder="Email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <br/>
            <br/>
            <Link to="/signup">Create Account?</Link>
          </Form>
        </Row>
      </Container>
    </div>
  );
};

export default withRouter(Login);
