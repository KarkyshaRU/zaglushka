import firebase from "../config/firebase";

import {
  isValidBirthday,
  isValidDocs,
  isValidLenghtPass,
  isValidLocation,
  isValidPass,
  isValidateEmail,
  isValidateFullName,
} from "../helpers/validate";

const db = firebase.firestore();
const storage = firebase.storage();

const initState = {
  lastFeddbacks: [],
  allFeedbacks: [],

  usersFilterLine: "",

  users: [],
  crid: {},
  errors: {
    login: [],
    reg: [],
  },
  currentProfile: {
    id: null,
    info: null,
  },

  regForm: {
    fullName: "",
    email: "",
    location: "",
    birthday: "",
    pass: "",
    repeatPass: "",
    images: "",
    block: false,
    role: 1,
  },

  credUser: {
    id: null,
    info: null,
  },

  servicesFilterLine: "",

  services: [],

  querties: [],

  isLoading: true,
};

async function asyncForEach(arr, callback) {
  for (let i = 0; i < arr.length; i++) await callback(arr[i], i, arr);
}

// LOADER
const SET_IS_LOADING = "SET_IS_LOADING";

// QUERY
const UPDATE_DOC = "UPDATE_DOC";
const ADD_QUERY = "ADD_QUERY";
const SET_QUERIES = "SET_QUERIES";
const GET_UPDATED_QUERY = "GET_UPDATED_QUERY";

const ADD_USER = "ADD_USER";
const SET_USERS = "SET_USERS";
const UPDATE_USER_INFO = "UPDATE_USER_INFO";

const AUTH_USER = "AUTH_USER";
const ADD_ERROR = "ADD_ERROR";
const CLEAR_ERRORS = "CLEAR_ERRORS";

const SET_CURRENT_PROFILE = "SET_CURRENT_PROFILE";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const UPDATE_PROFILE_ACTIVE = "UPDATE_PROFILE_ACTIVE";
const CHANGE_REG_FORM_DATA = "CHANGE_REG_FORM_DATA";
const SET_ALL_FEEDBACKS = "SET_ALL_FEEDBACKS";

const SET_SERVICES = "SET_SERVICES";
// filter services
const SET_SERVICES_FILTER_LINE = "SET_SERVICES_FILTER_LINE";
const SET_SERVICE_STATUS = "SET_SERVICE_STATUS";

// filter users
const SET_USERS_FILTER_LINE = "SET_USERS_FILTER_LINE";

// feedbacks
const SET_LAST_FEEDBACKS = "SET_LAST_FEEDBACKS";
const UPDATE_FEEDBACK_STATUS = "UPDATE_FEEDBACK_STATUS";

