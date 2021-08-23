import { Container, ListGroup, ListGroupItem } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MembersWatched(props) {
  const storeData = useSelector((state) => state);
  const [members, setMembers] = useState([]);
  const findName = (id) => {
    let temp = storeData.members.filter((x) => x._id === id);
    return temp.map((x) => x.name);
  };
  useEffect(() => {
    setMembers(storeData.subs.filter((x) => x.movieName === props.name));
  }, [props.name, storeData.subs]);
  return (
    <Container>
      <b>Subscribers Watched</b>
      <br />
      <br />
      {members.length > 0 ? (
        members.map((x, index) => {
          return (
            <Container key={index}>
              <ListGroup>
                <ListGroupItem>
                  <Link to={"/members/" + x.MemberId}>{findName(x.MemberId)}</Link>
                </ListGroupItem>
                <ListGroupItem>{x.scheduled}</ListGroupItem>
              </ListGroup>
              <br />
            </Container>
          );
        })
      ) : (
        <b>This movie has no subscribers</b>
      )}

      {}
    </Container>
  );
}
export default MembersWatched;
