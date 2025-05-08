import type { MoviesResponse } from '@/interfaces/movies'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { moviesApi } from '../services/list-movies-service'

interface MovieSliceProp {
  error: string | null | undefined
  loading: boolean
  movieData: MoviesResponse[]
}

const initialState: MovieSliceProp = {
  error: null,
  loading: false,
  movieData: [],
}

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setDataMovies: (state, action: PayloadAction<MoviesResponse[]>) => {
      console.log('setDataMovies action:', action.payload)
      state.movieData = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      moviesApi.endpoints.getAllMovies.matchFulfilled,
      (state, action) => {
        console.log('API response:', action.payload)
        state.loading = false
        state.movieData = action.payload
      }
    )
  },
})

export const { setDataMovies } = movieSlice.actions
export default movieSlice.reducer
