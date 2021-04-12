import axiosLib from "axios";

import { api } from "./api";

// Get user products
export const getProducts = async ({
    userId,
    size,
    category,
    sortBy,
    sort,
    nextPageToken,
    search
}) => {
    const axios = await api();

    let queries = []

    if (size) {
        queries.push(`size=${size}`)
    }

    if (category) {
        queries.push(`category=${category}`)
    }

    if (sortBy) {
        queries.push(`sortBy=${sortBy}`)
    }
    if (sort) {
        queries.push(`sort=${sort}`)
    }
    if (nextPageToken) {
        queries.push(`nextPageToken=${nextPageToken}`)
    }

    if (search) {
        queries.push(`search=${search}`)
    }

    const query = queries.join('&')

    const res = await axios.get(`/${userId}/products?${query}`);
    return res.data.data
}

let cancelTokenSource;

export const calculatePricing = async (userId, productIds) => {
    const axios = await api();

    if (cancelTokenSource) {
        cancelTokenSource.cancel();
    }

    cancelTokenSource = axiosLib.CancelToken.source();

    const res = await axios.post(`/${userId}/products/pricing`, { productIds }, { cancelToken: cancelTokenSource.token });

    return res.data.data
}