"use client";
import type { Genre } from "@/app/types/movies";
import { useEffect, useState } from "react";
import Image from "next/image";
import $http from "@/app/api/http";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import "./Upcoming.scss";
import Star from "@/public/images/star.png";

export default function Upcoming() {
  const [upcoming, setUpcoming] = useState([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  const getMoviesGenres = async () => {
    try {
      const response = await $http().get("api/genre/movie/list");

      setGenres(response.genres);
    } catch (e) {
      setGenres([]);
    }
  };

  const showGenre = (genreId: number) =>
    genres.find((obj) => obj.id === genreId)?.name;

  useEffect(() => {
    $http()
      .get("api/movie/upcoming")
      .then((res) => {
        setUpcoming(res.results);
        getMoviesGenres();
      })
      .catch(() => {
        setUpcoming([]);
      });
  }, []);

  return (
    <div className="upcoming-container">
      <h4 className="font-bold mb-6">Upcoming Movies</h4>
      <Swiper spaceBetween={16} slidesPerView={4.5}>
        {upcoming?.map((obj) => (
          <SwiperSlide key={obj.id}>
            <Link href={`movie/${obj.id}`}>
              <Image
                className="movie-image"
                src={`https://image.tmdb.org/t/p/w500${obj.poster_path}`}
                alt={obj.title}
                width={0}
                height={0}
                sizes="100vw"
              />
              <div className="movie-info">
                <div className="movie-info__inner">
                  <h4 className="font-semibold mb-3">{obj.title}</h4>
                  <div className="flex items-center text-[#9CA4AB]">
                    <div className="flex items-center gap-1">
                      <Image
                        src={Star}
                        alt="Star"
                        className="h-auto block w-fit"
                      />
                      <p className="small font-bold vote">{obj.vote_average}</p>
                    </div>
                    <div className="flex gap-1 ml-1">
                      {obj.genre_ids.map((genreId, index) => (
                        <p
                          className="small flex whitespace-nowrap"
                          key={genreId}
                        >
                          {index >= 1 ? "•" : "|"} {showGenre(genreId)}
                        </p>
                      ))}
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
