import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './routes';
import './App.scss';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <Switch>
        {routes.map((route, index) => {
          return (
            <Route key={index} path={route.path}>
              <React.Suspense fallback={<></>}>
                <route.component />
              </React.Suspense>
            </Route>
          );
        })}
      </Switch>
    );
  }
}

export default App;
