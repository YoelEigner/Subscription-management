import { Container, Col, Image, Button, Row, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase";
import { deleteMovie, updateMovie } from "../../utils/DB";
import MembersWatched from "./MembersWatched";
import { useHistory } from "react-router-dom";

function MovieInfo(props) {
  const [edit, setEdit] = useState();
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state);
  const permissions = storeData.permissions;

  const history = useHistory();

  const [currentMovie, setCurrentMovie] = useState({
    genres: "",
    image: { original: "", medium: "" },
    name: "",
    premiered: "",
    _id: 0,
  });
  useEffect(() => {
    setCurrentMovie(props.movies);
  }, [props.movies]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { name, date, genre, url } = e.target.elements;
    const temp = {
      _id: currentMovie._id,
      name: name.value,
      premiered: date.value,
      genres: genre.value,
      image: { medium: url.value },
    };

    dispatch({
      type: "UPDATEMOVIES",
      payload: temp,
    });
    
    setCurrentMovie(temp);
    let colId = await firebase
      .firestore()
      .collection("movies")
      .get()
      .then((id) => id.docs.filter((x) => x.data()._id === currentMovie._id));
    updateMovie(temp, colId[0].id);
    alert("Updated!");
    setEdit(false);
  };

  const handleCancel = () => {
    setEdit(false);
  };
  const handleDelete = async () => {
    deleteMovie(currentMovie.name, currentMovie._id, dispatch);
    props.serachval("")
    history.push("/movieshome/");
  };
  const movieInfomation = (
    <Container key={currentMovie.id} style={{ border: "1px solid black" }}>
      <Col>
        <h3>
          {currentMovie.name}, {currentMovie.premiered}
        </h3>
        <br />
        Genre : {currentMovie.genres}
        <br />
        <Row>
          <Col>
            <Image src={currentMovie.image.medium} rounded />
          </Col>
          <Col style={{ border: "1px solid black" }}>
            <MembersWatched name={currentMovie.name} />
          </Col>
          <Col>{/* <Subscribers /> */}</Col>
        </Row>
        <br />
        <br />
        {permissions.UpdateMovies && <Button onClick={() => setEdit(true)}>Edit</Button>}
        {permissions.DeleteMovies && <Button onClick={() => handleDelete()}>Delete</Button>}
      </Col>
      <br />
    </Container>
  );

  const editmovieInfomation = (
    <Container>
      <br />
      <br />
      <br />
      <Col style={{ border: "1px solid black" }} xs={6}>
        <Form onSubmit={(e) => handleUpdate(e)}>
          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              defaultValue={currentMovie.name}
              // onChange={(e) => handleChange(e, "name")}
              placeholder="Mvoie Name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupDate">
            <Form.Label>Date Premiered</Form.Label>
            <Form.Control
              defaultValue={currentMovie.premiered}
              name="date"
              type="date"
              // onChange={(e) => handleChange(e, "premiered")}
              placeholder="DD/MM/YYYY"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupGenre ">
            <Form.Label>Genre </Form.Label>
            <Form.Control
              defaultValue={currentMovie.genres}
              name="genre"
              type="text"
              // onChange={(e) => handleChange(e, "genres")}
              placeholder="Mvoie Genres"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupUrl">
            <Form.Label>URL</Form.Label>
            <Form.Control defaultValue={currentMovie.image.medium} name="url" type="url" placeholder="Image URL" />
          </Form.Group>
          <Button type="submit">Update</Button>
          <Button onClick={() => handleCancel()}>Cancel</Button>
        </Form>
      </Col>
    </Container>
  );

  return <div>{edit ? editmovieInfomation : movieInfomation}</div>;
}

export default MovieInfo;
