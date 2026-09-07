import "/src/CSS/Account_Input.css";

export default function FormInput({ label, type = "text", defaultValue, placeholder }) {
  return (
    <div className="form-input">
      {label &&<label>{label}</label>}
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    </div>
  );
}