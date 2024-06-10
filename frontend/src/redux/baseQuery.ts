import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';
import { getCookie, setCookie, setCookieForRefresh } from '@/helpers/Cookie';

const baseQuery = fetchBaseQuery({
    // baseUrl: 'https://api.kamalkalamproperties.com/api/',
    baseUrl: 'http://localhost:2000/api',
    prepareHeaders: (headers, { getState, endpoint }) => {
        const token = getCookie('access_token');
        console.log(token);

        if (token && endpoint !== 'refresh') {
            headers.set('authorization', `Bearer ${token}`);
        }

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
    if (result.error && result.error.status === 401) {
        // try to get a new token
        const refreshToken = getCookie('refresh_token');
        const refreshResult: any = await baseQuery(
            {
                method: 'POST',
                url: 'auth/refresh-token',
                body: { refresh_token: refreshToken ?? '' }
            },
            { ...api, endpoint: 'refresh' },
            extraOptions
        );
        if (refreshResult.data) {
            setCookieForRefresh(
                'refresh_token',
                refreshResult.data?.refresh.token
            );
            setCookie(
                'access_token',
                refreshResult.data?.access.token,
                '1 hour'
            );

            result = await baseQuery(args, api, extraOptions);
        } else {
            return result;
            // api.dispatch({
            //     type: "user/signOut"
            // });
        }

        return result;
    }
    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    reducerPath: 'api',
    tagTypes: ['member'],
    endpoints: () => ({})
});
