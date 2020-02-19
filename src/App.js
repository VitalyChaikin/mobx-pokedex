import React from 'react';
import './App.css';
import { observer } from 'mobx-react';

import Header from './components/Header'
import Table, {IntroButton} from './components/Table'
import store from './store'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="frame">
          <Header store={store} />          
          <Table store={store} />
          <IntroButton store={store} />
        </div>
      </div>
    );
  }
}

export default observer(App)
