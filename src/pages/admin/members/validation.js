import { daysBetween, todayISO } from "./membersApi";

// Returns { field: message } — empty object means valid.
export const validateContact = ({ name, phone, email }) => {
  const errors = {};
  if (name.trim().length < 3) errors.name = "Enter the member's full name.";
  if (!/^01[0125]\d{8}$/.test(phone.replace(/\s/g, "")))
    errors.phone = "Enter a valid Egyptian mobile number (11 digits, starts with 01).";
  if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    errors.email = "Enter a valid email address.";
  return errors;
};

export const validateRegistration = (form) => {
  const errors = validateContact(form);
  const today = todayISO();

  if (!form.dateOfBirth) errors.dateOfBirth = "Select the date of birth.";
  else if (daysBetween(form.dateOfBirth, today) < 365 * 14) errors.dateOfBirth = "Members must be at least 14 years old.";

  if (!form.gender) errors.gender = "Select a gender.";
  if (!form.planId) errors.planId = "Choose a membership plan.";

  if (!form.startDate) errors.startDate = "Select a start date.";
  else if (form.startDate < today) errors.startDate = "Start date can't be in the past.";

  if (!form.paymentMethod) errors.paymentMethod = "Select how the member paid.";
  return errors;
};
