import { React, useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import app from "../utils/base";
import utils from "../utils/GetExternalData";
import { Button, Container, Row, Col } from "react-bootstrap";
import { SetMemberData, SetMovieData } from "../utils/AddToDB";
import Roles from "../utils/Roles";
import UserMngmt from "./UserManagement";
import { AuthContext } from "../utils/Auth";
import { SetUserData } from "./../utils/AddToDB";

const Home = ({ history }) => {
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state);
  const { currentUser } = useContext(AuthContext);

  const [uid, setUid] = useState("");
  useEffect(() => {
    utils.GetUsers().then((x) => SetMemberData(x, storeData, dispatch, currentUser.uid));
    utils.GetMovies().then((x) => SetMovieData(x, storeData, dispatch));
    SetUserData(dispatch, storeData);
    dispatch({ type: "UID", payload: currentUser.uid })
    // utils.GetMovies().then((x) => SetMovieData(x, storeData, dispatch));
  }, []);
  const name = storeData.user.filter((x) => x._id === currentUser.uid).map((x) => x.First_Name + " " + x.Last_Name);
  let role = storeData.user.filter((x) => x._id === currentUser.uid).map((x) => x.role);

  const [admin, setAdmin] = useState();
  return (
    <>
      <h1>Home</h1>
      <br />
      <br />
      Name : {name}
      <br />
      Role : {role}
      <Container>
        <Row>
          <Col>
            <Button onClick={() => console.log(storeData.users)}>Movies</Button>
          </Col>
          <Col>
            <Button onClick={() => console.log(storeData.movies)}>Subscriptions</Button>
          </Col>
          <Col>
            {role == "Admin" && <Button onClick={()=> setAdmin(!admin)}>User Managment</Button>}
            {<Button onClick={() => setAdmin(!admin)}>User Managment</Button>}
            <Button onClick={() => role}>lookup</Button>
          </Col>
          <Col>
            <Button onClick={() => app.auth().signOut()}>Sign out</Button>
          </Col>
        </Row>
        {admin && <UserMngmt />}
      </Container>
    </>
  );
};

export default Home;
