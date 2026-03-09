interface GoogleFormConfig {
  actionUrl: string;
  nameField: string;
  emailField: string;
  phoneField: string;
  selectionField: string;
  rulesAcceptedField: string;
}

const googleFormConfig: GoogleFormConfig = {
  actionUrl: import.meta.env.VITE_GOOGLE_FORM_ACTION_URL ?? '',
  nameField: import.meta.env.VITE_GOOGLE_FORM_NAME_FIELD ?? '',
  emailField: import.meta.env.VITE_GOOGLE_FORM_EMAIL_FIELD ?? '',
  phoneField: import.meta.env.VITE_GOOGLE_FORM_PHONE_FIELD ?? '',
  selectionField: import.meta.env.VITE_GOOGLE_FORM_SELECTION_FIELD ?? '',
  rulesAcceptedField: import.meta.env.VITE_GOOGLE_FORM_RULES_FIELD ?? '',
};

export const isGoogleFormConfigured = () =>
  Object.values(googleFormConfig).every((value) => value.trim().length > 0);

export const submitGoogleForm = async (payload: {
  name: string;
  email: string;
  phone: string;
  selection: string;
  rulesAccepted: boolean;
}) => {
  if (!isGoogleFormConfigured()) {
    return { submitted: false };
  }

  const formData = new FormData();
  formData.append(googleFormConfig.nameField, payload.name);
  formData.append(googleFormConfig.emailField, payload.email);
  formData.append(googleFormConfig.phoneField, payload.phone);
  formData.append(googleFormConfig.selectionField, payload.selection);
  formData.append(googleFormConfig.rulesAcceptedField, payload.rulesAccepted ? 'Akkoord / Agreed / Einverstanden' : 'Niet akkoord');

  await fetch(googleFormConfig.actionUrl, {
    method: 'POST',
    mode: 'no-cors',
    body: formData,
  });

  return { submitted: true };
};
