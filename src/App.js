import BucketList from "./BucketList/index";
import "./App.css";
import Bucket from "./Bucket/index";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="App-banner">Secure cloud storage</div>
      <Route exact path="/" render={() => <BucketList />} />
      <Route exact path="/bucket/:id" render={() => <Bucket />} />
    </div>
  );
}

export default App;
