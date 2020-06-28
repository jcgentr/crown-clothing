import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInSignUpPage from "./pages/sign-in-sign-up/sign-in-sign-up.component";
import Header from "./components/header/header.component";
import { selectCurrentUser } from "./redux/user/user.selectors";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";

const App = ({ currentUser, setCurrentUser }) => {
  useEffect(() => {
    // open firebase subscription
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        // listens to initial state and changes to user object
        userRef.onSnapshot((snapshot) =>
          setCurrentUser({ id: snapshot.id, ...snapshot.data() })
        );
      } else {
        setCurrentUser(userAuth);
      }
    });
    // unsubscribe to the listener when unmounting
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route
          path='/signin'
          render={() =>
            currentUser ? <Redirect to='/' /> : <SignInSignUpPage />
          }
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
