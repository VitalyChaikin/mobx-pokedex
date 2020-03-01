import React from 'react'
import './App.css'
import { observer } from 'mobx-react-lite'

import NavPanel from './components/NavPanel'
import Header from './components/Header'
import Table, { IntroButton } from './components/Table'
// import store from './store'

function App () {
  return (
    <div className='App'>
      <div className='frame'>
        <NavPanel />
        <Header />
        <Table />
        <IntroButton />
      </div>
    </div>
  )
}

export default observer(App)
