import "/src/CSS/Account_Input.css";

export default function FormInput({ label, type = "text", ...props }) {
  return (
    <div className="form-input">
      {label && <label>{label}</label>}
      <input
        type={type}
        {...props}
      />
    </div>
  );
}