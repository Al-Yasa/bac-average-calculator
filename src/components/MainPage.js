import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FaSquareRootAlt, FaFlask, FaBook, FaLanguage, FaBusinessTime, FaMicrochip } from 'react-icons/fa';
import PropTypes from 'prop-types'

class MainPage extends Component {
  static propTypes = {
    optionalSubjects: PropTypes.objectOf(PropTypes.bool).isRequired,
    onChangeSubjects: PropTypes.func.isRequired
  }

  componentDidMount() {
    document.getElementById('sport').checked = this.props.optionalSubjects.sport;
    document.getElementById('amazigh').checked = this.props.optionalSubjects.amazigh;
  }

  handleChange = e => {
    const CHECKBOX_NAME = e.target.name;
    const CHECKBOX_VALUE = e.target.checked;
    this.props.onChangeSubjects(CHECKBOX_NAME, CHECKBOX_VALUE);
  }

  render() {
    return (
      <div id="mainPage">
        <div className="optionalSubjects">
          <div className="inputGroup">
            <input id="amazigh" name="amazigh" type="checkbox" onChange={this.handleChange} />
            <label htmlFor="amazigh">هل أنت معني باللغة الأمازيغية؟</label>
          </div>
          <div className="inputGroup">
            <input id="sport" name="sport" type="checkbox" onChange={this.handleChange} />
            <label htmlFor="sport">هل أنت معني بالرياضة البدنية؟</label>
          </div>
        </div>
        <ul className="branches">
          <li className="branch">
            <Link to="/math">
              <FaSquareRootAlt />
              <p>رياضيات</p>
            </Link>
          </li>
          <li className="branch">
            <Link to="/science">
              <FaFlask />
              <p>علوم تجريبية</p>
            </Link>
          </li>
          <li className="branch">
            <Link to="/literature">
              <FaBook />
              <p>آداب و فلسفة</p>
            </Link></li>
          <li className="branch">
            <Link to="/languages">
              <FaLanguage />
              <p>لغات أجنبية</p>
            </Link></li>
          <li className="branch">
            <Link to="/management">
              <FaBusinessTime />
              <p>تسيير و اقتصاد</p>
            </Link></li>
          <li className="branch">
            <Link to="/tech">
              <FaMicrochip />
              <p>تقني رياضي</p>
            </Link></li>
        </ul>
      </div>
    )
  }
}

export default MainPage;
