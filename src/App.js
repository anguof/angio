import React, {
  Component
} from 'react';
import SummaryCard from "./components/summaryCard/summaryCard";
import AgentDetail from "./components/agentDetail/agentDetail";
import axios from 'axios';
import imageUrl from './logo/avatar.jpg';
import "./App.css"
import "./font icons/fonts.css"

class App extends Component {

    state = {
      agentsData: [],
      showAgentsData: [],
      buildingNum: 0, 
      idleNum: 0, 
      physicalNum: 0, 
      virtualNum: 0,
      logoStatus: 'icon-angle-down',
      isShow: 'none',
      isShowSideBar: 'none'
    };

  // 页面渲染后调数据接口
  componentDidMount() {
    axios.get('/agents')
    .then( (response) => {
      this.dataStatusProcessing(response.data);
      response.data.map(item => {
        item.type === 'physical' ? this.state.physicalNum ++ : this.state.virtualNum ++;
      });
      this.setState({ 
        agentsData: response.data,
        showAgentsData: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
    if (window.screen.width >= 1024) {
        this.setState({
          isShowSideBar: "block"
        });
    }
  };

  // 侧边栏展示
  showSiderBar = () => {
    this.setState({
      isShowSideBar: "block"
    })
  };

  // 关闭侧边栏
  closeSiderBar = () => {
    this.setState({
      isShowSideBar: "none"
    })
  };

  // 登录框展示与隐藏
  clickLogo = () => {
    if (this.state.logoStatus === 'icon-angle-down') {
      this.setState({
        logoStatus: 'icon-angle-up',
        isShow: 'block'
      });
    } else {
      this.setState({
        logoStatus: 'icon-angle-down',
        isShow: 'none'
      });
    }
  };

  dataStatusProcessing = (data) => {
    let [buildingNum, idleNum] = [0, 0];
    data.map(item => {
      item.status === 'building' ? buildingNum ++ : idleNum ++;
    });
    this.state.buildingNum = buildingNum;
    this.state.idleNum = idleNum;
  };

  visitedStatus = (e) => {
    let targetElement = e.target.parentNode.children;
    for (let i = 0; i < targetElement.length; i++) {
      if (targetElement[i].style.color) {
        targetElement[i].style.color = "";
        targetElement[i].style.borderBottom = "";
      }
    };
    e.target.style.color = '#00B4CF';
    e.target.style.borderBottom = '3px solid #00B4CF';
  };

  getAllData = (e) => {
    this.visitedStatus(e);
    this.dataStatusProcessing(this.state.agentsData);
    this.setState({
        showAgentsData: this.state.agentsData
    });
  };

  getPhysicalData = (e) => {
    this.visitedStatus(e);
    let physicalData = this.state.agentsData.filter(item => {
      return item.type === "physical"
    });
    this.dataStatusProcessing(physicalData);
    this.setState({
      showAgentsData: physicalData
  });}

  getVirtualData = (e) => {
    this.visitedStatus(e);
    let virtualData = this.state.agentsData.filter(item => {
      return item.type === "virtual"
    });
    this.dataStatusProcessing(virtualData);
    this.setState({
      showAgentsData: virtualData
    });
  } 

  render() {
    const visitedStyle = {
      color: '#00B4CF',
      borderBottom: '3px solid #00B4CF'
    };
    let isShow = {
      display: this.state.isShow
    };
    let isShowSideBar = {
      display: this.state.isShowSideBar
    };
    return <div>
      <header>
        <span className="icon-navicon" onClick={this.showSiderBar}></span>
        <ul className="header-title">
          <li className="large-size">C</li>
          <li className="small-size">R</li>
          <li className="small-size">U</li>
          <li className="large-size">l</li>
          <li className="small-size">S</li>
          <li className="small-size">E</li>
        </ul>
        <img src={imageUrl} alt="logo" className="logo" onClick={this.clickLogo}></img>
        <span className={this.state.logoStatus} onClick={this.clickLogo}></span>
        <ul className="sign-dialog" style={isShow}>
          <li>
              <span className="icon-id-card"></span>Profile
          </li>
          <li>
              <span className="icon-sign-in"></span>Sign Out
          </li>
        </ul>
      </header>
      <div className="content">
        <div className="sidebar" style={isShowSideBar}>
        <span className="icon-close" onClick={this.closeSiderBar}></span>
          <ul className="sidebar-top">
            <li className="sidebar-top-item">
              <span className="icon-dashboard"></span>DASHBOARD
              </li>
            <li className="sidebar-top-item active-item">
              <span className="icon-sitemap"></span>AGENT
              </li>
            <li className="sidebar-top-item">
              <span className="icon-boat"></span>MY CRULSE
              </li>
            <li className="sidebar-top-item">
              <span className="icon-life-bouy"></span>HELP
              </li>
          </ul>
          <h1>History</h1>
          <ul className="sidebar-bottom">
            <li className="sidebar-bottom-item">bjstdmngbgr01/Acceptance_test</li>
            <li className="sidebar-bottom-item">bjstdmngbgr01/Acceptance_test</li>
            <li className="sidebar-bottom-item">bjstdmngbgr01/Acceptance_test</li>
            <li className="sidebar-bottom-item">bjstdmngbgr01/Acceptance_test</li>
            <li className="sidebar-bottom-item">bjstdmngbgr01/Acceptance_test</li>
            <li className="sidebar-bottom-item">bjstdmngbgr01/Acceptance_test</li>
            <li className="sidebar-bottom-item">bjstdmngbgr01/Acceptance_test</li>
            <li className="sidebar-bottom-item">bjstdmngbgr01/Acceptance_test</li>
            <li className="sidebar-bottom-item">bjstdmngbgr01/Acceptance_test</li>
            <li className="sidebar-bottom-item">bjstdmngbgr01/Acceptance_test</li>
          </ul>
        </div>
        <div className="detail">
          <ul className="detail-summary">
            <div className="detail-summary-item">
              <SummaryCard title="Building" icon="icon-cog" number={this.state.buildingNum}/>
            </div>
            <div className="detail-summary-item">
              <SummaryCard title="Idle" icon="icon-coffee" number={this.state.idleNum}/>
            </div>
            <ul className="detail-summary-item">
                <li className="detail-summary-item-title">ALL</li>
                <li className="detail-summary-item-title">PHYSICAL</li>
                <li className="detail-summary-item-title">VIRTUAL</li>
                <li className="detail-summary-item-number">{this.state.agentsData.length}</li>
                <li className="detail-summary-item-number">{this.state.physicalNum}</li>
                <li className="detail-summary-item-number">{this.state.virtualNum}</li>
            </ul>
          </ul>
          <div className="detail-navigation">
            <ul className="detail-navigation-items">
                <li style={visitedStyle} onClick={this.getAllData}>All</li>
                <li onClick={this.getPhysicalData}>Physical</li>
                <li onClick={this.getVirtualData}>Virtual</li>
            </ul>
            <div className="detail-navigation-input">
              <span className="icon-search"></span>
              <input/>
            </div>
            <div className="detail-navigation-buttons">
              <span className="icon-th-card"></span>
              <span className="icon-th-list"></span>
            </div>
          </div>
          <div className="detail-items">
          {this.state.showAgentsData.length ? this.state.showAgentsData.map((item, index) => {
            return (
              <AgentDetail key={index} data={item}></AgentDetail>
            )
            }
          ) : <div className="empty-data">暂无数据</div>
        }
          </div>
        </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
      </div>
      <footer>©Copyright 2017 ThoughtWorks</footer>
    </div>
  };
}

export default App;