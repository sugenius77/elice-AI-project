import logo from './logo.svg';
import './App.css';
import {UserPage} from './components/UserPage'
import {TestSample} from './components/TestSample'
import {TestPage} from './components/TestPage'
import {Route} from 'react-router-dom';


function App() {
  return (
    <div>
      <Route exact path='/' component={UserPage} />
      <Route path='/sample' component={TestSample} />
      <Route path='/test' component={TestPage} />
    </div>
  );
}

export default App;
