// const API_URL = "https://flood-buoy.herokuapp.com";
const API_URL = "http://localhost:8000";

const LS_USER_DATA = "userData";
const TOKEN_EXPIRATION = new Date(new Date().getTime() + 1000 * 60 * 60);
const APP_DEBUG = true;
const SERIAL_KEY = "FB-03-12-01";

export { API_URL, LS_USER_DATA, TOKEN_EXPIRATION, APP_DEBUG, SERIAL_KEY };
