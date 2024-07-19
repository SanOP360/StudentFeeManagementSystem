import React, { useState } from "react";

export default function EditStudent({ student, onUpdate }) {
  const [formData, setFormData] = useState(student);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        id="rollNumber"
        value={formData.rollNumber}
        onChange={handleChange}
      />
      <input
        type="text"
        id="fees"
        value={formData.fees}
        onChange={handleChange}
      />
      <input
        type="text"
        id="paymentStatus"
        value={formData.paymentStatus}
        onChange={handleChange}
      />
      <button type="submit">Save</button>
    </form>
  );
}
