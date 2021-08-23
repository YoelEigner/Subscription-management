import { Form, Button, Container } from "react-bootstrap";
import { apiKey, authDomain } from "../utils/base";
import firebase from "firebase";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AddUser(props) {
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state);

  const handleSave = async (e) => {
    e.preventDefault();
    const { usrName, password, fName, lName, role } = e.target.elements;
    // Date to Timestamp
    const time = firebase.firestore.Timestamp.fromDate(new Date());
    // Timestamp to Date
    const dateTime = time.toDate();

    var config = { apiKey: apiKey, authDomain: authDomain};
    var secondaryApp = firebase.initializeApp(config, "Secondary" + Math.random());

    await secondaryApp
      .auth()
      .createUserWithEmailAndPassword(usrName.value, password.value)
      .then((firebaseUser) => {
        //I don't know if the next statement is necessary
        secondaryApp.auth().signOut();

        let newUser = {
          _id: firebaseUser.user.uid,
          First_Name: fName.value,
          Last_Name: lName.value,
          Date_Careated: dateTime,
          User_Name: usrName.value,
          TimeOut: "120",
          role: role.value,
          permissions: {
            ViewSubs: false,
            CreateSubs: false,
            DeleteSubs: false,
            UpdateSubs: false,
            ViewMovies: false,
            CreateMovies: false,
            DeleteMovies: false,
          },
        };
        props.setuser(newUser)
        let docRef = firebase.firestore().collection("UserCollection").doc(newUser._id);
        docRef.set(newUser).then((status) => {
          window.location.reload(); 
        });
        dispatch({ type: "USER", payload: [...storeData.user, newUser] });
        alert("User Created!");
        e.target.reset();
      });
  };
  const handleCancel = (e) => {
    // e.target.reset();
    props.setaddUser(false);
  };

  const bkgColor = "white";

  const [permissions, setPermissions] = useState({
    ViewSubs: true,
    CreateSubs: false,
    DeleteSubs: false,
    UpdateSubs: false,
    ViewMovies: true,
    CreateMovies: false,
    DeleteMovies: false,
    UpdateMovies: false,
  });

  return (
    <Form onSubmit={handleSave} name="form">
      <Container>
        <br />
        <div style={{ border: "1px solid black" }}>
          First Name : <input name="fName" style={{ backgroundColor: bkgColor }} />
          <br />
          Last Name : <input name="lName" style={{ backgroundColor: bkgColor }} />
          <br />
          User Name : <input name="usrName" style={{ backgroundColor: bkgColor }} />
          <br />
          Password : <input name="password" type="password" style={{ backgroundColor: bkgColor }} />
          <br />
          Sesstion Time Out : <input name="timeOut" style={{ backgroundColor: bkgColor }} />
          <br />
          Date Created : <input name="Date_Careated" disabled={true} value={Date()} />
          <br />
          <input
            name="role"
            style={{ backgroundColor: bkgColor }}
          />
          <div>
            Permission :
            <Form.Check
              checked={permissions.CreateSubs}
              onChange={(e) =>
                permissions.ViewSubs
                  ? setPermissions({ ...permissions, CreateSubs: e.target.checked })
                  : setPermissions({ ...permissions, CreateSubs: e.target.checked, ViewSubs: e.target.checked })
              }
              name="CreateSubs"
              label="Create Subscriptions"
            />
            <Form.Check
              checked={permissions.DeleteSubs}
              onChange={(e) =>
                permissions.ViewSubs
                  ? setPermissions({ ...permissions, DeleteSubs: e.target.checked })
                  : setPermissions({ ...permissions, DeleteSubs: e.target.checked, ViewSubs: e.target.checked })
              }
              name="delSubs"
              label="Delete Subscriptions"
            />
            <Form.Check
              checked={permissions.UpdateSubs}
              onChange={(e) =>
                permissions.ViewSubs
                  ? setPermissions({ ...permissions, UpdateSubs: e.target.checked })
                  : setPermissions({ ...permissions, UpdateSubs: e.target.checked, ViewSubs: e.target.checked })
              }
              name="UpdateSubs"
              label="Update Subscriptions"
            />
            <Form.Check
              checked={permissions.ViewSubs}
              onChange={(e) => setPermissions({ ...permissions, ViewSubs: e.target.checked })}
              name="viewSubs"
              label="View Subscriptions"
            />
            <Form.Check
              checked={permissions.CreateMovies}
              onChange={(e) =>
                permissions.CreateMovies
                  ? setPermissions({ ...permissions, CreateMovies: e.target.checked })
                  : setPermissions({ ...permissions, CreateMovies: e.target.checked, ViewMovies: e.target.checked })
              }
              name="crtMovies"
              label="Create Movies"
            />
            <Form.Check
              checked={permissions.DeleteMovies}
              onChange={(e) =>
                permissions.DeleteMovies
                  ? setPermissions({ ...permissions, DeleteMovies: e.target.checked })
                  : setPermissions({ ...permissions, DeleteMovies: e.target.checked, ViewMovies: e.target.checked })
              }
              name="delMovies"
              label="Delete Movies"
            />
            <Form.Check
              checked={permissions.ViewMovies}
              onChange={(e) => setPermissions({ ...permissions, ViewMovies: e.target.checked })}
              name="viewMovies"
              label="View Movies"
            />
            <Form.Check
              checked={permissions.UpdateMovies}
              onChange={(e) =>
                permissions.UpdateMovies
                  ? setPermissions({ ...permissions, UpdateMovies: e.target.checked })
                  : setPermissions({ ...permissions, UpdateMovies: e.target.checked, ViewMovies: e.target.checked })
              }
              name="UpdateMovies"
              label="Update Movies"
            />
          </div>
          <br />
          <Button type="submit">Save</Button>
          <Button onClick={(e) => handleCancel(e)}>Cancel</Button>
          <br />
        </div>
        <br />
      </Container>
    </Form>
  );
}
export default AddUser;
