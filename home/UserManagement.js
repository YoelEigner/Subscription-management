import { Form, Col, Button, Container, Row, FormCheck } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { SetUserData } from "./../utils/AddToDB";
import EditUser from "./EditData";

function UserMngmt() {
  const storeData = useSelector((state) => state);
  const [showUsers, setShowUsers] = useState();
  const [editMode, setEditMode] = useState();
  const [bkgColor, setbkgColor] = useState("lightgray");
  const [editAble, seteditAble] = useState(false);
  const [checked, setChecked] = useState([]);
  const [User, setUser] = useState(storeData.user);

  const dispatch = useDispatch();

  const handleUpdate = useCallback(async (event) => {
    event.preventDefault();
    const { lName, fName, usrName, timeOut, role, crtSubs, delSubs, crtMovies, delMovies, viewMovies, viewSubs } = event.target.elements;
    console.log(
      lName.value,
      fName.value,
      usrName.value,
      timeOut.value,
      role.value,
      crtSubs.checked,
      delSubs.checked,
      crtMovies.checked,
      delMovies.checked,
      viewMovies.checked,
      viewSubs.checked
    );

    dispatch({ type: "UPDATEUSER", payload: "persData" });
  });
  const makeEditable = () => {
    return editAble;
  };
  useEffect(() => {
    editAble ? setbkgColor("white") : setbkgColor("lightgray");
  }, [editAble]);

  useEffect(() => {
    setUser(storeData.user);
  }, []);

  const handleChange = (e) => {
    console.log(e.target.value);
    setUser([...User, { role: e.target.value }]);
  };

  const showUsr = () =>
    User.map((x, index) => {
      return (
        <Form onSubmit={handleUpdate}>
          <Container>
            <br />
            <div key={index} style={{ border: "1px solid black" }}>
              First Name :{" "}
              <input
                name="fName"
                value={x.First_Name}
                style={{ backgroundColor: bkgColor }}
                contentEditable={makeEditable()}
                onChange={(e) => setUser([{ ...User[index], First_Name: e.target.value }])}
              />
              <br />
              Last Name :
              <input
                name="lName"
                value={x.Last_Name}
                style={{ backgroundColor: bkgColor }}
                onChange={(e) => setUser([{ ...User[index], Last_Name: e.target.value }])}
                contentEditable={makeEditable()}
              />
              <br />
              User Name :
              <input
                name="usrName"
                value={x.User_Name}
                onChange={(e) => setUser([{ ...User[index], User_Name: e.target.value }])}
                style={{ backgroundColor: bkgColor }}
                contentEditable={makeEditable()}
              />
              <br />
              Sesstion Time Out :{" "}
              <input
                name="timeOut"
                value={x.TimeOut}
                onChange={(e) => setUser([{ ...User[index], TimeOut: e.target.value }])}
                style={{ backgroundColor: bkgColor }}
                contentEditable={makeEditable()}
              />
              <br />
              {/* Date Created : <input disabled={true} value={x.Date_Careated.toDate()} /> */}
              <br />
              Role :{" "}
              <input
                name="role"
                onChange={(e) => setUser([{ ...User[index], role: e.target.value }])}
                value={x.role}
                disabled={!makeEditable()}
                style={{ backgroundColor: bkgColor }}
                contentEditable={makeEditable()}
              />
              <div>
                Permission :
                <Form.Check
                  name="crtSubs"
                  checked={x.permissions.CreateSubs}
            
                  onChange={(e) => setUser([{ ...User[index].permissions[4], CreateSubs : e.target.value }])}
                  disabled={!makeEditable()}
                  label="Create Subscriptions"
                />
                <Form.Check name="delSubs" checked={x.permissions.DeleteSubs} disabled={!makeEditable()} label="Delete Subscriptions" />
                <Form.Check name="crtMovies" checked={x.permissions.CreateMovies} disabled={!makeEditable()} label="Create Movies" />
                <Form.Check name="delMovies" checked={x.permissions.DeleteMovies} disabled={!makeEditable()} label="Delete Movies" />
                <Form.Check name="viewMovies" checked={x.permissions.ViewMovies} disabled={!makeEditable()} label="View Movies" />
                <Form.Check name="viewSubs" checked={x.permissions.ViewSubs} disabled={!makeEditable()} label="View Subscriptions" />
              </div>
              <br />
              <Button onClick={() => seteditAble(!editAble)}>Edit</Button>
              {/* <Button onClick={() => setEditMode(!editMode)}>Edit</Button> */}
              {editMode && <EditUser data={(e) => setEditMode(e)} currentUsr={x} />}
              <Button variant="primary" type="submit">
                Update
              </Button>
              <Button variant="primary" onClick={() => console.log(User)}></Button>
              <br />
            </div>
            <br />
          </Container>
        </Form>
      );
    });

  return (
    <Container>
      <br />
      <br />
      <h3>Users</h3>
      <br />
      <Row>
        <Col>
          <Button onClick={() => setShowUsers(!showUsers)}>All Users</Button>
        </Col>
        <Col>
          <Button>Add User</Button>
        </Col>
      </Row>
      <br />
      {showUsers && showUsr()}
    </Container>
  );
}

export default UserMngmt;
