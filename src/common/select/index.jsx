import { Select } from 'antd'
import React from 'react'
import "./app.css"
function SelectCommon({onChange , options  , style , defaultValue , text , className}) {
  return (
    <div className="SelectDiv">
    {text ?<p>{text}</p>:null }
      <Select
      defaultValue={defaultValue}
      style={style}
      onChange={onChange}
      options={options}
      className={className}
    />
    </div>
  )
}

export default SelectCommon