import React, {
    Component
  } from 'react';
  import "./summaryCard.css"
  
  class summaryCard extends Component {
    render() {
      return <div className="summary-card">
          <div className="summary-card-title">{this.props.title}</div>
          <div className={this.props.icon}></div>
          <div className="summary-card-number">{this.props.number}</div>
      </div>
    };
  }
  
  export default summaryCard;