const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    // Query
    case GET_UPDATED_QUERY: {
      let { id, info } = payload;
      return {
        ...state,
        querties: state.querties.map((q) => {
          return q.id === id ? { id, ...info } : q;
        }),
      };
    }

    case UPDATE_DOC: {
      let { id, doc } = payload;

      return {
        ...state,
        querties: state.querties.map((q) => {
          return q.id === id ? { ...q, ...doc } : q;
        }),
      };
    }

    case SET_QUERIES: {
      return {
        ...state,
        querties: payload,
      };
    }

    case ADD_QUERY: {
      return {
        ...state,
        querties: [...state.querties, payload],
      };
    }

    case SET_USERS: {
      let services = state.services;
      return {
        ...state,
        users: payload.map((user) => {
          let data = {
            ...user,
            info: {
              ...user.info,
              services: services.map((s) => {
                let i = user.info.services.indexOf(s.title);

                let t = i !== -1 ? { ...s, isActive: true } : s;
                return t;
              }),
            },
          };

          return { ...data };
        }),
      };
    }

    case SET_SERVICES: {
      return {
        ...state,
        services: payload,
      };
    }

    case UPDATE_USER_INFO: {
      let services = state.services;

      let data = {
        ...payload,
        info: {
          ...payload.info,
          services: services.map((s) => {
            let i = payload.info.services.indexOf(s.title);

            let t = i !== -1 ? { ...s, isActive: true } : s;
            return t;
          }),
        },
      };

      return {
        ...state,
        credUser: data,
        currentProfile: data,
        users: state.users.map((user) => {
          return user.id === data.id ? data : user;
        }),
      };
    }

    case UPDATE_FEEDBACK_STATUS: {
      const { id, status } = payload;

      return {
        ...state,
        allFeedbacks: state.allFeedbacks.map((fb) => {
          if (fb.id === id) {
            return {
              ...fb,
              info: {
                ...fb.info,
                isActive: status,
              },
            };
          }
          return { ...fb };
        }),
      };
    }

    case SET_ALL_FEEDBACKS: {
      return { ...state, allFeedbacks: payload };
    }

    case SET_LAST_FEEDBACKS: {
      return {
        ...state,
        lastFeddbacks: payload,
      };
    }

    // filter services
    case SET_SERVICE_STATUS: {
      const { ids, status } = payload;

      return {
        ...state,
        services: state.services.map(({ id }, idx) => {
          const data = state.services[idx];
          if (id === ids) {
            return { ...data, isActive: status };
          }
          return { ...data };
        }),
      };
    }

    case SET_SERVICES_FILTER_LINE: {
      return { ...state, servicesFilterLine: payload };
    }

    // filter users
    case SET_USERS_FILTER_LINE: {
      return { ...state, usersFilterLine: payload };
    }

    // reg
    case CHANGE_REG_FORM_DATA: {
      return {
        ...state,
        regForm: {
          ...state.regForm,
          [payload.part]: payload.value,
        },
      };
    }

    case ADD_USER: {
      return { ...state, users: [...state.users, payload], credUser: payload };
    }

    case UPDATE_PROFILE_ACTIVE: {
      return {
        ...state,
        currentProfile: {
          ...state.currentProfile,
          info: { ...state.currentProfile.info, active: payload.status },
        },
      };
    }

    case AUTH_USER: {
      return { ...state, credUser: payload };
    }

    case ADD_ERROR: {
      let path = payload.path;
      let error = payload.error;

      switch (path) {
        case "login":
          return {
            ...state,
            errors: {
              ...state.errors,
              login: [...state.errors.login, error],
            },
          };

        case "reg":
          return {
            ...state,
            errors: {
              ...state.errors,
              reg: [...state.errors.reg, error],
            },
          };

        default:
          return { ...state, error: "Неизвестная ошибка" };
      }
    }

    case LOGOUT: {
      return { ...state, credUser: {} };
    }

    case LOGIN: {
      return { ...state, credUser: payload };
    }

    case SET_CURRENT_PROFILE: {
      let data = {
        ...payload,
        info: {
          ...payload.info,
          services: state.services.map((s) => {
            let i = payload.info.services.indexOf(s.title);

            let t = i !== -1 ? { ...s, isActive: true } : s;
            return t;
          }),
        },
      };

      return { ...state, currentProfile: data };
    }

    case CLEAR_ERRORS: {
      let path = payload;

      switch (path) {
        case "login":
          return {
            ...state,
            errors: {
              ...state.errors,
              login: [],
            },
          };

        case "reg":
          return {
            ...state,
            errors: {
              ...state.errors,
              reg: [],
            },
          };

        default:
          return { ...state };
      }
    }

    case "SET_BLOCK": {
      return { ...state, regForm: { ...state.regForm, block: payload } };
    }

    // LOADER
    case SET_IS_LOADING: {
      return { ...state, isLoading: payload };
    }

    default:
      return state;
  }
};

export const loadingProject = () => async (dispatch) => {
  await dispatch(getServices());
  await dispatch(getAllFeedbacks());
  await dispatch(loginCache());
  await dispatch(getUsers());
  await dispatch(getLastFeedback());
  dispatch(setIsLoading(false));
};

// LOADER
export const setIsLoading = (status) => async (dispatch) => {
  dispatch(setIsLoadingAC(status));
};

const setIsLoadingAC = (status) => ({
  type: SET_IS_LOADING,
  payload: status,
});

export const getServices = () => async (dispatch) => {
  let data = await (await db.collection("settings").doc("services").get())
    .data()
    .values.map((val, id) => {
      return {
        id,
        title: val,
        isActive: false,
      };
    });
  dispatch({
    type: SET_SERVICES,
    payload: data,
  });
};

