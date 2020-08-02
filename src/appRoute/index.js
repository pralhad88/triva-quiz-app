import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import NotFoundPage from '../component/notFountPage';
import SplashScreen from "../component/landingPage";
import Questions from "../component/questions";
import ScoreCard from "../component/scoreCard";
import history from '../utils/history' // crearte browser history for routing.

const AppRouter = () => ( // created browser history for application and merged all togather.
  <Router history={history}>
    <div>
      <Switch>
        <Route path="/triva-quiz-app" component={SplashScreen} exact={true} />
        <Route path="/quiz" component={Questions} />
        <Route path="/score_card" component={ScoreCard} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;