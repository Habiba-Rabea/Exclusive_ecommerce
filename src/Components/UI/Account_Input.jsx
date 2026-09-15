import "/src/CSS/Account_Input.css";

export default function FormInput({ label, ...props }) {
  return (
    <div className="form-input">
      {label && <label>{label}</label>}
      <input
        {...props}
      />
    </div>
  );
}