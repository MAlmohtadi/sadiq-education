import React from 'react';
import './App.css';
import { Container } from '@material-ui/core';
import Navbar from './layout/Navbar';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from 'react-router-dom';
import Courses from './pages/Courses';
import Videos from './pages/Videos';
import Home from './pages/Home';
import { store, persister } from './store';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

const history = createBrowserHistory();


function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        direction: 'rtl',
        // palette: {
        //   type: 'dark'
        // },
      }),
    [],
  );

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          <Navbar />
          <Container maxWidth="xl" style={{ marginTop: '80px' }}>
            <Router history={history}>
              <Switch >
                <Route exact path='/' component={Home} />
                <Route exact path='/courses' component={Courses} />
                <Route exact path='/videos' component={Videos} />
              </Switch>
            </Router>
          </Container>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  )
}

export default App;
