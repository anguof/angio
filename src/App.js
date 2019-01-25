import React, {
  Component
} from 'react';

import "./App.css"

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return <div>
      <header>
        CRULSE
      </header>                                                                                                                                                                                                                                                                                   
      <div className="content">
        <div className="sidebar"></div>
        <div className="detail">
          <div className="detail-summary">
            <div className="detail-summary-item"></div>
            <div className="detail-summary-item"></div>
            <div className="detail-summary-item"></div>
          </div>
          <div className="detail-navigation">
            <ul className="detail-navigation-items">
                <li>All</li>
                <li>Physical</li>
                <li>Virtual</li>
            </ul>
            <input className="detail-navigation-input"/>
            <div className="detail-navigation-buttons">
              <button>button</button>
              <button>button</button>
            </div>
          </div>
          <ul className="detail-items">
            <li className="detail-items-item"></li>
            <li className="detail-items-item"></li>
            <li className="detail-items-item"></li>
          </ul>
        </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
      </div>
      <footer>Copyright 2017 ThoughtWorks</footer>
    </div>
};
}

export default App;