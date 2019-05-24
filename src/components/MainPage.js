import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class MainPage extends Component {
  render() {
    return (
      <>
        <ul className="branches">
          <li className="branch">
            <img src="#"  alt="empty" />
            <Link to="/math">Math</Link></li>
          <li className="branch">
            <img src="#"  alt="empty" />
            <Link to="/science">Science</Link></li>
          <li className="branch">
            <img src="#"  alt="empty" />
            <Link to="/literature">Literature</Link></li>
          <li className="branch">
            <img src="#"  alt="empty" />
            <Link to="/languages">Languages</Link></li>
          <li className="branch">
            <img src="#"  alt="empty" />
            <Link to="/management">Management</Link></li>
          <li className="branch">
            <img src="#"  alt="empty" />
            <Link to="/tech">Tech</Link></li>
        </ul>
      </>
    )
  }
}

export default MainPage;
