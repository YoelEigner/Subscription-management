import { Container, Col, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import firebase from "firebase";

export function AddMovie(props) {
  const [newMovie, setNewMovie] = useState([{}]);
  const storeData = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleAddMovie = (e) => {
    e.preventDefault();
    const { name, date, genre, url } = e.target.elements;

    if (name.value === "" || date.value === "=" || genre.value === "=" || url.value === "=") {
      alert("Please fill out the movie infomation below!");
    } else {
      let newMovie = { _id: props.newId, name: name.value, premiered: date.value, genres: genre.value, image: { medium: url.value } };
      let temp = [...storeData.movies, newMovie];
      dispatch({
        type: "ADDMOVIES",
        payload: temp,
      });
      firebase.firestore().collection("movies").add(newMovie);
      alert("Movie Added!");
      props.cancel(true);
    }
  };

  const handleChange = (e, feild) => {
    setNewMovie([...newMovie, { feild: e.target.value }]);
  };
  return (
    <Container>
      <Col style={{ border: "1px solid black" }} xs={6}>
        <b>Add Movie</b>
        <br />
        <Form onSubmit={(e) => handleAddMovie(e)}>
          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" type="text" onChange={(e) => handleChange(e, "name")} placeholder="Mvoie Name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupDate">
            <Form.Label>Date Premiered</Form.Label>
            <Form.Control name="date" type="date" onChange={(e) => handleChange(e, "premiered")} placeholder="DD/MM/YYYY" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupGenre ">
            <Form.Label>Genre </Form.Label>
            <Form.Control name="genre" type="text" onChange={(e) => handleChange(e, "genres")} placeholder="Mvoie Genres" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupUrl">
            <Form.Label>URL</Form.Label>
            <Form.Control name="url" type="url" placeholder="Image URL" />
          </Form.Group>
          <Button type="submit">Add Movie</Button>
          <Button onClick={() => props.cancel(true)}>Cancel</Button>
        </Form>
      </Col>
    </Container>
  );
}
