import React, { Component } from 'react'
import Branches from '../data/Branches.json'

class CalcPage extends Component {
  state = {
    branch: this.props.branch,
    subjects: [],
    allCoefficients: 0,
    allMarks: [],
    average: 0
  }

  componentDidMount() {
    const BRANCH = this.props.branch;
    const SUBJECTS = Branches[BRANCH];
    let allCoefficients = 0;
    let allMarks = [];
    SUBJECTS.map((subject, index) => {
      allCoefficients += subject.coefficient;
      allMarks.push(0);
    });
    this.setState({
      subjects: SUBJECTS,
      allCoefficients,
      allMarks
    });
  }

  calculateMarks = (mark, coefficient, subjectIndex) => {
    const MARK_RESULT = document.querySelector(`.markResult-${subjectIndex}`);
    const TOTAL_MARKS_RESULTS = document.querySelector(`.row-result .col:last-of-type`);
    const AVERAGE = document.querySelector(`.average`);
    let allMarksResult = 0;
    let markResult = Number((mark * coefficient).toFixed(2));
    MARK_RESULT.innerHTML = markResult;
    this.setState(state => {
      state.allMarks[subjectIndex] = markResult;
      state.allMarks.map(mark => allMarksResult += mark);
      TOTAL_MARKS_RESULTS.innerHTML = allMarksResult;
      AVERAGE.innerHTML = (allMarksResult / this.state.allCoefficients).toFixed(2);
    });
  };

  render() {
    return (
      <div>
        <h3>CalcPage: {this.state.branch}</h3>
        <div className="table">
          <div className="row row-head">
            <div className="col">المادة</div>
            <div className="col">النقطة</div>
            <div className="col">المعامل</div>
            <div className="col">الناتج</div>
          </div>
          {this.state.subjects.map((subject, index) => (
            <div className="row" key={index}>
              <div className="col">{subject.name}</div>
              <div className="col">
                <input name={subject.name} type="number" min="0" max="20" placeholder="0/20" onChange={e => {
                  this.calculateMarks(e.target.value, subject.coefficient, index);
                }} />
              </div>
              <div className="col">{subject.coefficient}</div>
              <div className={`col markResult-${index}`}>0</div>
            </div>
          ))}
          <div className="row row-result">
            <div className="col">المجموع</div>
            <div className="col">{this.state.allCoefficients}</div>
            <div className="col">0</div>
          </div>
          <div className="row row-result">
            <div className="col">المعدل</div>
            <div className="col average">0</div>
          </div>
        </div>
      </div>
    )
  }
}

export default CalcPage;
