import './App.css';
import TableCrud from './components/TableCrud';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NewStudents from './components/NewStudents';
import EditStudent from './components/EditStudent';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/auth/NewStudent" component={NewStudents}></Route>
          <Route exact path="/auth/EditStudent/:id" component={EditStudent}></Route>
          <Route exact path="/" component={TableCrud}></Route>
        </Switch>
      </Router>
    </>

    // <TableCrud/>
  );
}

export default App;
