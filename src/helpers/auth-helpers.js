const tokenName = "app-token";

export const getAuthToken = () => {
  const token = localStorage.getItem(tokenName);

  if (token) {
    return token;
  }

  return null;
};

export const setAuthToken = token => {
  localStorage.setItem(tokenName, token);
};

export const removeAuthToken = () => {
  localStorage.removeItem(tokenName);
};

export const checkToken = () => {
  const token = getAuthToken();

  if (token) {
    return true;
  }

  return false;
};
