import BucketList from "./BucketList/index";
import Bucket from "./Bucket/index";
import NotFound from "./NotFound/index";
import {Switch, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="App-banner py-3 px-5">
        <Link to="/" className="App-link">
          Secure cloud storage
        </Link>
      </div>
      <Switch>
      <Route
        exact
        path="/bucket/:id"
        render={(props) => <Bucket {...props} />}
      />
      <Route exact path="/not-found" component={NotFound} />
      <Route exact path="/" render={() => <BucketList />} />
      <Redirect to="/not-found"
      />
      </Switch>
    </div>
  );
}

export default App;
