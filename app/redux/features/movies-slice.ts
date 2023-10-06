import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Genre } from "../../types/movies";

type InitialState = {
  value: MovieState;
};

type MovieState = {
  genres: Genre[];
};

const initialState = {
  value: {
    genres: [],
  } as MovieState,
} as InitialState;

export const movies = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setGenres: (state, action: PayloadAction<Genre[]>) => {
      return {
        value: {
          genres: action.payload,
        },
      };
    },
  },
});

export const { setGenres } = movies.actions;
export default movies.reducer;
