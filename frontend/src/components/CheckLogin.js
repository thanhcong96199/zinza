import React, { Component } from 'react';
import createHistory from 'history/createHashHistory';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userAction from './../actions/user'
import { Redirect } from 'react-router-dom'
const history = createHistory()

function mapStateToProps(state: Object): Object {
  return {
  }
}

function mapDispatchToProps(dispatch: Function): Object {
  return {
    actRedux: bindActionCreators(userAction, dispatch)
  }
}

class CheckLogin extends Component {
  constructor(props) {
    super(props)

    this.state = { currentPath: history.location.pathname }

    let userLocalS = localStorage.getItem('user')
    if (userLocalS) {
      this.fillInfo()
    } else {
      this.logout()
    }
  }

  logout = () => {
    this.props.actRedux.actSetUser({
        loged: false
    })
  }

  fillInfo = () => {
    let userLocalS = localStorage.getItem('user')
    let userObj = JSON.parse(userLocalS)
    this.props.actRedux.actSetUser(userObj)
  }

  render() {
    let userLocalS = localStorage.getItem('user')
    let { currentPath } = this.state
    return (
      <div>
        {
          userLocalS &&
          <Redirect to={currentPath}/>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckLogin)
