import React, {
    Component
  } from 'react'
  import axios from 'axios'
  import "./agentDetail.css"

  class AgentDetail extends Component {

    constructor(props) {
      super(props);
      this.state = {
        isOpen: false
      };
    }

    modifyAgent = (data) => {
      axios({
        method:'put',
        url:'/agents/'+data.id,
        headers: {
          "Content-Type": "application/json"
        },
        data: data
      }).then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    };

    deleteResource = (e) => {
      let deleteResource = e.currentTarget.parentNode.parentNode.removeChild(e.currentTarget.parentNode);
      let dataAfterDeleted = this.props.data;
      dataAfterDeleted.resources.splice(
        dataAfterDeleted.resources.indexOf( deleteResource.children[0].innerHTML), 1);
      this.modifyAgent(dataAfterDeleted);
    };

    openPopDialog = (e) => {
      this.setState({
        isOpen: true
      })
    }

    submitResource = (e) => {
      let inputResourceValue = e.target.parentNode.previousSibling.value;
      let submitResourceValue = this.props.data;
      inputResourceValue.trim().split(',').map(item => {
        submitResourceValue.resources.push(item.trim());
      })
      this.modifyAgent(submitResourceValue);
      this.setState({
          isOpen: false
        })
    };                                                                                                                                  

    cancelSubmit = (e) => {
      this.setState({
        isOpen: false
      })
    };

    render() {
      let isOpen = this.state.isOpen ? 'block' : 'none';
      let isOpenStyle = {
        display: isOpen
      };
      return <div className="detail-item">
        <span className={this.props.data.os}></span>
        <ul>
          <li>
            <span className="icon-desktop"></span>{this.props.data.name}
          </li>
          <li>
            <span>{this.props.data.status}</span>
          </li>
          <li>
            <span className="icon-info"></span>{this.props.data.ip}
          </li>
          <li>
            <span className="icon-folder"></span>{this.props.data.location}
          </li>
          <li onClick={this.openPopDialog}>
            <span className="icon-plus"></span>
          </li>
          {
            this.props.data.resources &&　this.props.data.resources.map((item, index) => {
              return (
                  <li key={index}>
                    <i>{item}</i>
                    <span className="icon-trash" onClick={this.deleteResource}></span>
                   </li>
              )
            })
          }
      </ul>
      <div className="pop-dialog" style={isOpenStyle}>
          <span className="angle-one"></span>
          <span className="angle-two"></span>
          <span className="angle-three"></span>
          <i className="icon-close" onClick={this.cancelSubmit}></i>
          <p className="pop-dialog-description">Separate multiple resource name with commas</p>
          <input placeholder="Input value"/>
          <div className="pop-dialog-buttons">
            <button onClick={this.submitResource}>Add Resource</button>
            <button onClick={this.cancelSubmit}>Cancel</button>
          </div>
      </div>
    </div>
    }
  }
  
  export default AgentDetail;