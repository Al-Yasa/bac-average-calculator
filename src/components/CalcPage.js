import React, { Component } from 'react'
import Branches from '../data/Branches.json'
import { taggedTemplateExpression } from '@babel/types';

class CalcPage extends Component {

  render() {
    const BRANCH = this.props.branch;
    const SUBJECTS = Object.values(Branches[BRANCH]);
    let allCoefficients = 0;
    SUBJECTS.map(subject => allCoefficients += subject.coefficient)
    console.log(SUBJECTS);

    return (
      <div>
        <h3>CalcPage: {BRANCH}</h3>

        <div className="table">
          <div className="row row-head">
            <div className="col">المادة</div>
            <div className="col">النقطة/20</div>
            <div className="col">المعامل</div>
            <div className="col">{allCoefficients}</div>
          </div>
          {SUBJECTS.map((subject, index) => (
            <div className="row" key={index}>
              <div className="col">{subject.name}</div>
              <div className="col">0
                {/* <input name={subject.name} type="number" min="0" max="20" placeholder="0" onChange={this.handleChange} /> */}
              </div>
              <div className="col">{subject.coefficient}</div>
              <div className="col">0</div>
            </div>
          ))}
        </div>

        {/* <p>{SUBJECTS.subject_01.name}</p> */}
      </div>
    )
  }
}

export default CalcPage;
