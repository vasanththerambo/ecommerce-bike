import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { Constants } from '../../config/constants';

const { baseUrl } = Constants;

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;

            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers
        }
    }),
    endpoints: (build) => ({
        getProducts: build.query({
            query: () => ({
                url: 'api/product/products',
                method:'GET'
            })
        })
        
    })
})


export const { useGetProductsQuery } = authApi

