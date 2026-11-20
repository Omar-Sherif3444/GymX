import { useState } from "react";

const PersonalDetails = ({ details, onSave }) => {
  const [formData, setFormData] = useState(details);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave?.(formData);
  };

  return (
    <section className="bg-(--gym-card) border border-(--gym-line) rounded-xl p-5 sm:p-6">
      <p className="text-sm font-bold font-['Barlow'] text-(--gym-label) uppercase tracking-wide">
        Personal details
      </p>

      <h2 className="text-2xl font-bold font-['Anton'] text-(--gym-text mt-2 mb-6">
        EDIT PROFILE
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Full name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />

          <InputField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <div>
            <label className="block text-sm font-semibold font-['Barlow'] text-(--gym-subtext) mb-2">
              Training goal
            </label>

            <select
              name="trainingGoal"
              value={formData.trainingGoal}
              onChange={handleChange}
              className="w-full bg-(--gym-surface) border border-(--gym-line) rounded-md px-3 py-3 text-sm font-['DM_Sans'] text-(--gym-text) outline-none focus:border-[#FF503C] transition"
            >
              <option>Build strength</option>
              <option>Lose weight</option>
              <option>Build muscle</option>
              <option>Improve fitness</option>
              <option>Maintain health</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#FF503C] text-white text-sm font-bold font-['Barlow'] px-5 py-3 rounded-md hover:opacity-90 transition"
        >
          Save changes
        </button>
      </form>
    </section>
  );
};

const InputField = ({ label, name, value, onChange, type = "text" }) => {
  return (
    <div>
      <label className="block text-sm font-semibold font-['Barlow'] text-(--gym-subtext) mb-2">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        className="w-full bg-(--gym-surface) border border-(--gym-line) rounded-md px-3 py-3 text-sm font-['DM_Sans'] text-(--gym-text) outline-none focus:border-[#FF503C] transition"
      />
    </div>
  );
};

export default PersonalDetails;
