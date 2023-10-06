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
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import UILink from "@/app/components/UI/UILink";

// Styles
import "swiper/css";
import "swiper/css/pagination";
import "./CurrentPlaying.scss";

export default function CurrentPlaying() {
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const genres = useAppSelector((state) => state.moviesReducer.value.genres);

  const showGenre = (genreId: number) =>
    genres.find((obj) => obj.id === genreId)?.name;

  const getCurrentPlayingMovies = async () => {
    try {
      const response = await $http.get<Paginated<Movie>>(
        "api/movie/now_playing"
      );

      setNowPlaying(response?.results || []);
    } catch (e) {
      setNowPlaying([]);
    }
  };

  useEffect(() => {
    getCurrentPlayingMovies();
  }, []);

  return (
    <div className="movie-container">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Autoplay]}
      >
        {nowPlaying?.map((obj) => (
          <SwiperSlide key={obj.id}>
            <Image
              className="movie-image"
              src={`https://image.tmdb.org/t/p/original${obj.backdrop_path}`}
              blurDataURL={`https://image.tmdb.org/t/p/w45${obj.backdrop_path}`}
              placeholder="blur"
              alt={obj.title}
              width={0}
              height={0}
              sizes="100vw"
            />
            <div className="movie-info">
              <div className="movie-info__inner">
                <h1 className="font-semibold mb-3">{obj.title}</h1>
                <div className="flex text-[#9CA4AB]">
                  <p className="vote">{obj.vote_average}</p>
                  <p className="ml-1">
                    • {new Date(obj.release_date).getFullYear()}
                  </p>
                  <div className="hidden sm:block">
                    {obj.genre_ids.length >= 3 ? (
                      <div className="flex">
                        {obj.genre_ids.slice(0, 3).map((genreId) => (
                          <p className="ml-1" key={genreId}>
                            • {showGenre(genreId)}
                          </p>
                        ))}
                        <p className="ml-1">
                          {obj.genre_ids.length - 3
                            ? `+ ${obj.genre_ids.length - 3} more`
                            : ""}
                        </p>
                      </div>
                    ) : (
                      <div className="flex">
                        {obj.genre_ids.map((genreId) => (
                          <p className="ml-1" key={genreId}>
                            • {showGenre(genreId)}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <p className="movie-desc">{obj.overview}</p>
                <UILink href={`movie/${obj.id}`} label="Read more" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
