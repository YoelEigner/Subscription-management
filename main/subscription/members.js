import { Container, Button, Card, Form, Col } from "react-bootstrap";
import MoviesWatched from "./Wateched";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { deleteMember, updateMember } from "../../utils/DB";
import { useDispatch } from "react-redux";

function Members(props) {
  const [watched, setWatched] = useState(false);
  const storeData = useSelector((state) => state);
  const [subscriptions, setSubscriptions] = useState([{ MemberId: "", movieName: "", scheduled: "" }]);
  const [edit, setEdit] = useState();
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(props.memberInfo);
  const permissions = storeData.permissions

  useEffect(() => {
    try {
      let currentSubs = storeData.subs.filter((x) => x.MemberId === currentUser._id);
      setSubscriptions(currentSubs);
    } catch (e) {}
  }, [storeData.subs, currentUser._id]);
  useEffect(() => {
    setCurrentUser(props.memberInfo);
  }, [storeData.members, props.memberInfo]);

  const handleUpdateMember = (e) => {
    e.preventDefault();

    const { city, email, name } = e.target.elements;
    let newMember = { city: city.value, email: email.value, name: name.value, _id: currentUser.mId };
    //update firebase
    updateMember(newMember, currentUser._id);
    dispatch({ type: "UPDATEMEMBER", payload: newMember });
    setCurrentUser(newMember);
    // alert("Member Updated!");
    setEdit(false);
  };

  const handleDel = () => {
    dispatch({ type: "DELETEMEMBER", payload: currentUser._id });
    deleteMember(currentUser._id);
    alert("Memeber Deleted!");
  };
  let editMember = (
    <Container>
      <Col style={{ border: "1px solid black" }} xs={6}>
        <b>Add Member</b>
        <br />
        <Form onSubmit={(e) => handleUpdateMember(e)}>
          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>Name</Form.Label>
            <Form.Control defaultValue={currentUser.name} name="name" type="text" placeholder="Member Name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control defaultValue={currentUser.email} name="email" type="email" placeholder="Email Address" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupCity ">
            <Form.Label>City </Form.Label>
            <Form.Control defaultValue={currentUser.city} name="city" type="text" placeholder="City" />
          </Form.Group>
          <Button type="submit">Update</Button>
          <Button onClick={() => setEdit(false)}>Cancel</Button>
        </Form>
      </Col>
    </Container>
  );

  let memberInfo = (
    <Container>
      <Card style={{ width: "40rem" }}>
        <Card.Header as="h5">{currentUser.name}</Card.Header>
        <Card.Body>
          <Card.Title>Email</Card.Title>
          <Card.Text>{currentUser.email}</Card.Text>
          <Card.Title>City</Card.Title>
          <Card.Text>{currentUser.city}</Card.Text>
          {permissions.UpdateSubs && <Button style={{ width: "5rem" }} onClick={() => setEdit(true)}>
            Edit
          </Button>}{" "}
          {permissions.DeleteSubs &&<Button style={{ width: "5rem" }} onClick={() => handleDel()}>
            Delete
          </Button>}{" "}
          {permissions.ViewSubs &&<Button onClick={() => setWatched(!watched)} variant="primary">
            Movies Watched
          </Button>}
          {permissions.ViewSubs && watched && <MoviesWatched subs={subscriptions} currentUID={currentUser._id} />}
        </Card.Body>
      </Card>
    </Container>
  );

  return <Container>{edit ? editMember : memberInfo}</Container>;
}
export default Members;
