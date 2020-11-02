import React from 'react'
import Search from './Components/Search.js'
import Navigation from './Navigation/Navigation'
import { Provider } from 'react-redux'
import Store from './Store/ConfigureStore'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <Navigation/>
      </Provider>
    )
  }
}