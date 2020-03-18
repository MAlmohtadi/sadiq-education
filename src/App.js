import React from 'react';
import './App.css';
import { Container } from '@material-ui/core';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Courses from './pages/Courses';
import Videos from './pages/Videos';
import Home from './pages/Home';
import { store, persister } from './store';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';

const history = createBrowserHistory();


function App() {

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#006064',
        // contrastText:'#ff8404'
      },
      secondary: { main: '#ff8404' }
    },
    typography: {
      // In Chinese and Japanese the characters are usually larger,
      // so a smaller fontsize may be appropriate.
      // fontSize: 12,
      fontFamily: 'El Messiri',
      color: '#ff8404'

    }
  }
  );

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Sadiq Diab | رياضيات توجيهي | صادق دياب </title>
            <link rel="sadiq-diab" href="https://sadiq-diab.netlify.com/" />
          </Helmet>
          <Container maxWidth="xl" style={{ marginTop: '80px' }}>
            <Router history={history}>
              <Navbar />
              <Switch >
                <Route exact path='/courses' component={Courses} />
                <Route exact path='/videos' component={Videos} />
                <Route exact path='/home' component={Home} />
                <Route path="/">
                  <Redirect to="/home" />
                </Route>
              </Switch>
            </Router>
            <Footer />
          </Container>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  )
}

export default App;
