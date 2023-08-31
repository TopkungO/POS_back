export const validateUsername = (username: string) => {
  const fmtUsername = username.trim();

  return fmtUsername.length >= 3 && fmtUsername.length <= 60;
};

export const validateEmail = (email: string) => {
  const fmtEmail = email.trim().toLowerCase();

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;

  return emailRegex.test(fmtEmail);
};

export const vaildatePassword = (password: string) =>
  password.length >= 6 && password.length <= 50;
