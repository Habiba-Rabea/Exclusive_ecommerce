
import { forwardRef } from 'react';
import '../../CSS/Inputs.css';

const InputField =  forwardRef(({ type = "text", placeholder, isTextArea = false, className = "", ...props }, ref) => {
  return (
    <div className="input-wrapper">
      {isTextArea ? (
        <textarea
        ref={ref}
          placeholder={placeholder}
          rows="7"
          className={`custom-textarea ${className}`}
          {...props}
        />
      ) : (
        <input
        ref={ref}
          type={type}
          placeholder={placeholder}
          className={`custom-input ${className}`}
          {...props}
        />
      )}
    </div>
  );

});

export default InputField;