function headers() {
  const headers = new Headers();
  headers.append("Accept", "application/json");
  headers.append("Authorization", 'bearer ' + localStorage.access_token);
  return headers;
}

export default headers;
