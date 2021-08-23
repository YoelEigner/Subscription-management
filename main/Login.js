import React, { useCallback, useContext, useEffect } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { appAuth } from "../utils/base.js";
import { AuthContext } from "../utils/Auth";
import { Form, Button, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from "firebase";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      appAuth
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
          return appAuth
            .auth()
            .signInWithEmailAndPassword(email.value, password.value)
            .then(() => {
            });
        })
        .catch((error) => {
          alert(error);
        });
    },
    [history]
  );
  
  const { currentUser, pending } = useContext(AuthContext);
  useEffect(() => {
    if (currentUser && pending === false) {
      history.push("/movieshome/");
    }
  }, [currentUser, history, pending]);

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
            <br />
            <br />
            <Link to="/signup">Create Account?</Link>
          </Form>
        </Row>
      </Container>
    </div>
  );
};

export default withRouter(Login);
