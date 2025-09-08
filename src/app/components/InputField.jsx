const InputField = ({ icon: Icon, name, value, onChange, ...props }) => (
  <div className="relative">
    {Icon && (
      <Icon
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={18}
      />
    )}
    <input
      {...props}   // ✅ spread first
      name={name}
      value={value || ""} // ✅ controlled input
      onChange={onChange} // ✅ use passed handler
      className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-blue-500"
    />
  </div>
);
export default InputField;