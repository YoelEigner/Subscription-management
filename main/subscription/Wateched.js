import { Container, Button, Card, ListGroup } from "react-bootstrap";
import Subscribe from "./Subscribe";
import {useState, useEffect, useContext} from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector} from "react-redux";
import {AuthContext} from "../../utils/Auth";

function MoviesWatched(props) {
  const [subscribe, setSubscribe] = useState(false);
  const [subData, setSubData] = useState([]);
  const history = useHistory();
  const storeData = useSelector((state) => state);
  const {permissions} = useContext(AuthContext);

  const hadnleMovieClick = (current) => {
    let movie = storeData.movies.filter((x) => x.name === current)
    history.push("/movieshome/" + current, { movies: movie, index: "0", moviedata: storeData.movies});
  };


  useEffect(() => {
    setSubData(props.subs);
  }, [props.subs, subData]);
  return (
      <Container>
        <br />
        <Card>
          <br />
          {permissions.CreateSubs && (
              <Button onClick={() => setSubscribe(!subscribe)} style={{ width: "20rem" }}>
                Subscribe To New Movie
              </Button>
          )}
          {subscribe && <Subscribe currentUID={props.currentUID} setvisible={(data) => setSubscribe(data)} />}
          <br />{" "}
          {subData.map((x, index) => {
            return (
                <div key={index}>
                  <ListGroup xs={4}>
                    <ListGroup.Item onClick={() => hadnleMovieClick(x.movieName)} action variant="light">
                      <Link to="/">{x.movieName}</Link>
                    </ListGroup.Item>
                    <ListGroup.Item action variant="light">
                      {x.scheduled}
                    </ListGroup.Item>
                  </ListGroup>
                  <br />
                </div>
            );
          })}
        </Card>
      </Container>
  );
}
export default MoviesWatched;
