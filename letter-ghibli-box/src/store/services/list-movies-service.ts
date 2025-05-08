import type { MoviesResponse } from '@/interfaces/movies'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: () => {},
  }),
  tagTypes: ['Movies'],
  endpoints: (builder) => ({
    getAllMovies: builder.query<MoviesResponse[], void>({
      query: () => ({
        url: 'films',
      }),
      providesTags: ['Movies'],
    }),
  }),
})

export const {
  /* Get Films */
  useGetAllMoviesQuery,
} = moviesApi
