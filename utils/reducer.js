const appReducer = (state = {user: [], movies: [], members: [], UID: "", subs: [], permissions: []}, action) => {
    switch (action.type) {
        case "SETPERMISSIONS":
            return {...state, permissions: action.payload};
        case "UID":
            return {...state, UID: action.payload};
        case "USER":
            return {...state, user: action.payload};
        case "ADDMOVIES":
            return {...state, movies: action.payload};
        case "ADDSUBS":
            return {...state, subs: action.payload};
        case "UPDATEMOVIES":
            let arrMovies = state.movies;
            let indexMovies = arrMovies.findIndex((x) => x._id === action.payload._id);
            if (indexMovies >= 0) {
                arrMovies[indexMovies] = action.payload;
            }
            return {...state, movies: arrMovies};
        case "ADDMEMBERS":
            return {...state, members: action.payload};
        case "UPDATEUSER":
            let arr = state.user;
            let index = arr.findIndex((x) => x._id === action.payload._id);
            if (index >= 0) {
                arr[index] = action.payload;
            }
            return {...state, user: arr};
        case "UPDATEMEMBER":
            let arrMember = state.members;
            let indexMember = arrMember.findIndex((x) => x._id === action.payload._id);
            if (indexMember >= 0) {
                arrMember[indexMember] = action.payload;
            }
            return {...state, members: arrMember};
        case "DELETEUSER":
            let arrDel = state.user;
            let indexDel = arrDel.findIndex((x) => x._id === action.payload);
            indexDel >= 0 && arrDel.splice(indexDel, 1);
            return {...state, user: arrDel};
        case "DELETEMEMBER":
            let arrMemberDel = state.members;
            let indexMemberDel = arrMemberDel.findIndex((x) => x._id === action.payload);
            indexMemberDel >= 0 && arrMemberDel.splice(indexMemberDel, 1);
            return {...state, members: arrMemberDel};

        case "DELETEMOVIES":
            let arrMovieDel = state.movies;
            let indexMovieDel = arrMovieDel.findIndex((x) => x._id === action.payload);
            indexMovieDel >= 0 && arrMovieDel.splice(indexMovieDel, 1);
            return {...state, movies: arrMovieDel};
        default:
            return state;
    }
};

export default appReducer;
