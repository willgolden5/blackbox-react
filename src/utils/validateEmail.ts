// function that uses regex to validate email
export const validateEmail = (email: string) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};
