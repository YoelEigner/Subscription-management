import React, { useCallback } from "react";
import { withRouter } from "react-router";
import firebase from "firebase";
import {appAuth} from "../utils/base";
import { Form, Button, Container, Row } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from 'react-redux';

const SignUp = ({ history }) => {
  const dispatch = useDispatch()
  const [exist, setExist] = useState({ exists: false, colId: "" });

  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password, fName, lName } = event.target.elements;
      // Date to Timestamp
      const time = firebase.firestore.Timestamp.fromDate(new Date());
      // Timestamp to Date
      const dateTime = time.toDate();
      firebase
        .firestore()
        .collection("UserCollection")
        .get()
        .then((data) => {
          data.forEach((doc) => {

            if (doc.data().email === email.value) {
              setExist({ exists: true, colId: doc.id });
            }
          });
        });
        console.log(exist, email.value)

      try {
        if (exist.exists == true) {
          console.log(exist, email.value)

          await appAuth.auth().createUserWithEmailAndPassword(email.value, password.value);
          let newUser = {
            _id: appAuth.auth().currentUser.uid,
            First_Name: fName.value,
            Last_Name: lName.value,
            Date_Careated: dateTime,
            User_Name: email.value,
            TimeOut: "120",
            role: "user",
            permissions: {
              ViewSubs: false,
              CreateSubs: false,
              DeleteSubs: false,
              UpdateSubs : false,
              ViewMovies: true,
              CreateMovies: false,
              DeleteMovies: false,
            },
          };
          dispatch({ type: "SETPERMISSIONS", payload: newUser.permissions });

          let docRef = firebase.firestore().collection("UserCollection").doc(exist.colId);
          docRef.set(newUser).then((status) => {
            return status;
          });
          // await firebase.firestore().collection("UserCollection").add(newUser);

          history.push("/");
          setExist(false);
        } else {
          alert("Please speak to your account rep tp create an account");
        }
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
