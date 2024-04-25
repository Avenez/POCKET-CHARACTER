const getToken = () => {
  const cookie_or_null = (document.cookie.match(/^(?:.*;)?\s*loginCookie\s*=\s*([^;]+)(?:.*)?$/) || [, null])[1];
  let cookie = JSON.parse(cookie_or_null);
  let token = cookie.token;
  return token;
};

export default getToken;
