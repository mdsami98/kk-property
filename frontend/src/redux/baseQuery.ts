import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';
// import {
//     getCookie,
//     setCookie,
//     setCookieForRefresh
// } from '@/utils/helpers/Cookie';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5001/api/',
    prepareHeaders: (headers, { getState, endpoint }) => {
        // const token = getCookie(import.meta.env.REACT_APP_ACCESS_TOKEN);
        // if (token && endpoint !== 'refresh') {
        //     headers.set('authorization', `Bearer ${token}`);
        // }

        return headers;
    }
});

export interface BackendError {
    data: {
        message: string;
    };
    status: number;
}

const baseQueryWithReAuth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError | BackendError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    // if (result.error && result.error.status === 401) {
    //     // try to get a new token
    //     const refreshToken = getCookie(import.meta.env.REACT_APP_REFRESH_TOKEN);
    //     const refreshResult: any = await baseQuery(
    //         {
    //             method: 'POST',
    //             url: 'core/refresh-token',
    //             body: { refresh_token: refreshToken ?? '' }
    //         },
    //         { ...api, endpoint: 'refresh' },
    //         extraOptions
    //     );
    //     if (refreshResult.data) {
    //         setCookieForRefresh(
    //             import.meta.env.REACT_APP_REFRESH_TOKEN,
    //             refreshResult.data?.refresh.token
    //         );
    //         setCookie(
    //             import.meta.env.REACT_APP_ACCESS_TOKEN,
    //             refreshResult.data?.access.token,
    //             import.meta.env.REACT_APP_ACCESS_TOKEN_VALIDITY
    //         );

    //         result = await baseQuery(args, api, extraOptions);
    //     } else {
    //         return result;
    //         // api.dispatch({
    //         //     type: "user/signOut"
    //         // });
    //     }

    //     return result;
    // }
    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    reducerPath: 'api',
    tagTypes: [],
    endpoints: () => ({})
});
