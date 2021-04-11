import React, { Component } from 'react'
import NavBar from './components/NavBar'
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from '@material-ui/core/styles';

class App extends Component {
  
  render() {

    return (
      <div>
        <CssBaseline />
        <NavBar />
      </div>
    )
  }
}
export default App