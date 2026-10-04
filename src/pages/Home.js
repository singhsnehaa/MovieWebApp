import React from "react";
import { useSelector } from "react-redux";
import BannerHome from "../components/BannerHome";
import HorizontalScollCard from "../components/HorizontalScollCard";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const trendingData = useSelector((state) => state.movieoData.bannerData);
  const { data: nowPlayingData } = useFetch("/movie/now_playing");
  const { data: topRatedData } = useFetch("/movie/top_rated");
  const { data: popularTvShowData } = useFetch("/tv/popular");
  const { data: onTheAirShowData } = useFetch("/tv/on_the_air");

  return (
    <div>
      <BannerHome />
      <HorizontalScollCard
        data={trendingData}
        heading="Trending"
        trending={true}
      />
      <HorizontalScollCard
        data={nowPlayingData}
        heading="Now Playing"
        media_type={"movie"}
      />
      <HorizontalScollCard
        data={topRatedData}
        heading="Top Rated Movies"
        media_type={"movie"}
      />
      <HorizontalScollCard
        data={popularTvShowData}
        heading="Popular Tv Shows"
        media_type={"tv"}
      />
      <HorizontalScollCard
        data={onTheAirShowData}
        heading="On The Air"
        media_type={"tv"}
      />
    </div>
  );
};

export default Home;
