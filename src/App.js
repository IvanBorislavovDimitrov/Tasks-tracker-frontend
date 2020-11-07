import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import Index from "./component/index";
import Navbar from "./component/navbar";
import UserLogin from "./component/login";
import UserRegister from "./component/register";
import AddProject from "./component/add-project";
import AddTask from "./component/add-task";
import AddUserToProject from "./component/add-user-to-project";

function App() {
  setTimeout(function () {
    localStorage.clear();
  }, (24 * 60 * 60 * 1000));

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Index} />
        <Route exact path="/login" component={UserLogin} />
        <Route exact path="/register" component={UserRegister} />
        <Route exact path="/add-project" component={AddProject} />
        <Route exact path="/add-task" component={AddTask} />
        <Route exact path="/add-user-to-project" component={AddUserToProject} />
      </Switch>
    </BrowserRouter>
  );

}

export default App;
