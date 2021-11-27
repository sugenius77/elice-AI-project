import logo from "./logo.svg";
import "./App.css";
import { Route } from "react-router-dom";
import { UserPage } from "./components/UserPage";
import { TestSample } from "./components/TestSample";
import { TestPage } from "./components/TestPage";
import { TestEnd } from "./components/TestEnd";
import { ResultPage } from "./components/ResultPage";

function App() {
  return (
    <div>
      <Route exact path="/" component={UserPage} />
      <Route path="/sample" component={TestSample} />
      <Route path="/test" component={TestPage} />
      <Route path="/end" component={TestEnd} />
      <Route path="/result" component={ResultPage} />
    </div>
  );
}

export default App;
