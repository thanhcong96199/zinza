import React, { Component } from 'react';
import { Input, Icon, Select } from 'antd';

class MyInput extends Component {
  emitEmpty = () => {
    this.input.focus();
  }

  onChangeValue = (data) => {
    let { name, value } = data.target
    this.props.onChangeValue(name, value)
  }

  onChangeSelect = (value) => {
    const {name} = this.props
    this.props.onChangeValue(name, value)
  }

  render() {
    const { placeholder, iconName, name, type, classList, label, kind, value, selects, defaultValue, disabled } = this.props
    const { TextArea } = Input
    const Option = Select.Option
    let _disabled = typeof(disabled) === 'undefined' ? false : disabled

    return (
      <div className={classList}>
        <label>{label}</label>
        {
          kind === 'input' &&
          <Input
            name={name}
            placeholder={placeholder}
            prefix={<Icon type={iconName} style={{ color: 'rgba(0,0,0,.25)' }} />}
            value={value}
            type={type}
            onChange={this.onChangeValue}
            ref={node => this.input = node}
            disabled={_disabled}
          />
        }

        {
          kind === 'textarea' &&
          <TextArea
            name={name}
            rows={4}
            placeholder={placeholder}
            prefix={<Icon type={iconName} style={{ color: 'rgba(0,0,0,.25)' }} />}
            value={value}
            type={type}
            onChange={this.onChangeValue}
            ref={node => this.input = node}
            disabled={_disabled}
          />
        }

        {
          kind === 'select' &&
          <div>
            <Select
              name={name}
              defaultValue={defaultValue}
              onChange={this.onChangeSelect}
              ref={node => this.input = node}
              style={ {width: '100%'} }
              disabled={_disabled}
            >
              {
                selects.map((item, key) => {
                  return <Option key={key} value={item.id}>{item.name}</Option>
                })
              }
            </Select>
          </div>
        }
      </div>
    );
  }
}

export default MyInput