import React from 'react';
import './form.css';

export const FormErrors = ({formErrors}) => (
  <div className='formErrors'>
    {Object.keys(formErrors).map((type, i) => {
      if(formErrors[type].haveError){
        return (
          <p key={i}>{type} {formErrors[type].message}</p>
        )        
      } else {
        return '';
      }
    })}
  </div>
)