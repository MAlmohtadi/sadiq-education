import React  from 'react';
import './App.css';
import { Container } from '@material-ui/core';
import Navbar from './layout/Navbar';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Course from './pages/Course';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const history = createBrowserHistory();


function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: 'dark' 
        },
      }),
    [],
  );
  
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Container maxWidth="lg" style={{ marginTop: '80px' }}>
        <Router history={history}>
          <Switch >
            <Route exact path='/' component={Home} />
            <Route exact path='/course' component={Course} />
          </Switch>
        </Router>
      </Container>
    </ThemeProvider>
  )
}

export default App;
