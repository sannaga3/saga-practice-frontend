export const handleErrors = (e) => {
  const errorMessages = Object.values(e.response.data.errorMessages);
  return [].concat.apply([], errorMessages);
};

export const clearError = () => {
  return { status: false, messages: [], id: null };
};
