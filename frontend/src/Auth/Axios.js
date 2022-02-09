import axios from "axios";

const baseURL = "http://127.0.0.1:8000/";

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
    let headers = { Authorization: `Bearer ${accessToken}` };
    if (accessToken === "") {
      headers = null;
    }
    try {
      const res = await axios.delete(baseURL + endpoint, {
        data: body,
        headers,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
};

export default fetcher;
