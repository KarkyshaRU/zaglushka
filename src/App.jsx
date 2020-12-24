// React
import { Route } from "react-router";
import { useEffect } from "react";

// Redux
import { connect } from "react-redux";
import {
  getUsers,
  getUser,
  loginCache,
  getLastFeedback,
  getAllFeedbacks,
  getServices,
  setIsLoading,
  loadingProject,
} from "./redux/reducer";

// Components
// -> my
import Profile from "./screen/Profile";
import Feedback from "./screen/Feedback";
import Rules from "./screen/Rules";
import AboutUs from "./screen/AboutUs/AboutUs";
import Home from "./screen/Home/Home";
import Login from "./screen/Login/Login";
import Volunteers from "./screen/Volunteers/Volunteers";
import Reg from "./screen/Reg/Reg";

// Styles
import "./App.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AllUsers from "./screen/AllUsers";
import AllFeedback from "./screen/AllFeedback";
import Querties from "./screen/Querties";
import Dialog from "./screen/Dialog";

// images
import loader from "./accets/svg/loader.svg";

function App({ isLoading, loadingProject }) {
  useEffect(() => {
    loadingProject();
  }, [loadingProject]);

  return (
    <div className="App">
      <Header />

      {isLoading ? (
        <div className="loader">
          <img src={loader} alt="loader" />
        </div>
      ) : (
        <div className="content">
          <Route path="/querties" exact component={Querties} />
          <Route path="/querties/:id" component={Dialog} />

          <Route path="/admin/users" exact component={AllUsers} />
          <Route path="/admin/feedbacks" exact component={AllFeedback} />
          <Route path="/feedback" exact component={Feedback} />
          <Route path="/rules" exact component={Rules} />
          <Route path="/reg" exact component={Reg} />
          <Route path="/login" exact component={Login} />

          <Route path="/volunteers" exact component={Volunteers} />
          <Route path="/profile/:id" exact component={Profile} />

          <Route path="/about" exact component={AboutUs} />
          <Route path="/" exact component={Home} />
        </div>
      )}

      <Footer />
    </div>
  );
}

export default connect(
  (state) => ({ users: state.users, isLoading: state.isLoading }),
  {
    getUsers,
    getUser,
    loginCache,

    // feebacks
    getLastFeedback,
    getAllFeedbacks,

    getServices,

    // loading
    setIsLoading,

    loadingProject,
  }
)(App);
