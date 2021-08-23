import { Col, Button, Container, Row, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState, useEffect, useContext } from "react";
import EditData from "./EditData";
import AddUser from "./Adduser";
import Home from "../main/Home";
import { AuthContext } from "./../utils/Auth";

function UserMngmt() {
  const storeData = useSelector((state) => state);
  const [addUser, setAddUser] = useState(false);
  const [User, setUser] = useState([]);

  useEffect(() => {
    setUser(storeData.user);
  }, [storeData.user]);

  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    setTimeout(function () {
      setShowAlert(false);
    }, 10000);
  }, [showAlert]);

  return (
    <Container>
      <Home>
        <h3>Users</h3>
        <br />
        <Row>
          <Col>
            <Button onClick={() => setAddUser(false)}>All Users</Button>
          </Col>
          <Col>
            <Button onClick={() => setAddUser(true)}>Add User</Button>
          </Col>
        </Row>
        <br />

        <Col xs={5}>{showAlert && <Alert variant="success">Updated </Alert>}</Col>
        {addUser ? (
          <AddUser setaddUser={(data) => setAddUser(data)} setuser={(data) => setUser(data)} />
        ) : (
          User.map((x, index) => {
            return (
              <div key={index}>
                <EditData x={x} uid={x._id} index={index} setuser={(data) => setUser(data)} showAlert={(show) => setShowAlert(show)} User={User} />
              </div>
            );
          })
        )}
      </Home>
    </Container>
  );
}

export default UserMngmt;
