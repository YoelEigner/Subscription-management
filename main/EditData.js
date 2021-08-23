import { Form, Button, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { deletePerson, updatePerson } from "../utils/DB";

function EditData(props) {
  const storeData = useSelector((state) => state);
  const [bkgColor, setbkgColor] = useState("lightgray");
  const [editAble, seteditAble] = useState(false);
  const dispatch = useDispatch();
  const [disableViewSubs, setDisableViewSubs] = useState(true);
  const [disableViewMovies, setDisableViewMovies] = useState(true);

  const handleUpdate = async (e) => {
    e.preventDefault();
    

    let index = storeData.user.findIndex((x) => x._id === props.uid);
    const {
      lName,
      fName,
      usrName,
      timeOut,
      role,
      crtSubs,
      delSubs,
      crtMovies,
      delMovies,
      viewMovies,
      viewSubs,
      Date_Careated,
      UpdateSubs,
      UpdateMovies,
    } = e.target.elements;
    const fromDate = new Date(Date_Careated.value);

    const temp = {
      _id: props.uid,
      colId: storeData.user[index].colId,
      Last_Name: lName.value,
      First_Name: fName.value,
      User_Name: usrName.value,
      TimeOut: timeOut.value,
      role: role.value,
      Date_Careated: fromDate,
      permissions: {
        CreateSubs: crtSubs.checked,
        DeleteSubs: delSubs.checked,
        CreateMovies: crtMovies.checked,
        DeleteMovies: delMovies.checked,
        ViewMovies: viewMovies.checked,
        ViewSubs: viewSubs.checked,
        UpdateMovies: UpdateMovies.checked,
        UpdateSubs: UpdateSubs.checked,
      },
    };
    dispatch({ type: "UPDATEUSER", payload: temp });
    dispatch({ type: "SETPERMISSIONS", payload: temp.permissions });
    updatePerson(temp);
    props.showAlert(true);
    seteditAble(false);
  };
  const handleCancel = () => {
    props.setuser(storeData.user);
    seteditAble(false);
  };
  const handleDel = async (id) => {
    deletePerson(id, props.uid);
    dispatch({ type: "DELETEUSER", payload: props.uid });
    props.setuser(storeData.user);
    alert("User Deleted!");
  };
  const makeEditable = () => {
    return editAble;
  };
  useEffect(() => {
    editAble ? setbkgColor("white") : setbkgColor("lightgray");
  }, [editAble]);

  useEffect(() => {
    if (props.x.permissions.CreateSubs === true || props.x.permissions.DeleteSubs === true || props.x.permissions.UpdateSubs === true) {
      setDisableViewSubs(true);
    } else {
      setDisableViewSubs(false);
    }
    if (props.x.permissions.CreateMovies === true || props.x.permissions.DeleteMovies === true || props.x.permissions.UpdateMovies === true) {
      setDisableViewMovies(true);
    } else {
      setDisableViewMovies(false);
    }
  }, [props.setuser, props.x]);

  const handleChange = (e, index, field) => {
    let newState = [...props.User];
    newState[index][field] = e.target.value;
    props.setuser(newState);
  };

  const handleChangeChbk = (e, index, field) => {
    let newState = [...props.User];

    newState[index].permissions[field] = e.target.checked;
    if (e.target.checked === true && (field === "CreateSubs" || field === "DeleteSubs" || field === "UpdateSubs")) {
      newState[index].permissions["ViewSubs"] = e.target.checked;
      setDisableViewSubs(true);
    }
    if (e.target.checked === true && (field === "CreateMovies" || field === "DeleteMovies" || field === "UpdateMovies")) {
      newState[index].permissions["ViewMovies"] = e.target.checked;
    }
    props.setuser(newState);
  };

  return (
    <Form onSubmit={handleUpdate}>
      <Container key={props.index}>
        <br />
        <div style={{ border: "1px solid black" }}>
          First Name :{" "}
          <input
            name="fName"
            value={props.x.First_Name}
            style={{ backgroundColor: bkgColor }}
            disabled={!makeEditable()}
            onChange={(e) => handleChange(e, props.index, "First_Name")}
          />
          <br />
          Last Name :
          <input
            name="lName"
            value={props.x.Last_Name}
            style={{ backgroundColor: bkgColor }}
            onChange={(e) => handleChange(e, props.index, "Last_Name")}
            disabled={!makeEditable()}
          />
          <br />
          User Name :
          <input
            name="usrName"
            value={props.x.User_Name}
            onChange={(e) => handleChange(e, props.index, "User_Name")}
            style={{ backgroundColor: bkgColor }}
            disabled={!makeEditable()}
          />
          <br />
          Sesstion Time Out :{" "}
          <input
            name="timeOut"
            value={props.x.TimeOut}
            onChange={(e) => handleChange(e, props.index, "TimeOut")}
            style={{ backgroundColor: bkgColor }}
            disabled={!makeEditable()}
          />
          <br />
          Date Created : <input name="Date_Careated" disabled={true} value={props.x.Date_Careated} />
          <br />
          Role :{" "}
          <input
            name="role"
            onChange={(e) => handleChange(e, props.index, "role")}
            value={props.x.role}
            disabled={!makeEditable()}
            style={{ backgroundColor: bkgColor }}
          />
          <div>
            Permission :
            <Form.Check
              name="crtSubs"
              checked={props.x.permissions.CreateSubs}
              onChange={(e) => handleChangeChbk(e, props.index, "CreateSubs")}
              disabled={!makeEditable()}
              label="Create Subscriptions"
            />
            <Form.Check
              name="delSubs"
              checked={props.x.permissions.DeleteSubs}
              onChange={(e) => handleChangeChbk(e, props.index, "DeleteSubs")}
              disabled={!makeEditable()}
              label="Delete Subscriptions"
            />
            <Form.Check
              name="UpdateSubs"
              checked={props.x.permissions.UpdateSubs}
              onChange={(e) => handleChangeChbk(e, props.index, "UpdateSubs")}
              disabled={!makeEditable()}
              label="Update Subscriptions"
            />
            <Form.Check
              name="viewSubs"
              checked={props.x.permissions.ViewSubs}
              onChange={(e) => handleChangeChbk(e, props.index, "ViewSubs")}
              // disabled={!makeEditable()}
              disabled={disableViewSubs}
              label="View Subscriptions"
            />
            <Form.Check
              name="crtMovies"
              checked={props.x.permissions.CreateMovies}
              onChange={(e) => handleChangeChbk(e, props.index, "CreateMovies")}
              disabled={!makeEditable()}
              label="Create Movies"
            />
            <Form.Check
              name="delMovies"
              checked={props.x.permissions.DeleteMovies}
              onChange={(e) => handleChangeChbk(e, props.index, "DeleteMovies")}
              disabled={!makeEditable()}
              label="Delete Movies"
            />
            <Form.Check
              name="viewMovies"
              checked={props.x.permissions.ViewMovies}
              onChange={(e) => handleChangeChbk(e, props.index, "ViewMovies")}
              // disabled={!makeEditable()}
              disabled={disableViewMovies}
              label="View Movies"
            />
            <Form.Check
              name="UpdateMovies"
              checked={props.x.permissions.UpdateMovies}
              onChange={(e) => handleChangeChbk(e, props.index, "UpdateMovies")}
              disabled={!makeEditable()}
              label="Update Movies"
            />
          </div>
          <br />
          {/* <Button onClick={() => setEditMode(!editMode)}>Edit</Button> */}
          {editAble ? <Button onClick={() => handleCancel()}>Cancel</Button> : <Button onClick={() => seteditAble(!editAble)}>Edit</Button>}
          {editAble ? (
            <Button variant="primary" type="submit">
              {" "}
              Update
            </Button>
          ) : (
            <Button variant="primary" onClick={() => handleDel(props.x.colId)}>
              Delete
            </Button>
          )}
          <br />
        </div>
        <br />
      </Container>
    </Form>
  );
}

export default EditData;