// QUERY
export const getUpdatedQuery = (id) => async (dispatch) => {
  let doc = await (await db.collection("querties").doc(id).get()).data();

  dispatch(getUpdatedQueryAC(id, doc));
};

const getUpdatedQueryAC = (id, info) => ({
  type: GET_UPDATED_QUERY,
  payload: { id, info },
});

export const saveMessage = (id, text, messages) => async (
  dispatch,
  getState
) => {
  let doc = await db
    .collection("querties")
    .doc(id)
    .update({
      messages: [
        ...messages,
        {
          author: getState().credUser.id,
          date: new Date(),
          text,
        },
      ],
    });

  let docN = await (await db.collection("querties").doc(id).get()).data();

  dispatch(updateDocAC(id, docN));
};

export const endDialog = (status, id, author1, author2, credUserId) => async (
  dispatch
) => {
  const newStatus = status === "process" ? "wait done" : "done";
  const author1IsDone = author1 === credUserId;
  const author2IsDone = author2 === credUserId;

  let doc = await db.collection("querties").doc(id).update({
    progress: newStatus,
    author1IsDone,
    author2IsDone,
  });

  let docN = await (await db.collection("querties").doc(id).get()).data();
  debugger;
  dispatch(updateDocAC(id, docN));
};

const updateDocAC = (id, doc) => ({
  type: UPDATE_DOC,
  payload: {
    id,
    doc,
  },
});

export const getQuery = (id) => async (dispatch) => {
  let docs = await (
    await db.collection("querties").orderBy("date", "asc").get()
  ).docs;

  let queries = [];

  docs.forEach((doc) => {
    let data = doc.data();
    if (data.author1 === id || data.author2 === id) {
      queries.push({ ...data, id: doc.id });
    }
  });
  dispatch(getQueriesAC(queries));
};

const getQueriesAC = (queries) => ({
  type: SET_QUERIES,
  payload: queries,
});

export const addQuery = (profileId, credId) => async (dispatch) => {
  let doc = await db.collection("querties").doc();

  let data = {
    author1: profileId,
    author2: credId,
    messages: [],
    progress: "process",
    date: new Date(),
  };

  await doc.set(data);

  let newDate = await (
    await db.collection("querties").doc(doc.id).get()
  ).data();
  dispatch(
    addQueryAC({
      ...newDate,
      id: doc.id,
    })
  );

  // let newData = await (await db.collection("users").doc(id).get()).data();
  // dispatch(updateUserInfoAC(id, newData));
};

const addQueryAC = (query) => ({
  type: ADD_QUERY,
  payload: query,
});

export const updateUserInfo = (id, newInfo) => async (dispatch) => {
  let data = await db
    .collection("users")
    .doc(id)
    .update({ ...newInfo });

  let newData = await (await db.collection("users").doc(id).get()).data();
  dispatch(updateUserInfoAC(id, newData));
};

const updateUserInfoAC = (id, info) => ({
  type: UPDATE_USER_INFO,
  payload: { id, info },
});

export const updateFeedbackStatus = (id, status) => async (dispatch) => {
  await db.collection("feedbacks").doc(id).update({
    isActive: status,
  });

  dispatch(updateFeedbackStatusAC(id, status));
};

const updateFeedbackStatusAC = (id, status) => ({
  type: UPDATE_FEEDBACK_STATUS,
  payload: { id, status },
});

export const getAllFeedbacks = () => async (dispatch) => {
  let data = await db.collection("feedbacks").orderBy("date", "desc").get();
  let feedbacks = [];

  data.forEach((doc) => {
    feedbacks.push({
      id: doc.id,
      info: doc.data(),
    });
  });

  dispatch(getAllFeedbacksAC(feedbacks));
};

const getAllFeedbacksAC = (feedbacks) => ({
  type: SET_ALL_FEEDBACKS,
  payload: feedbacks,
});

// feedback last
export const addFeedback = (rate, text) => async (dispatch, getState) => {
  let credUser = getState().credUser;
  const ref = db.collection("feedbacks").doc();

  const newFeeback = {
    text,
    rate,
    userId: credUser.id,
    userName: credUser.info.fullName,
    date: new Date(),
    isActive: false,
  };

  await ref.set(newFeeback);
};

