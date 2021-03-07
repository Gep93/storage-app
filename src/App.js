import BucketList from "./BucketList/index";
import Bucket from "./Bucket/index";
import { Route, Link } from "react-router-dom";
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
      <Route exact path="/" render={() => <BucketList />} />
      <Route
        exact
        path="/bucket/:id"
        render={(props) => <Bucket {...props} />}
      />
    </div>
  );
}

export default App;
