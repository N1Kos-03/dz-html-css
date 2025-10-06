import styles from './Input.module.css';
import React from 'react';

const Input = React.forwardRef(({ value, onChange, type = "text", placeholder, leftIcon }, ref) => {
  return (
    <div className={styles['input-body']}>
      {leftIcon && (
        <div className={styles['input-img']}>
          {leftIcon}
        </div>
      )}
      <input 
        ref={ref}
        type={type}
        value={value}
        onChange={(e) => onChange && onChange(e)} 
        placeholder={placeholder}
        className={`${styles['input']} ${leftIcon ? styles['with-icon'] : ''}`}
      />
    </div>
  );
});

export default Input;
