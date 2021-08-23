import firebase from "firebase";

export function SetMovieData(x, storeData, dispatch) {
  if (storeData.movies.length >= 1) {
  } else {
    dispatch({ type: "ADDMOVIES", payload: x.data.slice(0, 20) });
  }
  let movieData = [];
  x.data.map((movies) => {
    movieData.push({ _id: movies.id, genres: movies.genres, image: movies.image, name: movies.name, premiered: movies.premiered });
  });
  //check if movies is already in DB else add them
  firebase
    .firestore()
    .collection("movies")
    .get()
    .then((snap) => {
      if (snap.size <= 1) {
        movieData.slice(0, 20).map((x) => {
          firebase.firestore().collection("movies").add(x);
        });
      }
    });
}

export function SetMemberData(x, storeData, dispatch, uid) {
  if (storeData.members.length >= 1) {
  } else {
    dispatch({ type: "ADDMEMBERS", payload: x.data });
  }
  let userData = [];
  x.data.map((usr) => {
    userData.push({ _id: usr.id, name: usr.name, email: usr.email, city: usr.address.city });
  });
  //check if users is already in DB else add them
  firebase
    .firestore()
    .collection("members")
    .get()
    .then((snap) => {
      if (snap.size <= 1) {
        userData.forEach((x) => {
          firebase.firestore().collection("members").add(x);
        });
      }
    });
}

export async function SetUserData(dispatch, storeData) {
  if (storeData.UID) {
  } else {
    await firebase
      .firestore()
      .collection("UserCollection")
      .get()
      .then((data) => {
        let persData = [];

        data.forEach((doc) => {
          persData.push({
            _id: doc.data()._id,
            colId: doc.id,
            Date_Careated: doc.data().Date_Careated.toDate().toDateString(),
            First_Name: doc.data().First_Name,
            Last_Name: doc.data().Last_Name,
            User_Name: doc.data().User_Name,
            TimeOut: doc.data().TimeOut,
            role: doc.data().role,
            permissions: doc.data().permissions,
          });
        });
        dispatch({ type: "USER", payload: persData });
      });
  }
}
export const updatePerson = (payload) => {
  let docRef = firebase.firestore().collection("UserCollection").doc(payload.colId);
  docRef.set(payload).then((status) => {
    return status;
  });
};

export const deletePerson = (id, uid) => {
  let docRef = firebase.firestore().collection("UserCollection").doc(id);
  docRef.delete().then((status) => {
    return status;
  });
};

export const updateMovie = (payload, colId) => {
  let docRef = firebase.firestore().collection("movies").doc(colId);
  docRef.set(payload).then((status) => {
    return status;
  });
};
export const getMovieData = (dispatch) => {
  firebase
    .firestore()
    .collection("movies")
    .get()
    .then((data) => {
      let movieData = [];

      data.forEach((movies) => {
        movieData.push({
          _id: movies.data()._id,
          genres: movies.data().genres,
          image: movies.data().image,
          name: movies.data().name,
          premiered: movies.data().premiered,
        });
      });

      dispatch({ type: "ADDMOVIES", payload: movieData });
    });
};

export const setSubscriptions = (dispatch) => {
  firebase
    .firestore()
    .collection("subscriptions")
    .get()
    .then((data) => {
      let subData = [];

      data.forEach((subs) => {
        subData.push({
          MemberId: subs.data().MemberId,
          movieName: subs.data().movieName,
          scheduled: subs.data().scheduled.toDate().toDateString(),
        });
      });
      dispatch({ type: "ADDSUBS", payload: subData });
    });
};

export const setMembers = (dispatch) => {
  firebase
    .firestore()
    .collection("members")
    .get()
    .then((data) => {
      let memberData = [];
      data.forEach((subs) => {
        memberData.push({
          _id: subs.id,
          mId: subs.data()._id,
          name: subs.data().name,
          email: subs.data().email,
          city: subs.data().city,
        });
      });
      dispatch({ type: "ADDMEMBERS", payload: memberData });
    });
};

export const addSubs = (payload) => {
  firebase
    .firestore()
    .collection("subscriptions")
    .add(payload)
    .then((stat) => {
      return stat;
    });
};

export const addMember = (newMember, storeData, dispatch) => {
  firebase
    .firestore()
    .collection("members")
    .add(newMember)
    .then((docRef) => {
      newMember._id = docRef.id;
      let temp = [...storeData.members, newMember];
      dispatch({ type: "ADDMEMBERS", payload: temp });
    });
};

export const updateMember = (payload, id) => {
  let docRef = firebase.firestore().collection("members").doc(id);
  docRef.set(payload).then((status) => {
    return status;
  });
};

export const deleteMember = async (id) => {
  let docRef = firebase.firestore().collection("members").doc(id);
  docRef.delete().then((status) => {
    return status;
  });
  deleteSubs(docRef.id);
};

export const deleteMovie = async (movieName, id, dispatch) => {
  //deleteMovie
  let movieId = await firebase
    .firestore()
    .collection("movies")
    .get()
    .then((movieId) => movieId.docs.filter((x) => x.data()._id === id).map((x) => x.id));
  dispatch({ type: "DELETEMOVIES", payload: id });
  let docRef = firebase.firestore().collection("movies").doc(movieId[0]);
  docRef.delete().then((status) => {
    alert("Movie Deleted!");
  });
  deleteSubs(movieName);
};

const deleteSubs = async (memberId) => {

  // Delete Subscriptions
  let subId = await firebase
    .firestore()
    .collection("subscriptions")
    .get()
    .then((id) => id.docs.filter((x) => x.data().MemberId === memberId || x.data().movieName === memberId).map((x) => x.id));

  subId.forEach((id) => {
    let SubDel = firebase.firestore().collection("subscriptions").doc(id);
    SubDel.delete();
    
  });
};
