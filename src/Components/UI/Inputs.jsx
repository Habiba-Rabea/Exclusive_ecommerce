// import '../../CSS/Inputs.css';
// const InputField = ({ type = "text", placeholder, isTextArea = false }) => {
//   return (
//     <div className="input-wrapper">
//       {isTextArea ? (
//         <textarea
//           placeholder={placeholder}
//           rows="7"
//           className="custom-textarea"
//         />
//       ) : (
//         <input
//           type={type}
//           placeholder={placeholder}
//           className="custom-input"
//         />
//       )}
//     </div>
//   );
// };

// export default InputField;

// import '../../CSS/Inputs.css';

// const InputField = ({ type = "text", placeholder, isTextArea = false, className = "", ...props }) => {
//   return (
//     <div className="input-wrapper">
//       {isTextArea ? (
//         <textarea
//           placeholder={placeholder}
//           rows="7"
//           className={`custom-textarea ${className}`}
//           {...props}
//         />
//       ) : (
//         <input
//           type={type}
//           placeholder={placeholder}
//           className={`custom-input ${className}`}
//           {...props}
//         />
//       )}
//     </div>
//   );
// };

// export default InputField;


import '../../CSS/Inputs.css';

const InputField = ({ type = "text", placeholder, isTextArea = false, className = "", ...props }) => {
  return (
    <div className="input-wrapper">
      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          rows="7"
          className={`custom-textarea ${className}`}
          {...props}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className={`custom-input ${className}`}
          {...props}
        />
      )}
    </div>
  );
};

export default InputField;