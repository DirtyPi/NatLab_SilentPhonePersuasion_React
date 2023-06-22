import React from 'react';
import './componentsCSS/VibrationNotice.css';

const VibrationNotice = () => (
  <div className="vibration-notice" style={{
    backgroundColor: 'white', 
    border: '2px solid black',
    borderRadius: '5px',
    padding: '20px',
    textAlign: 'center',
    fontSize: '24px',
    animation: 'vibrate 1s linear infinite'
}}>
    Thank you for playing! Remember to turn down the volume of your phones.
  </div>
);

export default VibrationNotice;