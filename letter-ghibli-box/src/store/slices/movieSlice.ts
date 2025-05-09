import type { MoviesResponse } from '@/interfaces/movies'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { moviesApi } from '../services/list-movies-service'

interface MovieSliceProp {
  error: string | null | undefined
  loading: boolean
  movieData: Record<
    string,
    MoviesResponse & { watched: boolean; favorite: boolean; note: string }
  >
  watched: boolean
  favorite: boolean
  note: string
}

// Carregar dados do localStorage ou usar objeto vazio
const savedData = localStorage.getItem('movieData')
const loadedData = savedData ? JSON.parse(savedData) : {}

const initialState: MovieSliceProp = {
  error: null,
  loading: false,
  movieData: loadedData,
  watched: false,
  favorite: false,
  note: '',
}

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    updateMovie: (
      state,
      action: PayloadAction<{
        id: string
        watched?: boolean
        favorite?: boolean
        note?: string
      }>
    ) => {
      const { id, watched, favorite, note } = action.payload

      if (state.movieData[id]) {
        const movieData = state.movieData[id]

        // Atualizar o filme
        state.movieData[id] = {
          ...movieData,
          watched: watched !== undefined ? watched : movieData.watched,
          favorite: favorite !== undefined ? favorite : movieData.favorite,
          note: note !== undefined ? note : movieData.note,
        }

        // Salvar no localStorage
        localStorage.setItem('movieData', JSON.stringify(state.movieData))
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      moviesApi.endpoints.getAllMovies.matchFulfilled,
      (state, { payload }) => {
        state.loading = false

        // Criar objeto de filmes combinando dados da API com localStorage
        payload.forEach((movie: MoviesResponse) => {
          state.movieData[movie.id] = {
            ...movie,
            watched: state.movieData[movie.id]?.watched || false,
            favorite: state.movieData[movie.id]?.favorite || false,
            note: state.movieData[movie.id]?.note || '',
          }
        })

        // Salvar no localStorage
        localStorage.setItem('movieData', JSON.stringify(state.movieData))
      }
    )
  },
})

export const { updateMovie } = movieSlice.actions
export default movieSlice.reducer
