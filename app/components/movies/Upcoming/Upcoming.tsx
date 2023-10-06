"use client";
import type { Movie, Genre, Paginated } from "@/app/types/movies";
import { useEffect, useState } from "react";
import Image from "next/image";
import $http from "@/app/services/http";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import "./Upcoming.scss";
import Star from "@/public/images/star.png";

export default function Upcoming() {
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  const getMoviesGenres = async () => {
    try {
      const response = await $http.get<{ genres: Genre[] }>(
        "api/genre/movie/list"
      );

      setGenres(response?.genres || []);
    } catch (e) {
      setGenres([]);
    }
  };

  const getUpcomingMovies = async () => {
    try {
      const response = await $http.get<Paginated<Movie>>("api/movie/upcoming");
      setUpcoming(response?.results || []);
      getMoviesGenres();
    } catch (e) {
      setUpcoming([]);
    }
  };

  const showGenre = (genreId: number) =>
    genres.find((obj) => obj.id === genreId)?.name;

  useEffect(() => {
    getUpcomingMovies();
  }, []);

  return (
    <div className="upcoming-container">
      <h4 className="font-bold mb-6">Upcoming Movies</h4>
      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          600: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          880: {
            slidesPerView: 2.5,
            spaceBetween: 16,
          },
          1240: {
            slidesPerView: 3.5,
            spaceBetween: 16,
          },
          1700: {
            slidesPerView: 4.5,
            spaceBetween: 16,
          },
        }}
      >
        {upcoming?.map((obj) => (
          <SwiperSlide key={obj.id}>
            <Link href={`movie/${obj.id}`}>
              <Image
                className="movie-image"
                src={`https://image.tmdb.org/t/p/w500${obj.poster_path}`}
                blurDataURL={`https://image.tmdb.org/t/p/w45${obj.backdrop_path}`}
                placeholder="blur"
                alt={obj.title}
                width={0}
                height={0}
                sizes="100vw"
              />
              <div className="movie-info">
                <div className="movie-info__inner">
                  <h4 className="font-semibold mb-3">{obj.title}</h4>
                  <div className="flex flex-col md:flex-row md:items-center text-[#9CA4AB]">
                    <div className="flex items-center gap-1 border-b border-b-[var(--foreground-rgb)] md:border-b-0 pb-2 mb-2 md:pb-0 md:mb-0">
                      <Image
                        src={Star}
                        alt="Star"
                        className="h-auto block w-fit"
                      />
                      <p className="small vote">{obj.vote_average}</p>
                    </div>
                    <div className="flex gap-1 ml-1">
                      {obj.genre_ids.length >= 2 ? (
                        <div className="flex gap-1 ml-1">
                          {obj.genre_ids.slice(0, 2).map((genreId, index) => (
                            <p
                              className="small flex whitespace-nowrap"
                              key={genreId}
                            >
                              {index >= 1 ? "•" : ""} {showGenre(genreId)}
                            </p>
                          ))}
                          <p className="small">
                            {obj.genre_ids.length - 2
                              ? `+ ${obj.genre_ids.length - 2} more`
                              : ""}
                          </p>
                        </div>
                      ) : (
                        <div className="flex gap-1 ml-1">
                          {obj.genre_ids.map((genreId, index) => (
                            <p
                              className="small flex whitespace-nowrap"
                              key={genreId}
                            >
                              {index >= 1 ? "•" : ""} {showGenre(genreId)}
                            </p>
                          ))}
                        </div>
                      )}
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
