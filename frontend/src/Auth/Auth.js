import axios from "axios";

const source = "http://127.0.0.1:8000/";
const refreshTokenEndpoint = source + "auth/token/refresh/";

const fetcher = {
  get: async (endpoint, accessToken, callBack) => {
    try {
      const res = await axios.post(source + endpoint, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      callBack(res.data);
    } catch (err) {
      console.log(err.toJSON());
      if (err.response.status === 401) {
        throw 401;
      }
    }
  },

  post: async (endpoint, accessToken, body, callBack) => {
    try {
      const res = await axios.post(source + endpoint, body, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      callBack(res.data);
    } catch (err) {
      console.log(err.toJSON());
      if (err.response.status === 401) {
        throw 401;
      }
    }
  },

  refresh: async (refreshToken, callBack) => {
    const res = await axios.post(refreshTokenEndpoint, {
      refresh: refreshToken,
    });
    callBack(res.data);
  },
};

export default fetcher;
