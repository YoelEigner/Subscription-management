import React, { useEffect, useState } from "react";
import { appAuth } from "../utils/base";
import { useDispatch } from "react-redux";
import firebase from "firebase";
import { ProgressBar } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  const [permissions, setPermissions] = useState();
  const [name, setName] = useState();
  const [role, setRole] = useState();
  const [timeout, setTimeout] = useState(1);

  useEffect(() => {
    appAuth.auth().onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user != null) {
        await firebase
          .firestore()
          .collection("UserCollection")
          .get()
          .then((data) => {
            let access = data.docs
              .map((x) => x.data())
              .filter((x) => x._id === user.uid)
              .map((x) => {
                setName(x.First_Name + " " + x.Last_Name);
                setRole(x.role);
                setTimeout(x.TimeOut)
                return x.permissions;
              });
            user === null && dispatch({ type: "UID", payload: user.uid });
            setPermissions(access[0]);
            dispatch({ type: "SETPERMISSIONS", payload: access[0] });
            !access.length <= 0 && setPending(false);
            

          });
      } else if (user === null) {
        appAuth.auth().signOut();
        history.push("/login");
        setPending(false);
      }
    });
  }, [dispatch, history]);

  useEffect(() => {
    

  }, [currentUser])

  if (pending) {
    return (
      <>
        <label style={{ display: "grid", placeItems: "center" }}>Loading...</label>
        <ProgressBar animated now={100} />
      </>
    );
  }
 

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        permissions,
        name,
        role,
        pending,
        timeout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
