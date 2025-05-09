import {
  configureStore,
  createSelector,
  combineReducers,
} from '@reduxjs/toolkit'
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import movieSlice from './slices/movieSlice'
import { moviesApi } from './services/list-movies-service'

const persistConfig = {
  key: 'ghibli-movies',
  storage,
  whitelist: ['movies'],
}

const rootReducer = combineReducers({
  movies: movieSlice,
  [moviesApi.reducerPath]: moviesApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PURGE',
        ],
      },
    }).concat(moviesApi.middleware),
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
