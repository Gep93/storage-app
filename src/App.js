import BucketList from "./BucketList/index";
import "./App.css";
import Bucket from "./Bucket/index";
import { Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="App-banner">
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
