import React, { Component } from 'react'
import Branches from '../data/Branches.json'
import { booleanLiteral } from '@babel/types';

class CalcPage extends Component {
  state = {
    branch: this.props.branch,
    subjects: [],
    allCoefficients: 0,
    allMarks: [],
    average: 0
  }

  componentWillMount() {
    const BRANCH = this.props.branch;
    const AMAZIGH_SUBJECT = {"name": "اللغة الأمازيغية", "coefficient": 2};
    const SPORT_SUBJECT = {"name": "تربية بدنية", "coefficient": 1};
    let subjects = new Set(Branches[BRANCH]);
    if (this.props.optionalSubjects.amazigh === true) {
      subjects.add(AMAZIGH_SUBJECT);
    } else {
      subjects.delete(AMAZIGH_SUBJECT);
    }
    if (this.props.optionalSubjects.sport === true) {
      subjects.add(SPORT_SUBJECT);
    } else {
      subjects.delete(SPORT_SUBJECT);
    }
    let allCoefficients = 0;
    let allMarks = [];
    let subjectsArray = [];
    subjects.forEach(subject => {
      allCoefficients += subject.coefficient;
      allMarks.push(0);
      subjectsArray.push(subject);
    });
    this.setState({
      subjects: subjectsArray,
      allCoefficients,
      allMarks
    });
  }

  calculateMarks = (mark, coefficient, subjectIndex) => {
    const INPUT = document.querySelector(`.input-${subjectIndex}`);
    const INPUT_VALUE = document.querySelector(`.input-${subjectIndex} > input`).value;
    const INPUT_OUT_OF_RANGE = mark < 0 || mark > 20;
    const INPUT_DIVISIBLE = mark % 0.25 === 0;
    if (INPUT_OUT_OF_RANGE || !INPUT_DIVISIBLE) {
      INPUT.classList.remove('valid');
      INPUT.classList.add('invalid');
    } else {
      INPUT.classList.remove('invalid');
      INPUT.classList.add('valid');
    }
    if (!INPUT_VALUE) {
      INPUT.classList.remove('valid');
      INPUT.classList.remove('invalid');
    }
    const MARK_RESULT = document.querySelector(`.markResult-${subjectIndex}`);
    const TOTAL_MARKS_RESULTS = document.querySelector(`.row-result .col:last-of-type`);
    const AVERAGE = document.querySelector(`.average`);
    let allMarksResult = 0;
    let markResult = (mark * coefficient).toFixed(2);
    MARK_RESULT.innerHTML = markResult;
    this.setState(state => {
      state.allMarks[subjectIndex] = markResult;
      state.allMarks.map(mark => allMarksResult += Number(mark));
      TOTAL_MARKS_RESULTS.innerHTML = allMarksResult;
      AVERAGE.innerHTML = (allMarksResult / this.state.allCoefficients).toFixed(2);
    });
  };

  render() {
    return (
      <div>
        {/* <h3>CalcPage: {this.state.branch}</h3> */}
        <div className="table">
          <div className="row row-head">
            <div className="col">المادة</div>
            <div className="col">النقطة</div>
            <div className="col">المعامل</div>
            <div className="col">المجموع</div>
          </div>
          {this.state.subjects.map((subject, index) => (
            <div className="row" key={index}>
              <div className="col">{subject.name}</div>
              <div className={`col input input-${index}`}>
                <div className="validity"></div>
                <input step="0.25" name={subject.name} type="number" min="0" max="20" placeholder="00/20" onChange={e => {
                  this.calculateMarks(Number(e.target.value), subject.coefficient, index);
                }} />
              </div>
              <div className="col">{subject.coefficient}</div>
              <div className={`col markResult-${index}`}>0</div>
            </div>
          ))}
          <div className="row row-result">
            <div className="col">المجموع العام</div>
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
