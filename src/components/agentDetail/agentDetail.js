import React, {
    Component
  } from 'react'
  import axios from 'axios'
  import "./agentDetail.css"

  class AgentDetail extends Component {

    constructor(props) {
      super(props);
      this.state = {
        isOpen: false,
        isEnterDialog: false
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

    closeDialog = () => {
      console.log("closed");
      this.setState({
        isOpen: false
      });
      document.getElementById("root").removeEventListener('click', this.listenDialog);
    }

    // 在弹框外点击，关闭弹框
    listenDialog = () => {
      if(!this.state.isEnterDialog) {
        console.log("event");
        let inputList = document.getElementsByClassName("new-resources");
        for (let i = 0; i < inputList.length; i ++) {
          if (inputList[i].value) {
            inputList[i].value = ""
          }
        }
        this.closeDialog();
      };
    };

    // 删除Resource
    deleteResource = (e) => {
      console.log(e.currentTarget.parentNode, e.currentTarget.parentNode.parentNode);
      if (this.props.data.resources !== []) {
        let deleteResource = e.currentTarget.parentNode.parentNode.removeChild(e.currentTarget.parentNode);
        let dataAfterDeleted = this.props.data;
        dataAfterDeleted.resources.splice(
          dataAfterDeleted.resources.indexOf( deleteResource.children[0].innerHTML), 1);
        this.modifyAgent(dataAfterDeleted);
      }
    };

    openPopDialog = (e) => {
      console.log(e.target, e.currentTarget);
      this.setState({
        isOpen: true
      });
      document.getElementById("root").addEventListener('click', this.listenDialog);
    };

    // 点击Add Resource，提交新输入Resources，在页面展示
    // FIXME:删除所有Resources,不刷新，新建报错。
    submitResource = (e) => {
      let inputResourceValue = e.currentTarget.parentNode.previousSibling.value;
      console.log(inputResourceValue);
      if (inputResourceValue) {
        let submitResourceValue = this.props.data;
        inputResourceValue.trim().split(',').map(item => {
          submitResourceValue.resources.push(item.trim());
        });
        this.modifyAgent(submitResourceValue);
        e.currentTarget.parentNode.previousSibling.value = "";
        this.closeDialog();
      }
    };                                                                                                                                   

    cancelSubmit = (e) => {
      e.target.parentNode.previousSibling.value = "";
      this.closeDialog();
    };

    closeSubmit = (e) => {
      e.target.nextSibling.nextSibling.value = "";
      this.closeDialog();
    };

    render() {
      let isOpen = this.state.isOpen ? 'block' : 'none';
      let isOpenStyle = {
        display: isOpen
      };
      let isBuilding = (this.props.data.status === 'building') ? 'block' : 'none';
      let isShowDeny = {
        display: isBuilding
      };
      return <div className="detail-item">
        <span className={this.props.data.os}></span>
        <ul>
          <li key={1}>
            <span className="icon-desktop"></span>{this.props.data.name}
          </li>
          <li key={2}>
            <span title={this.props.data.status}>{this.props.data.status}</span>
          </li>
          <li key={3}>
            <span className="icon-info"></span>{this.props.data.ip}
          </li>
          <li key={4}>
            <span className="icon-folder"></span>{this.props.data.location}
          </li>
          <li key={5} onClick={this.openPopDialog}>
            <span className="icon-plus"></span>
          </li>
          {
            this.props.data.resources &&　this.props.data.resources.map((item, index) => {
              return (
                  <li key={index+6}>
                    <b>{item}</b>
                    <span className="icon-trash" onClick={this.deleteResource}></span>
                   </li>
              )
            })
          }
      </ul>
      <span className="deny-button" style={isShowDeny}>
        <i className="icon-deny"></i>Deny
      </span>
      <div className="pop-dialog" style={isOpenStyle} 
        onMouseEnter={ () => this.state.isEnterDialog = true }
        onMouseLeave={ () => this.state.isEnterDialog = false } >
          <span className="icon-angle-up"></span>
          <span className="obscurity"></span>
          <i className="icon-close" onClick={this.closeSubmit}></i>
          <p className="pop-dialog-description">Separate multiple resource name with commas</p>
          <input className="new-resources" placeholder="Input value"/>
          <div className="pop-dialog-buttons">
            <button onClick={this.submitResource}>Add Resource</button>
            <button onClick={this.cancelSubmit}>Cancel</button>
          </div>
      </div>
    </div>
    }
  }
  
  export default AgentDetail;