export const getLastFeedback = () => async (dispatch) => {
  let last = [],
    i = 0;

  let data = await db.collection("feedbacks").orderBy("date", "desc").get();

  while (last.length < 3 && data.docs.length > i) {
    let doc = data.docs[i].data();

    if (doc.isActive) {
      last.push(doc);
    }
    i++;
  }

  dispatch(getLastFeedbacksAC(last));
};

const getLastFeedbacksAC = (feedbacks) => ({
  type: SET_LAST_FEEDBACKS,
  payload: feedbacks,
});

// filter services
export const changeServiceStatus = (id, status) => async (dispatch) => {
  dispatch(changeServiceStatusAC(id, status));
};

const changeServiceStatusAC = (ids, status) => ({
  type: SET_SERVICE_STATUS,
  payload: { ids, status },
});

export const changeServicesFilterLine = (value) => async (dispatch) => {
  dispatch(changeServicesFilterLineAC(value));
};
const changeServicesFilterLineAC = (value) => ({
  type: SET_SERVICES_FILTER_LINE,
  payload: value,
});

// fiter users
export const changeUsersFilterLine = (value) => async (dispatch) => {
  dispatch(changeUsersFilterLineAC(value));
};
const changeUsersFilterLineAC = (value) => ({
  type: SET_USERS_FILTER_LINE,
  payload: value,
});

export const changeRegFormData = (part, value) => async (dispatch) => {
  dispatch(changeRegFormDataAC(part, value));
};

const changeRegFormDataAC = (part, value) => ({
  type: CHANGE_REG_FORM_DATA,
  payload: { part, value },
});

export const getUsers = () => async (dispatch, getState) => {
  let services = getState().services;

  let ref = await db.collection("users");
  let data = await ref.get();

  let users = [];

  data.forEach((doc) => {
    users.push({
      id: doc.id,
      info: doc.data(),
    });
  });

  dispatch(setUsersAC(users));
};

export const loginCache = () => async (dispatch) => {
  let req = JSON.parse(localStorage.getItem("userHands"));

  let id = (req && req.id) || null;

  id && dispatch(getQuery(id));

  let data = id ? await dispatch(getUser(id)) : {};
  dispatch(loginAC(data));
};

const loginAC = (data) => {
  return {
    type: LOGIN,
    payload: data,
  };
};

export const getUser = (id) => async (dispatch) => {
  let ref = await db.collection("users").doc(id);
  let data = await ref.get();

  let user = {
    id: data.id,
    info: data.data(),
  };

  dispatch(setCurrentProfileAC(user));

  return user;
};

export const clearErrorsReg = () => (dispatch) => {
  dispatch(clearErrorsAC("reg"));
};

export const setAcctiveAccount = (id, status) => async (dispatch) => {
  let ref = await db
    .collection("users")
    .doc(id)
    .update({
      active: status === 1 ? 0 : 1,
    });

  dispatch(updateProfileActiveAC(id, !status));
  dispatch(getUsers());
};

const updateProfileActiveAC = (id, status) => ({
  type: UPDATE_PROFILE_ACTIVE,
  payload: { id, status },
});

const setCurrentProfileAC = (user) => ({
  type: SET_CURRENT_PROFILE,
  payload: user,
});

