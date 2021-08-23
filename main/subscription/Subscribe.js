import { Container, DropdownButton, Dropdown, Form, Button, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addSubs } from "../../utils/DB";

function Subscribe(props) {
  const [title, setTitle] = useState("Select Movie");
  const storeData = useSelector((state) => state);
  const dispatch = useDispatch();
  const [dropDownItems, setDropDownItems] = useState(storeData.subs);

  useEffect(() => {
    let currentSubs = storeData.subs.filter((x) => x.MemberId === props.currentUID);
    let subscribed = currentSubs.map((x) => x.movieName);
    let movies = storeData.movies.map((x) => x.name);
    let filtered = movies.filter((exists) => {
      return !subscribed.includes(exists);
    });
    setDropDownItems(filtered);
  }, [storeData.movies.length, storeData.subs.length]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    const { date } = e.target.elements;
    if (date.value == "" || title === "Select Movie") {
      alert("Please fill out the movie infomation below!");
    } else {
      const fromDate = new Date(date.value);
      let temp = { MemberId: props.currentUID, movieName: title, scheduled: fromDate };
      addSubs(temp);
      dispatch({ type: "ADDSUBS", payload: [...storeData.subs, { MemberId: props.currentUID, movieName: title, scheduled: date.value }] });

      alert("User has been subscribed!");
      props.setvisible(false);
    }
  };
  return (
    <Container>
      <br />
      <Form onSubmit={(e) => handleSubscribe(e)}>
        <Row>
          <Col>
            <Form.Label>Movie Name</Form.Label>
            <DropdownButton name="movie" title={title}>
              <div style={{  maxHeight: "300px",  overflowY: "auto"  }}>
              {dropDownItems.map((x, index) => {
                return(
                  <Dropdown.Item key={index}   onClick={() => setTitle(x)}>
                  {x}
                </Dropdown.Item>
                )
              })}
              </div>
            </DropdownButton>
          </Col>
          <Col>
            <Form.Label>Date</Form.Label>
            <Form.Control xs={5} name="date" type="date" placeholder="DD/MM/YYYY" />
          </Col>{" "}
          <br />
          <br />
          <br />
          <br />
        </Row>
        <Row>
          {" "}
          <Button type="submit" style={{ width: "10rem" }}>
            Subscribe User
          </Button>
        </Row>
      </Form>
    </Container>
  );
}
export default Subscribe;
