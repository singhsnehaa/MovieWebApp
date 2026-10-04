import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";

const ExplorePage = () => {
  const params = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`/discover/${params.explore}`, {
        params: { page: pageNo },
      });

      setData((prev) =>
        pageNo === 1
          ? response.data.results
          : [...prev, ...response.data.results],
      );
    } catch (error) {
      console.log("error from Explore Page", error);
    }
  }, [pageNo, params.explore]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPageNo((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    setPageNo(1);
    setData([]);
  }, [params.explore]);

  useEffect(() => {
    if (!params.explore) return;
    fetchData();
  }, [fetchData, params.explore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="py-16">
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl font-semibold my-3">
          Popular {params.explore} show
        </h3>

        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
          {data.map((exploreData) => (
            <Card
              data={exploreData}
              key={exploreData.id + "exploreSEction"}
              media_type={params.explore}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
