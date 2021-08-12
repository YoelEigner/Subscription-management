import React, { useCallback } from "react";
import { withRouter } from "react-router";
import firebase from "firebase";
import app from "../utils/base";
import { Form, Button, Container, Row } from "react-bootstrap";

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password, fName, lName } = event.target.elements;
      // Date to Timestamp
      const time = firebase.firestore.Timestamp.fromDate(new Date());

      // Timestamp to Date
      const dateTime = time.toDate();
      try {
        await app.auth().createUserWithEmailAndPassword(email.value, password.value);
        let newUser = {
          id: app.auth().currentUser.uid,
          First_Name: fName.value,
          Last_Name: lName.value,
          Date_Careated: dateTime,
          TimeOut: "120",
          role : "user",
          permissions: {
            ViewSubs: false,
            CreateSubs: false,
            DeleteSubs: false,
            ViewMovies: false,
            CreateMovies: false,
            DeleteMovies: false,
          },
        };
        await firebase.firestore().collection("UserCollection").add(newUser);

        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );
  return (
    <div>
      <Container>
        <Row lg={2}>
          <Form onSubmit={handleSignUp}>
            <h1>Sign up</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control name="email" type="email" placeholder="Email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>First Name</Form.Label>
              <Form.Control name="fName" type="name" placeholder="First Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control name="lName" type="name" placeholder="Last Name" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <br />
            <br />
          </Form>
        </Row>
      </Container>
      ;
    </div>
  );
};

export default withRouter(SignUp);
