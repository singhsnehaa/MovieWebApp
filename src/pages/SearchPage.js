import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../components/Card";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const query = new URLSearchParams(location.search).get("q") ?? "";

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("/search/multi", {
        params: {
          query,
          page,
        },
      });

      setData((prev) =>
        page === 1
          ? response.data.results
          : [...prev, ...response.data.results],
      );
    } catch (error) {
      console.log("error from Search Page", error);
    }
  }, [query, page]);

  useEffect(() => {
    if (!query) return;
    setPage(1);
    setData([]);
  }, [query]);

  useEffect(() => {
    if (!query) return;
    fetchData();
  }, [fetchData, query]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="py-16">
      <div className="lg:hidden my-2 mx-1 sticky top-[70px] z-30">
        <input
          type="text"
          placeholder="Search here..."
          value={query}
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          className="px-4 py-1 rounded-full text-lg w-full bg-white text-neutral-900"
        />
      </div>
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl font-semibold my-3">
          Search Results
        </h3>

        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
          {data.map((searchData) => (
            <Card
              data={searchData}
              key={searchData.id + "search"}
              media_type={searchData.media_type}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
