import React from 'react'
import { Route, Link } from 'react-router-dom'
import MainPage from './components/MainPage'
import CalcPage from './components/CalcPage'
import './App.sass'
import { FaArrowRight } from 'react-icons/fa';

class App extends React.Component {
  state = {
    optionalSubjects: {
      sport: true,
      amazigh: false
    }
  }

  onChangeSubjects = (subjectName, value) => {
    this.setState(state => {
      state.optionalSubjects[subjectName] = value;
    });
  }

  render() {
    return (
      <div className="app">
        <header>
          <Route exact path="/:subpath" render={() => (
              <Link to="/"><FaArrowRight /></Link>
          )} />
          <h1>حساب الباك</h1>
        </header>
        <main>
          <Route exact path="/" render={() => (
            <MainPage optionalSubjects={this.state.optionalSubjects} onChangeSubjects={this.onChangeSubjects} />
          )} />
          <Route path="/math" render={() => (
            <CalcPage branch="math" optionalSubjects={this.state.optionalSubjects} />
          )} />
          <Route path="/science" render={() => (
            <CalcPage branch="science" optionalSubjects={this.state.optionalSubjects} />
          )} />
          <Route path="/literature" render={() => (
            <CalcPage branch="literature" optionalSubjects={this.state.optionalSubjects} />
          )} />
          <Route path="/languages" render={() => (
            <CalcPage branch="languages" optionalSubjects={this.state.optionalSubjects} />
          )} />
          <Route path="/management" render={() => (
            <CalcPage branch="management" optionalSubjects={this.state.optionalSubjects} />
          )} />
          <Route path="/tech" render={() => (
            <CalcPage branch="tech" optionalSubjects={this.state.optionalSubjects} />
          )} />
        </main>
      </div>
    )
  }
}

export default App;
