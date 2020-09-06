import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import Userpage from "../components/Userpage";
import Home from "../components/Home";
import NewArticle from "../components/NewArticle";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Signup from "../components/Signup";
import Signin from "../components/Signin";
import Forgot from "../components/Forgot";
import Reset from "../components/Reset";
import Activate from "../components/Activate";
import MyPosts from "../components/MyPosts";
import UpdateProfile from "../components/UpdateProfile";
import PopUp from "../components/PopUp";
import Fullpage from "../components/Fullpage";
import NewSignin from "../components/NewSignin";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route restricted path="/" exact component={Home} />
        <Route restricted path="/user-page" exact component={Userpage} />
        <Route
          restricted
          path="/add-new-article"
          exact
          component={NewArticle}
        /> */}

        <PublicRoute path="/" exact component={Home} />
        <PublicRoute
          restricted
          path="/signup"
          exact
          component={Signup}
          show="true"
        />
        <PublicRoute restricted path="/signin" exact component={NewSignin} />

        <PublicRoute
          restricted
          path="/traveller/activate/:token"
          exact
          component={Activate}
        />
        <PublicRoute
          restricted
          path="/traveller/password/forgot"
          exact
          component={Forgot}
        />
        <PublicRoute
          restricted
          path="/traveller/reset/password/:token"
          exact
          component={Reset}
        />
        <PrivateRoute restricted path="/newin" exact component={NewSignin} />
        <PrivateRoute
          restricted
          path="/user/dashboard/showpopup/:userToken"
          exact
          component={PopUp}
        />

        <PrivateRoute path="/user/dashboard" exact component={Userpage} />
        <PrivateRoute path="/user/posts" exact component={MyPosts} />
        <PrivateRoute
          path="/user/update-profile"
          exact
          component={UpdateProfile}
        />
        <PrivateRoute path="/add-new-article" exact component={NewArticle} />
        <PrivateRoute
          restricted
          path="/user/dashboard/:userToken"
          exact
          component={Fullpage}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
