import axios from "axios";

const base_endpoint = process.env.REACT_APP_BASE_ENDPOINT;

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    const { origin } = new URL(config.url);

    const allowedOrigins = [base_endpoint];
    const token = localStorage.getItem("access-token");

    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = token;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export const fetchProductList = async ({ pageParam = 1 }) => {
  const { data } = await axios.get(
    `${base_endpoint}/product?page=${pageParam}`
  );

  return data;
};

export const fetchProduct = async (id) => {
  const { data } = await axios.get(`${base_endpoint}/product/${id}`);

  return data;
};

export const postProduct = async (input) => {
  const { data } = await axios.post(`${base_endpoint}/product/`, input);

  return data;
};

export const fetchRegister = async (input) => {
  const { data } = await axios.post(`${base_endpoint}/auth/register`, input);

  return data;
};

export const fetchLogin = async (input) => {
  const { data } = await axios.post(`${base_endpoint}/auth/login`, input);

  return data;
};

export const fetchMe = async () => {
  const { data } = await axios.get(`${base_endpoint}/auth/me`);

  return data;
};

export const fetchLogout = async () => {
  const { data } = await axios.post(`${base_endpoint}/auth/logout`, {
    refresh_token: localStorage.getItem("refresh-token"),
  });

  return data;
};

export const postOrder = async (input) => {
  const { data } = await axios.post(`${base_endpoint}/order`, input);

  return data;
};

export const fetchOrders = async () => {
  const { data } = await axios.get(`${base_endpoint}/order`);

  return data;
};

export const deleteProduct = async (product_id) => {
  const { data } = await axios.delete(`${base_endpoint}/product/${product_id}`);

  return data;
};

export const updateProduct = async (input, product_id) => {
  const { data } = await axios.put(
    `${base_endpoint}/product/${product_id}`,
    input
  );

  return data;
};
