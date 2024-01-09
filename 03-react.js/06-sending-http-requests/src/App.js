import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

async function getJSON(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error("Something went wrong");

    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
}

function App() {
  const [moviesList, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setErrorMsg] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      const loadedMovies = [];

      // Fetch my stored movies data on firebase
      const MyMoviesData = await getJSON(
        "https://http-react-50688-default-rtdb.firebaseio.com/movies.json"
      );
      for (const key in MyMoviesData) {
        loadedMovies.push({
          id: key,
          ...MyMoviesData[key],
        });
      }

      // Fetch Star Wars movies data from API => (" https://swapi.dev/films/")
      const StarWarsMoviesData = await getJSON("https://swapi.dev/api/films/");
      StarWarsMoviesData.results.forEach((movieData) => {
        loadedMovies.push({
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        });
      });

      setMovies(loadedMovies);
    } catch (err) {
      setErrorMsg(err.message);
    }
    setIsLoading(false);
  }, []);

  async function addMovieHandler(movie) {
    const response = await fetch(
      "https://http-react-50688-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: { "Content-Type": "application/json" },
      }
    );

    const responseData = await response.json();
    console.log(responseData);
  }

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let content;
  if (isLoading) {
    content = <p>loading...</p>;
  }
  if (!isLoading && moviesList.length === 0) {
    content = <p>No movies Found!</p>;
  }
  if (!isLoading && error) {
    content = <p>{error}</p>;
  }
  if (!isLoading && moviesList.length > 0) {
    content = <MoviesList movies={moviesList} />;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
