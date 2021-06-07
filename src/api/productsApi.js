import axiosLib from "axios";
import { DONATE } from "../constants/actions/runtime";

import { api } from "./api";
import { getUserSession } from "./auth";

// Get user products
export const getProducts = async ({
  size,
  category,
  sortBy,
  sort,
  nextPageToken,
  search,
}) => {
  const axios = await api();

  let queries = [];

  if (size) {
    queries.push(`size=${size}`);
  }

  if (category) {
    queries.push(`category=${category}`);
  }

  if (sortBy) {
    queries.push(`sortBy=${sortBy}`);
  }
  if (sort) {
    queries.push(`sort=${sort}`);
  }
  if (nextPageToken) {
    queries.push(`nextPageToken=${nextPageToken}`);
  }

  if (search) {
    queries.push(`search=${search}`);
  }

  const query = queries.join("&");
  const { userId } = await getUserSession();
  const res = await axios.get(`/${userId}/products?${query}`);
  return res.data.data;
};

let cancelTokenSource;

export const calculateMetrics = async (productIds) => {
  const axios = await api();
  const { userId } = await getUserSession();

  if (cancelTokenSource) {
    cancelTokenSource.cancel();
  }

  cancelTokenSource = axiosLib.CancelToken.source();

  const res = await axios.post(
    `/${userId}/products/metrics`,
    { productIds },
    { cancelToken: cancelTokenSource.token }
  );

  return res.data.data;
};

export const donateItem = async (productId) => {
  const { idToken, userId } = await getUserSession();
  const axios = await api();
  return axios.post(
    `${userId}/products/${productId}/donate`,
    {},
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
};

export const getOtherReturnProducts = async (size = 5, productIds = []) => {
  const axios = await api();
  const { userId } = await getUserSession();

  const res = await axios.post(
    `/${userId}/products/other/returns?size=${size}`,
    { productIds }
  );
  return res.data.data;
};