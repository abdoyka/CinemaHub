import { useEffect, useState } from "react"
import { movieService } from "../services/movieService"
import MovieCard from "../components/MovieCard"

export default function Movies() {
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState("")
  const [genre, setGenre] = useState("All")

  useEffect(() => {
    movieService.getAllMovies().then(setMovies)
  }, [])

  const genres = [
    "All",
    ...new Set(movies.map((m) => m.genre).filter(Boolean)),
  ]

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesGenre =
      genre === "All" || movie.genre === genre

    return matchesSearch && matchesGenre
  })

  return (
    <div className="pt-24 max-w-7xl mx-auto px-6">
      <h1 className="text-3xl font-bold mb-8">All Movies</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <input
          type="text"
          placeholder="Search by movie title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full sm:w-1/2
            bg-secondary border border-border
            rounded-lg px-4 py-3
            text-foreground
            focus:outline-none focus:ring-2 focus:ring-primary
          "
        />

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="
            w-full sm:w-1/4
            bg-secondary border border-border
            rounded-lg px-4 py-3
            text-foreground
            focus:outline-none focus:ring-2 focus:ring-primary
          "
        >
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {filteredMovies.length === 0 && (
        <p className="text-center text-muted-foreground mt-12">
          No movies found.
        </p>
      )}
    </div>
  )
}
