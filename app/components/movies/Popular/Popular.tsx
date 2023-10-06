"use client";

// React
import { useState, useEffect } from "react";

// Stores
import { useAppSelector } from "@/app/redux/store";

// Types
import type { Movie, Paginated } from "@/app/types/movies";

// Services
import $http from "@/app/services/http";

// Components
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

// Styles
import "swiper/css";
import "swiper/css/pagination";
import "./Popular.scss";

// Assets
import Star from "@/public/images/star.png";

export default function CurrentPlaying() {
  const [popular, setPopular] = useState<Movie[]>([]);
  const genres = useAppSelector((state) => state.moviesReducer.value.genres);

  const showGenre = (genreId: number) =>
    genres.find((obj) => obj.id === genreId)?.name;

  const getPopularMovies = async () => {
    try {
      const response = await $http.get<Paginated<Movie>>("api/movie/popular");

      setPopular(response?.results || []);
    } catch (e) {
      setPopular([]);
    }
  };

  useEffect(() => {
    getPopularMovies();
  }, []);

  return (
    <div className="popular-container">
      <h4 className="font-bold mb-6">Popular of the week</h4>
      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          1124: {
            slidesPerView: 2.5,
            spaceBetween: 16,
          },
          1600: {
            slidesPerView: 3.5,
            spaceBetween: 16,
          },
          1920: {
            slidesPerView: 4.5,
            spaceBetween: 16,
          },
        }}
      >
        {popular?.map((movie, index) => (
          <SwiperSlide key={movie.id}>
            <Link href={`movie/${movie.id}`}>
              <div className="flex gap-4 items-center w-full">
                <span className="text-5xl font-bold">{index + 1}</span>
                <div className="flex gap-4 items-center w-full">
                  <Image
                    className="movie-image"
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    blurDataURL={`https://image.tmdb.org/t/p/w45${movie.backdrop_path}`}
                    placeholder="blur"
                    alt={movie.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                  <div>
                    <p className="font-bold mb-3">{movie.title}</p>
                    <div className="flex gap-1 mb-3">
                      {movie.genre_ids.slice(0, 2).map((genreId, index) => (
                        <p
                          className="small flex whitespace-nowrap text-[#9CA4AB]"
                          key={genreId}
                        >
                          {index >= 1 ? "•" : ""} {showGenre(genreId)}
                        </p>
                      ))}
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center gap-1">
                        <Image
                          src={Star}
                          alt="Star"
                          className="h-auto block w-fit"
                        />
                        <p className="small vote">{movie.vote_average}</p>
                      </div>
                      <p className="small ml-1 text-[#9CA4AB]">Movie</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
