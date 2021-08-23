import { Button, Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import MovieInfo from "./MovieInfo";
import { AddMovie } from "./AddMovie";
import { useParams, Redirect } from "react-router-dom";
import Home from "../Home";

function MoviesHome() {
  const storeData = useSelector((state) => state);
  const [allMovies, setAllMovies] = useState(true);
  const [searchVal, setSearchVal] = useState("");

  const permissions = storeData.permissions;
  const { movie } = useParams();
  const [filteredMovies, setFilteredMovies] = useState([]);

  let newId = storeData.movies.map((x) => {
    return x.id + 1;
  });
  useEffect(() => {}, [permissions]);

  useEffect(() => {
    setFilteredMovies(storeData.movies.filter((movie) => movie.name.toLowerCase().includes(searchVal.toLowerCase())));
  }, [searchVal, movie, storeData]);

  useEffect(() => {
    try {
      setSearchVal(movie.toLowerCase());
    } catch {}
  }, [movie]);

  if (permissions === undefined) {
    return <Redirect to="/login" />;
  } else if (permissions.ViewMovies) {
    return (
      <Container>
        <Home>
          <Row>
            <br />
            <br />
            <h3>Movies</h3>
            <br />
            <br />
            <Col>
              <Button onClick={() => setSearchVal("")}>All Movies</Button>
            </Col>
            <Col>{permissions.CreateMovies && <Button onClick={() => setAllMovies(false)}>Add Movies</Button>}</Col>
            <Col>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Search Movie"
                  onChange={(e) => setSearchVal(e.target.value)}
                  aria-label="Search Movie"
                  aria-describedby="basic-addon2"
                />
              </InputGroup>
            </Col>
          </Row>
          <br />
          {allMovies ? (
            filteredMovies.map((x, index) => {
              return (
                <div key={index}>
                  {permissions.ViewMovies && <MovieInfo movies={x} serachval={(value) => setSearchVal(value)} />}
                  <br />
                </div>
              );
            })
          ) : (
            <AddMovie cancel={(data) => setAllMovies(data)} newId={newId.length + 1} />
          )}
        </Home>
      </Container>
    );
  } else if (permissions.ViewMovies === false) {
    return <Redirect to="/accessdenied" />;
  } else {
    return <div></div>;
  }
}

export default MoviesHome;
