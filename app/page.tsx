"use client";

// React
import { useEffect } from "react";

// Stores
import { AppDispatch } from "@/app/redux/store";
import { useDispatch } from "react-redux";
import { setGenres } from "@/app/redux/features/movies-slice";

// Types
import type { Genre } from "@/app/types/movies";

// Services
import $http from "@/app/services/http";

// Components
import CurrentPlaying from "@/app/components/movies/CurrentPlaying/CurrentPlaying";
import Upcoming from "@/app/components/movies/Upcoming/Upcoming";
import Popular from "@/app/components/movies/Popular/Popular";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const getMoviesGenres = async () => {
    try {
      const response = await $http.get<{ genres: Genre[] }>(
        "api/genre/movie/list"
      );

      dispatch(setGenres(response?.genres || []));
    } catch (e) {
      dispatch(setGenres([]));
    }
  };

  useEffect(() => {
    getMoviesGenres();
  }, []);
  return (
    <div>
      <CurrentPlaying />
      <Upcoming />
      <Popular />
    </div>
  );
}
