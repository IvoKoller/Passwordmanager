// Here is the starting point of the application code.

// Helpers
import './helpers/context_menu.js';
import './helpers/external_links.js';

//React
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
//React-Components
import Layout from './components/layout';

import injectTapEventPlugin from 'react-tap-event-plugin';
// This dependency by Material-UI is temporary and will eventually go away
// http://stackoverflow.com/a/34015469/988941

// Initialize onTouchTap
injectTapEventPlugin();

ReactDOM.render(
    <Provider store={store}>
        <Layout />
    </Provider>,
    document.getElementById('app')
);
