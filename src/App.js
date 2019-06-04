import React from 'react'
import { Route, Link } from 'react-router-dom'
import MainPage from './components/MainPage'
import CalcPage from './components/CalcPage'
import './App.sass'
import { FaArrowRight } from 'react-icons/fa';

class App extends React.Component {
  state = {
    optionalSubjects: {
      amazigh: false,
      sport: true
    }
  }

  componentWillMount() {
    if (!localStorage.length) {
      localStorage.setItem('optionalSubjects_amazigh', this.state.optionalSubjects.amazigh);
      localStorage.setItem('optionalSubjects_sport', this.state.optionalSubjects.sport);
    } else {
      let optionalSubjects = {
        amazigh: localStorage.getItem('optionalSubjects_amazigh') === 'true' ? true : false,
        sport: localStorage.getItem('optionalSubjects_sport') === 'true' ? true : false
      };
      this.setState(state => {
        state.optionalSubjects = optionalSubjects;
      });
    }
  }

  onChangeSubjects = (subjectName, value) => {
    this.setState(state => {
      state.optionalSubjects[subjectName] = value;
      localStorage.setItem(`optionalSubjects_${subjectName}`, value);
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
            <CalcPage branch="math" branchArabic="رياضيات" optionalSubjects={this.state.optionalSubjects} />
          )} />
          <Route path="/science" render={() => (
            <CalcPage branch="science" branchArabic="علوم تجريبية" optionalSubjects={this.state.optionalSubjects} />
          )} />
          <Route path="/literature" render={() => (
            <CalcPage branch="literature" branchArabic="آداب و فلسفة" optionalSubjects={this.state.optionalSubjects} />
          )} />
          <Route path="/languages" render={() => (
            <CalcPage branch="languages" branchArabic="لغات أجنبية" optionalSubjects={this.state.optionalSubjects} />
          )} />
          <Route path="/management" render={() => (
            <CalcPage branch="management" branchArabic="تسيير و اقتصاد" optionalSubjects={this.state.optionalSubjects} />
          )} />
          <Route path="/tech" render={() => (
            <CalcPage branch="tech" branchArabic="تقني رياضي" optionalSubjects={this.state.optionalSubjects} />
          )} />
        </main>
      </div>
    )
  }
}

export default App;
