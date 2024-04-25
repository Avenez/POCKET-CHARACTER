import React from "react";

export const getCookie = () => {
  const cookie_or_null = (document.cookie.match(/^(?:.*;)?\s*loginCookie\s*=\s*([^;]+)(?:.*)?$/) || [, null])[1];
  let cookie = JSON.parse(cookie_or_null);

  return cookie;
};
