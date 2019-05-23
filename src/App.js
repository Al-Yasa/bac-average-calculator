import React from 'react'
import { Route } from 'react-router-dom'
import MainPage from './components/MainPage'
import CalcPage from './components/CalcPage'
import './App.sass'

class App extends React.Component {
  // state = {
  //   branch: 'Math'
  // }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Calc My Bac</h1>
        </header>

        <main>
          <Route exact path="/" render={() => (
            <MainPage />
          )} />
          <Route path="/math" render={() => (
            <CalcPage branch="math" />
          )} />
          <Route path="/science" render={() => (
            <CalcPage branch="science" />
          )} />
          <Route path="/literature" render={() => (
            <CalcPage branch="literature" />
          )} />
          <Route path="/languages" render={() => (
            <CalcPage branch="languages" />
          )} />
          <Route path="/management" render={() => (
            <CalcPage branch="management" />
          )} />
          <Route path="/tech" render={() => (
            <CalcPage branch="tech" />
          )} />
        </main>

        <footer>
          <p>Footer</p>
        </footer>
      </div>
    )
  }
}

export default App;
