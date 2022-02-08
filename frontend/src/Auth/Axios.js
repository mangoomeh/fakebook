import axios from "axios";

const baseURL = "http://127.0.0.1:8000/";
const refreshTokenEndpoint = baseURL + "auth/token/refresh/";
const verifyTokenEndpoint = baseURL + "auth/token/verify/";

const fetcher = {
  get: async (endpoint, accessToken) => {
    try {
      const res = await axios.get(baseURL + endpoint, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },

  post: async (endpoint, accessToken, body) => {
    let headers = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    if (accessToken === "") {
      headers = null;
    }
    try {
      const res = await axios.post(baseURL + endpoint, body, headers);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },

  delete: async (endpoint, accessToken, body) => {
    let headers = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    if (accessToken === "") {
      headers = null;
    }
    try {
      const res = await axios.delete(baseURL + endpoint, body, headers);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },

  refresh: async (refreshToken, callBack) => {
    const res = await axios.post(refreshTokenEndpoint, {
      refresh: refreshToken,
    });
    return res.data.access;
  },

  verify: async (token) => {
    try {
      await axios.post(verifyTokenEndpoint, {
        token,
      });
      return true;
    } catch (err) {
      return false;
    }
  },

  verifyAndRefresh: async (accessToken, refreshToken) => {
    try {
      await axios.post(verifyTokenEndpoint, {
        token: accessToken,
      });
      return accessToken;
    } catch (err) {
      const res = await axios.post(refreshTokenEndpoint, {
        refresh: refreshToken,
      });
      return res.data.access;
    }
  },
};

export default fetcher;
