import { React, useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appAuth } from "../utils/base";
import {GetMovies, GetUsers} from "../utils/GetExternalData";
import { Container, Navbar, Nav, Row, Col } from "react-bootstrap";
import { getMovieData, SetMemberData, setMembers, SetMovieData, setSubscriptions } from "../utils/DB";
import UserMngmt from "./UserManagement";
import { AuthContext } from "../utils/Auth";
import { SetUserData } from "../utils/DB";
import { useHistory } from "react-router-dom";

const Home = (props) => {
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state);
  const { timeout, currentUser, name, role } = useContext(AuthContext);
  const [usrMgmt] = useState();
  const history = useHistory();

  useEffect(() => {
    // GetUsers().then((x) => SetMemberData(x, storeData, dispatch, currentUser.uid));
    // GetMovies().then((x) => SetMovieData(x, storeData, dispatch));
  

    SetUserData(dispatch, storeData);
    getMovieData(dispatch);
    setSubscriptions(dispatch);
    setMembers(dispatch);
  }, [currentUser]);

  const hadnleAutoSignOut = () => {
    setTimeout(async () => {
      await appAuth.auth().signOut();
      history.push("/login");
    }, timeout * 60000);
  };
  useEffect(() => {
    hadnleAutoSignOut();
  }, []);
  const handleUserClick = () => {
    history.push("/usermanage/");
  };
  const handleSubsClick = () => {
    history.push("/members/");
  };

  const handleClick = () => {
    history.push("/movieshome/");
  };
  const hadnleSignOut = async () => {
    await appAuth.auth().signOut();
    history.push("/login");
  };
  return (
    <>
      <Navbar fixed="top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={() => handleClick()} activeclassname="active">
            Movies
          </Navbar.Brand>
          <Nav className="me-auto">
            {role == "Admin" && (
              <Nav.Link onClick={() => handleUserClick()} activeclassname="active">
                User Managment
              </Nav.Link>
            )}
            <Nav.Link onClick={() => handleSubsClick()} activeclassname="active">
              Subscriptions
            </Nav.Link>

            <Nav.Link onClick={() => hadnleSignOut()}>Sign Out</Nav.Link>
          </Nav>

          <Nav>
            <Row>
              <Col>
                <Navbar.Text>Name : {name}</Navbar.Text>
                <Col>
                  <Navbar.Text> Role : {role}</Navbar.Text>
                </Col>
              </Col>
            </Row>
          </Nav>
        </Container>
      </Navbar>
      <br />
      <br />
      <Row>
        {" "}
        <br />
      </Row>
      <br />
      {props.children}
      {usrMgmt && <UserMngmt />}
    </>
  );
};

export default Home;
