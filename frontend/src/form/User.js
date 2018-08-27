import React, { Component } from 'react';
import { Button } from 'antd';
import * as Constants from '../constants/var'
import axios from 'axios';

import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import Input from './../components/Input'

import createHistory from 'history/createHashHistory';

function mapStateToProps(state: Object): Object {
  return {
    userRedux: state.userRedux.user
  }
}

function mapDispatchToProps(dispatch: Function): Object {
  return {
  }
}

class User extends Component {

  state = {
      user_id: '',
      mail: '',
      user_password: '',
      user_name: '',
      position: ''
  }

  reset = () => {
      const state = {
        mail: '',
        user_password: '',
        user_name: '',
        position: '',
        user_id: ''
      }
      this.setState({...state})
  }

  onChangeValue = (name, value) => {
    var obj  = {}
    obj[name] = value
    this.setState({
        ...obj
    })
  }

  handleSubmit = () => {
    const { typeForm } = this.props
    if (typeForm === 'create') {
      this.onCreate()
    } else if (typeForm === 'edit') {
      this.onUpdate()
    }
  }

  onCreate = () => {
    axios.post(Constants.createUserRoute, this.state)
    .then(
        (res) => {
          let result = res.data.result
          if (result) {
            Constants.mess.show();
            this.reset();
          } else {
            Constants.mess.show('error', 'Lỗi create');
          }
        },
        (error) => { Constants.mess.show('error', 'Lỗi'); }
    );
  }

  onUpdate = () => {
    axios.post(Constants.updateUserRoute, this.state)
    .then(
        (res) => {
          let result = res.data.result
          if (result) {
            Constants.mess.show();
            this.reset();
          } else {
            Constants.mess.show('error', 'Lỗi create');
          }
        },
        (error) => { Constants.mess.show('error', 'Lỗi'); }
    );
  }

  handleDel = () => {
    let history = createHistory()
    axios.post(Constants.userDeleteRoute, this.state)
    .then(
        (res) => {
          console.log('====delete:', res.data.result)
          let result = res.data.result
          if (result) {
            Constants.mess.show('success', 'Xóa thành công');
            history.goBack()
          } else {
            Constants.mess.show('error', 'Xóa thất bại');
          }
         },
        (error) => { Constants.mess.show('error', 'Lỗi'); }
    );
  }

  componentDidMount() {
    let history = createHistory()

    const { typeForm } = this.props
    if (typeForm === 'edit') {
      const user_id = Number(this.props.match.params.id)
      axios.post(Constants.userDetailRoute, {user_id: user_id})
      .then(
          (res) => {
            let user = res.data
            this.setState({
              ...user
            })
          },
          (error) => { Constants.mess.show('error', 'Lỗi'); }
      );
    }
  }

  render() {
    const { mail, user_password, user_name, position, user_id  } = this.state
    const { typeForm } = this.props

    return (
      <div>
        <div className="row">
          <div className="col col-12 text-center mr-t-20">
            <h5>{typeForm}</h5>
          </div>

          <div className="col col-6">
            {
              (typeForm === 'edit' || typeForm === 'detail') &&
              <Input disabled={typeForm !== 'create'} onChangeValue={this.onChangeValue} value={user_id} kind="input" classList="mr-t-10" label="ID" placeholder="" name="user_id" type="email" iconName="mail"/>
            }
            <Input onChangeValue={this.onChangeValue} value={mail} kind="input" classList="mr-t-10" label="Email" placeholder="" name="mail" type="email" iconName="mail"/>
            <Input onChangeValue={this.onChangeValue} value={user_password} kind="input" classList="mr-t-10" label="Password" placeholder="" name="user_password" type="text" iconName="key"/>
          </div>
          <div className="col col-6">
            <Input onChangeValue={this.onChangeValue} value={user_name} kind="input" classList="mr-t-10" label="Name" placeholder="" name="user_name" type="text" iconName="user"/>
            <Input onChangeValue={this.onChangeValue} value={position} kind="input" classList="mr-t-10" label="Position" placeholder="" name="position" type="text" iconName="smile-o"/>
          </div>
        </div>

        <div className="row">
          <div className="col col-12">
            <div className="mr-t-20 text-right">
                {
                  typeForm === 'create' &&
                  <span>
                    <Button className="mr-r-10" type="primary" onClick={this.handleSubmit}>Create</Button>
                    <Button className="mr-r-10" onClick={this.reset}>Reset</Button>
                  </span>
                }
                {
                  typeForm === 'edit' &&
                  <Button className="mr-r-10" type="primary" onClick={this.handleSubmit}>Update</Button>
                }
                {
                  (typeForm === 'detail' || typeForm === 'edit') &&
                  <Button type="danger" onClick={this.handleDel}>Destroy</Button>
                }
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