export const addUser = ({
  fullName,
  active,
  avatar,
  birthday,
  docs,
  email,
  location,
  pass,
  role,
  services = [],
}) => async (dispatch) => {
  if (await dispatch(isValidateReg())) {
    const docsURL = [];

    let i = 0;

    while (i < docs.length) {
      const d = docs[i];

      const uploadTask = storage
        .ref()
        .child(`users/${email}/${d.file.name}`)
        .put(d.file);

      uploadTask.on(
        "state_changed",
        (s) => {},
        (e) => {
          console.log(e);
        },
        () => {
          storage
            .ref(`users/${email}`)
            .child(d.file.name)
            .getDownloadURL()
            .then((url) => {
              docsURL.push(url);
            });
        }
      );
      i++;
    }

    let inte = setInterval(async () => {
      console.log(docs.length === 0 && role === 2);
      if (docsURL[docs.length - 1] || (docs.length === 0 && role === 2)) {
        clearInterval(inte);
        const ref = db.collection("users").doc();

        const userInfo2 = {
          fullName: fullName,
          active: 0,
          avatar: null,
          birthday: birthday,
          email: email,
          docsURL,
          location: location,
          pass: pass,
          role: role,
          services: services,
        };

        await ref.set(userInfo2);
        dispatch(addUserAC(userInfo2));
      }
    }, 500);
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userHands");

  dispatch(logoutAC());
};

export const isValidateReg = () => async (dispatch, getState) => {
  const {
    fullName,
    email,
    location,
    birthday,
    pass,
    repeatPass,
    role,
    images,
  } = getState().regForm;

  dispatch(clearErrorsReg());

  let isFullName = isValidateFullName(fullName);
  if (!isFullName) {
    dispatch(
      addErrorReg("Фамилия, имя или отчество невалидно (мин. длинна 2)")
    );
  }

  let isEmail = isValidateEmail(email);
  if (!isEmail) {
    dispatch(addErrorReg("Невалидная почта"));
  }

  let emailIsFree = await dispatch(checkUnicEmail(email));
  if (!emailIsFree) {
    dispatch(addErrorReg("Данная почта занята"));
  }

  let isLocation = isValidLocation(location);
  if (!isLocation) {
    dispatch(addErrorReg("Невалидное местоположение"));
  }

  let isBirthday = isValidBirthday(birthday);
  if (!isBirthday) {
    dispatch(addErrorReg("Невалидная дата рождения"));
  }

  let isPass = isValidPass(pass, repeatPass);
  if (!isPass) {
    dispatch(addErrorReg("Пароли не совпадают"));
  }

  let isLenghtPass = isValidLenghtPass(pass);
  if (!isLenghtPass) {
    dispatch(addErrorReg("Мин. длинна пароля - 8"));
  }

  let isDocs = isValidDocs(role, images);
  if (!isDocs) {
    dispatch(addErrorReg("Прикрепите минимум один документ"));
  }

  let evenIsValid =
    isFullName &&
    isEmail &&
    emailIsFree &&
    isLocation &&
    isBirthday &&
    isPass &&
    isLenghtPass &&
    isDocs;

  dispatch({
    type: "SET_BLOCK",
    payload: true,
  });
  return evenIsValid;
};

const logoutAC = () => ({
  type: LOGOUT,
});

export const checkUnicEmail = (email) => async (dispatch) => {
  let data = await db.collection("users").get();

  let users = [];

  data.forEach((doc) => {
    let user = doc.data();
    if (doc.data().email === email) {
      users.push(1);
    }
  });

  return users.length === 0;
};

export const addErrorReg = (err) => (dispatch) =>
  dispatch(addErrorAC("reg", err));

export const loginUser = ({ email, pass }) => async (dispatch) => {
  const usersRef = await db.collection("users");
  const data = await usersRef.where("email", "==", email).get();

  if (data.empty) {
    dispatch(clearErrorsAC("login"));
    dispatch(addErrorAC("login", "Неверный пароль или email"));
    return;
  }

  data.forEach((doc) => {
    console.log(doc.data().pass);

    if (doc.exists && pass === doc.data().pass) {
      localStorage.setItem(
        "userHands",
        JSON.stringify({ id: doc.id, info: doc.data() })
      );
      dispatch(getQuery(doc.id));
      dispatch(
        authUserAC({
          id: doc.id,
          info: doc.data(),
        })
      );
    } else {
      dispatch(clearErrorsAC("login"));
      dispatch(addErrorAC("login", "Неверный пароль или email"));
    }
  });
};

export const clearErrorsLogin = () => (dispatch) => {
  dispatch(clearErrorsAC("login"));
};

const authUserAC = (data) => ({
  type: AUTH_USER,
  payload: data,
});

const addErrorAC = (path, error) => {
  return {
    type: ADD_ERROR,
    payload: { path, error },
  };
};

const clearErrorsAC = (path) => {
  return {
    type: CLEAR_ERRORS,
    payload: path,
  };
};

const setUsersAC = (users) => ({
  type: SET_USERS,
  payload: users,
});

const addUserAC = (userInfo) => ({
  type: ADD_USER,
  payload: userInfo,
});

export default reducer;
