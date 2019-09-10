import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SoundCache} from "./sounds";
import * as serviceWorker from './serviceWorker';

async function render() {
  ReactDOM.render(<App soundCache={await SoundCache.create()} />, document.getElementById('root'));
}

render();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
