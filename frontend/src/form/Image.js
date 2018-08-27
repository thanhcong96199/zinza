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

class ImageForm extends Component {

  state = {
    image_id: '',
    image_name: '',
    isize: '',
    igroup: ''
  }

  reset = () => {
      const state = {
        image_id: '',
        image_name: '',
        isize: '',
        igroup: ''
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
    let history = createHistory()
    axios.post(Constants.imagesCreateRoute, this.state)
    .then(
        (res) => {
          let result = res.data.result
          if (result) {
            Constants.mess.show();
            this.reset();
            history.push('/images')
          } else {
            Constants.mess.show('error', 'Lỗi create');
          }
        },
        (error) => { Constants.mess.show('error', 'Lỗi'); }
    );
  }

  onUpdate = () => {
    let history = createHistory()
    axios.post(Constants.imagesUpdateRoute, this.state)
    .then(
        (res) => {
          let result = res.data.result
          if (result) {
            Constants.mess.show();
            this.reset();
            history.push('/images')
          } else {
            Constants.mess.show('error', 'Lỗi create');
          }
        },
        (error) => { Constants.mess.show('error', 'Lỗi'); }
    );
  }

  handleDel = () => {
    let history = createHistory()
    axios.post(Constants.imagesDeleteRoute, this.state)
    .then(
        (res) => {
          let result = res.data.result
          if (result) {
            Constants.mess.show('success', 'Xóa thành công');
            history.push('/users')
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
      const image_id = Number(this.props.match.params.id)
      axios.post(Constants.userDetailRoute, {image_id: image_id})
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
    const { image_name, isize, igroup, image_id  } = this.state
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
              <Input disabled={typeForm !== 'create'} onChangeValue={this.onChangeValue} value={image_id} kind="input" classList="mr-t-10" label="ID" placeholder="" name="image_id" type="email" iconName="mail"/>
            }
            <Input onChangeValue={this.onChangeValue} value={image_name} kind="input" classList="mr-t-10" label="Name" placeholder="" name="mail" type="email" iconName="mail"/>
          </div>
          <div className="col col-6">
            {
              (typeForm === 'edit' || typeForm === 'detail') &&
              <Input disabled={true} onChangeValue={this.onChangeValue} value={isize} kind="input" classList="mr-t-10" label="Size" placeholder="" name="isize" type="text" iconName="key"/>
            }
            <Input onChangeValue={this.onChangeValue} value={igroup} kind="input" classList="mr-t-10" label="Group" placeholder="" name="igroup" type="text" iconName="user"/>
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
                  (typeForm === 'edit' || typeForm === 'detail') &&
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

export default connect(mapStateToProps, mapDispatchToProps)(ImageForm)