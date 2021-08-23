import { Container, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Members from "./members";
import AddMember from "./AddMember";
import { useParams, Redirect } from "react-router-dom";
import Home from "../Home";

function Subscribers() {
  const storeData = useSelector((state) => state);
  const [member, setMembers] = useState(storeData.members);
  const [subs, setSubs] = useState(true);
  const [addMembers, setAddMembers] = useState(false);
  // const { permissions } = useContext(AuthContext);
  const permissions = storeData.permissions;

  const { memberId } = useParams();
  useEffect(() => {
    setMembers(storeData.members);
  }, [storeData.members]);
  useEffect(() => {
    if (memberId === undefined) {
      setMembers(storeData.members);
    } else {
      setMembers(storeData.members.filter((x) => x._id === memberId));
    }
  }, [memberId, storeData.members]);
  const handleAddMembers = () => {
    setSubs(false);
    setAddMembers(true);
  };
  const handleSubs = () => {
    setMembers(storeData.members);
    setAddMembers(false);
    setSubs(true);
  };
  if (permissions.ViewSubs) {
    return (
      <Container>
        <Home>
          <b>Subscribers</b>
          <br />
          <br />
          <Row>
            <Col>{permissions.ViewSubs && <Button onClick={() => handleSubs()}>All Members</Button>}</Col>
            <Col>{permissions.CreateSubs && <Button onClick={() => handleAddMembers()}>Add Member</Button>}</Col>
          </Row>
          <br />
          <Row>
            <br />
            <br />
            {permissions.ViewSubs &&
              subs &&
              member.map((x, index) => {
                return (
                  <div key={index}>
                    <Members memberInfo={x} />
                    <br />
                  </div>
                );
              })}
            {addMembers && <AddMember hide={() => handleSubs()} />}
          </Row>
        </Home>
      </Container>
    );
  } else {
    return <Redirect to="/accessdenied" />;
  }
}
export default Subscribers;
