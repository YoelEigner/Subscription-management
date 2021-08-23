import { Container, Col, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addMember } from '../../utils/DB';

function AddMember(props) {
  const storeData = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleAddMember = (e) => {
    e.preventDefault();
    const { city, email, name} = e.target.elements;
    const newId = storeData.members.length + 1;
    let newMember = { city: city.value, email: email.value, name: name.value, _id : newId};

    alert("Member Added!");
    //update user in firebase
    addMember(newMember, storeData, dispatch)
    props.hide();
  };
  const handleChange = () => {
  };
  return (
    <Container>
      <Col style={{ border: "1px solid black" }} xs={6}>
        <b>Add Member</b>
        <br />
        <Form onSubmit={(e) => handleAddMember(e)}>
          <Form.Group className="mb-3" controlId="formGroupName">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" type="text" onChange={(e) => handleChange()} placeholder="Member Name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="email" onChange={(e) => handleChange(e, "premiered")} placeholder="Email Address" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupCity ">
            <Form.Label>City </Form.Label>
            <Form.Control name="city" type="text" onChange={(e) => handleChange(e, "genres")} placeholder="City" />
          </Form.Group>
          <Button type="submit">Add Member</Button> <Button onClick={props.hide}>Cancel</Button>
        </Form>
      </Col>
    </Container>
  );
}
export default AddMember;
