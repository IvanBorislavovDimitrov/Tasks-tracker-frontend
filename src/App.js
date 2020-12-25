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
import EditProjectComment from "./component/edit-project-comment";
import DeleteProjectComment from "./component/delete-project-comment";
import EditTaskComment from "./component/edit-task-comment";
import DeleteTaskComment from "./component/delete-task-comment";
import ReleaseProject from "./component/release-project";
import ProjectReleases from "./component/project-releases";
import TasksByRelease from "./component/tasks-by-release";
import ActivateAccount from "./component/activate-account";
import UserProfile from './component/user-profile';
import ForgottenPassword from './component/forgotten-password';
import ResetPasswordComponent from './component/reset-password';
import SearchTasks from './component/searched-tasks';
import ProjectMembers from './component/project-members';
import OtherUserProfile from './component/other-user-profile';
import DeleteProject from './component/delete-project';
import EditProject from './component/edit-project';
import Charts from './component/charts';

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
        <Route path="/edit-project-comment/" component={EditProjectComment} />
        <Route path="/delete-project-comment/" component={DeleteProjectComment} />
        <Route path="/edit-task-comment/" component={EditTaskComment} />
        <Route path="/delete-task-comment/" component={DeleteTaskComment} />
        <Route path="/release-project/" component={ReleaseProject} />
        <Route path="/project-releases/" component={ProjectReleases} />
        <Route path="/releases/tasks/" component={TasksByRelease} />
        <Route path="/users/activate/" component={ActivateAccount} />
        <Route exact path="/users/profile" component={UserProfile} />
        <Route exact path="/users/forgotten-password" component={ForgottenPassword} />
        <Route exact path="/search-tasks" component={SearchTasks} />
        <Route path="/users/reset-password/" component={ResetPasswordComponent} />
        <Route path="/members/project/" component={ProjectMembers} />
        <Route path="/other-user/profile/" component={OtherUserProfile} />
        <Route path="/delete-project/" component={DeleteProject} />
        <Route path="/edit-project/" component={EditProject} />
        <Route path="/charts/" component={Charts} />

      </Switch>
    </BrowserRouter>
  );

}

export default App;
