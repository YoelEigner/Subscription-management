import { Form, Col, Button, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { SetUserData } from "./../utils/AddToDB";

function EditUser(props) {
  const storeData = useSelector((state) => state);
  const [showUsers, setShowUsers] = useState();
  const dispatch = useDispatch();
  const [strData, setStrData] = useState([]);

  useEffect(() => {
    setStrData(storeData.user);
    console.log(props.currentUsr);
  }, []);

  return (
    <Container>
    <br />
    <div  style={{ border: "1px solid black" }}>
      <div>
        First Name : <input value={props.currentUsr.First_Name} onChange={(e) => dispatch({ type: "UPDATECURRUSR", payload: e.target.value })} />
      </div>
      <div>
        Last Name : <input value={props.currentUsr.Last_Name} />
      </div>
      <div>
        User Name : <input value={props.currentUsr.userName} />
      </div>
      <div>
        Sesstion Time Out : <input value={props.currentUsr.TimeOut} />
      </div>
      <div>
        Date Created : {String(props.currentUsr.Date_Careated.toDate())} 
      </div>
      <div>Permission : {props.currentUsr.role}</div>
      <br />
      <Button>Update</Button>
      <Button onClick={() => console.log(props.data(false))}>Cancel</Button>
      <br />
    </div>
    <br />
  </Container>
  );
}

export default EditUser;
