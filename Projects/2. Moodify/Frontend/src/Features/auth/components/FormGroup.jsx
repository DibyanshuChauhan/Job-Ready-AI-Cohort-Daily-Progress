const FormGroup = ({ label, placeholder, value, onChange, type }) => {
  return (
    <div className="form-group">
      <label htmlFor={label.toLowerCase()}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        id={label.toLowerCase()}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default FormGroup;
