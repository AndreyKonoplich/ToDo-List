export const validateSignup = (name, email, password, confirmPassword) => {
  let errorMessage = '';

  if (name.length > 20) {
    errorMessage += 'Имя не должно превышать 20 символов.\n';
  }

  if (!email.includes('@')) {
    errorMessage += 'Некорректный email.\n';
  }

  if (password.length < 5) {
    errorMessage += 'Пароль должен содержать минимум 5 символов.\n';
  }

  if (password.length > 30) {
    errorMessage += 'Пароль не должен превышать 30 символов.\n';
  }

  if (password !== confirmPassword) {
    errorMessage += 'Пароли не совпадают.\n';
  }

  return errorMessage;
};
