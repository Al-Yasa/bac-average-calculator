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

  componentWillMount() {
    const BRANCH = this.props.branch;
    let subjects = new Set(Branches[BRANCH]); // grab all subjects related to the selected branch from Branches.json
    subjects = this.onOptionalSubjects(subjects); // add optional subjcets if any are selected
    this.onFillState(subjects); // update the state with information about the Branch's subjects
  }

  /**
   *  this function adds optional subjects if any are selected
   *  param {Set} default subjects
   *  returns {Set} default subjects with added optional subjects
   */
  onOptionalSubjects = subjects => {
    const AMAZIGH_SUBJECT = {"name": "اللغة الأمازيغية", "coefficient": 2};
    const SPORT_SUBJECT = {"name": "تربية بدنية", "coefficient": 1};
    const AMAZIGH_CHOSEN = this.props.optionalSubjects.amazigh;
    const SPORT_CHOSEN = this.props.optionalSubjects.sport;
    AMAZIGH_CHOSEN ? subjects.add(AMAZIGH_SUBJECT) : subjects.delete(AMAZIGH_SUBJECT);
    SPORT_CHOSEN ? subjects.add(SPORT_SUBJECT) : subjects.delete(SPORT_SUBJECT);
    return subjects;
  }

  /**
   *  this funciton is for updating the state with the selected branch's information (subjects, coefficients, marks)
   *  param: {Set}
   */
  onFillState = subjects => {
    let allCoefficients = 0;
    let allMarks = [];
    let subjectsArray = [];
    subjects.forEach(subject => {
      allCoefficients += subject.coefficient;
      allMarks.push(0); // defualt value of all marks should be 0
      subjectsArray.push(subject);
    });
    this.setState({
      subjects: subjectsArray,
      allCoefficients,
      allMarks
    });
  }

  /**
   *  this function is for calculating marks, total of marks and average
   *  param: {Number} mark - mark input value
   *  param: {Number} coefficient
   *  param: {Number} subjectIndex
   */
  onCalculateMarks = (mark, coefficient, subjectIndex) => {
    this.onValidateInput(mark, subjectIndex); // add visual feedback based on input value (valid, invalid, nothing)
    const MARK_RESULT_CELL = document.querySelector(`.markResult-${subjectIndex}`);
    const TOTAL_MARKS_RESULTS_CELL = document.querySelector(`.row-result .col:last-of-type`);
    const AVERAGE_CELL = document.querySelector(`.average`);
    let allMarksResult = 0;
    let markResult = (mark * coefficient).toFixed(2);
    MARK_RESULT_CELL.innerHTML = this.makeThreeDigits(markResult);
    this.setState(state => {
      state.allMarks[subjectIndex] = Number(markResult);
      state.allMarks.map(mark => allMarksResult += mark); // map through all marks to add them together
      TOTAL_MARKS_RESULTS_CELL.innerHTML = this.makeThreeDigits(allMarksResult.toFixed(2));
      AVERAGE_CELL.innerHTML = this.makeTwoDigits((allMarksResult / this.state.allCoefficients).toFixed(2));
    });
  };

  /**
   *  this function is for validating the user input in-order to give visual feedback (valid, invalid, nothing)
   *  param: {Number} mark - mark input value
   *  param: {Number} subjectIndex
   */
  onValidateInput = (mark, subjectIndex) => {
    const INPUT = document.querySelector(`.input-${subjectIndex}`);
    const INPUT_OUT_OF_RANGE = mark < 0 || mark > 20;
    const INPUT_DIVISIBLE = mark % 0.25 === 0; // is the mark decimal value (.00, .25, .50, .75)
    (INPUT_OUT_OF_RANGE || !INPUT_DIVISIBLE) ? this.onModifyClass(INPUT, 0) : this.onModifyClass(INPUT, 1);
  }

  /**
   *  this helper function is for adding CSS classes to HTML elements
   *  param: {HTMLElement} HTMLElement
   *  param: {Number} inputState
   */
  onModifyClass(HTMLElement, inputState) {
    if (inputState) {
      HTMLElement.classList.remove('invalid');
      HTMLElement.classList.add('valid');
    } else {
      HTMLElement.classList.remove('valid');
      HTMLElement.classList.add('invalid');
    }
    if (!HTMLElement.lastChild.value) {
      HTMLElement.classList.remove('valid');
      HTMLElement.classList.remove('invalid');
    }
  }

  /**
   *  this helper function is for adding '0' digits for numbers below 100
   *  param: {Number} number
   *  returns {String or Number}
   */
  makeThreeDigits = number => {
    return (number < 100 && number > 9) ? `0${number}` : number < 10 ? `00${number}` : number;
  }

  /**
   *  this helper function is for adding digit '0' for numbers below 10
   *  param: {Number} number
   *  returns {String or Number}
   */
  makeTwoDigits = number => {
    return number < 10 ? `0${number}` : number;
  }

  render() {
    return (
      <div id="calcPage">
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
                <input name={subject.name} type="number" min="0" max="20" step="0.25" placeholder="00/20" onChange={e => {
                  this.onCalculateMarks(Number(e.target.value), subject.coefficient, index);
                }} />
              </div>
              <div className="col">{subject.coefficient}</div>
              <div className={`col markResult-${index}`}>000.00</div>
            </div>
          ))}
          <div className="row row-result">
            <div className="col">المجموع العام</div>
            <div className="col">{this.state.allCoefficients}</div>
            <div className="col">000.00</div>
          </div>
          <div className="row row-result">
            <div className="col">المعدل</div>
            <div className="col average">00.00</div>
          </div>
        </div>
      </div>
    )
  }
}

export default CalcPage;
