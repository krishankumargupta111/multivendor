import { Radio } from '@mui/material'
import React from 'react'

function AddressCard({value,selectedValue,handleChange,item}:any) {
  return (
    <div className='p-5 border border-gray-300 rounded-md flex'>
      <div>
        <Radio
        checked={selectedValue===value}
        value={value}
        onChange={handleChange}
         name="radio-buttons"/>
      </div>
      <div className='space-y-3 pt-3'>
        <h1>{item.name}</h1>
        <p>{item.address}</p>
        <p>
          <strong>Mobile:</strong>{item.mobile}
        </p>
      </div>
    
    </div>
  )
}

export default AddressCard
