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
import MyProjects from "./component/my-projects";
import ProjectTasks from "./component/project-tasks";
import ProjectInfo from "./component/project-info";
import AddProjectComment from "./component/add-project-comment";
import TaskInfo from "./component/task-info";
import AddTaskComment from "./component/add-task-comment";
import EditTask from "./component/edit-task";
import DeleteTask from "./component/delete-task";

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
        <Route exact path="/my-projects" component={MyProjects} />
        <Route path="/project-tasks" component={ProjectTasks} />
        <Route path="/projects" component={ProjectInfo} />
        <Route path="/projects-comments" component={AddProjectComment} />
        <Route path="/tasks/" component={TaskInfo} />
        <Route path="/task-comments/" component={AddTaskComment} />
        <Route path="/edit-task/" component={EditTask} />
        <Route path="/delete-task/" component={DeleteTask} />

      </Switch>
    </BrowserRouter>
  );

}

export default App;
