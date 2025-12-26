import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { movieService } from "../services/movieService"
import MovieCard from "../components/MovieCard"
import MovieSkeleton from "../components/MovieSkeleton"

import { Film, Star, Flame, Clock } from "lucide-react"

export default function Home() {
  const [allMovies, setAllMovies] = useState([])
  const [filtered, setFiltered] = useState([])
  const [genre, setGenre] = useState("All") 
  const [sort, setSort] = useState("default")
  const [loading, setLoading] = useState(true)
  const [bannerIndex, setBannerIndex] = useState(0)

  useEffect(() => {
    movieService.getAllMovies().then((data) => {
      setAllMovies(data)
      setFiltered(data)
      setLoading(false)
    })
  }, [])

  const topRatedMovies = allMovies.filter(
    (m) => Number(m.rating) >= 8
  )

  const bannerMovies = [...allMovies]

  useEffect(() => {
    if (bannerMovies.length === 0) return

    const interval = setInterval(() => {
      setBannerIndex((prev) =>
        prev === bannerMovies.length - 1 ? 0 : prev + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [bannerMovies.length])

  const genres = [
    "All",
    ...new Set(allMovies.map((m) => m.genre).filter(Boolean)),
  ]

  useEffect(() => {
    let result =
      genre === "All"
        ? [...allMovies]
        : allMovies.filter((m) => m.genre === genre)

    if (sort === "rating-desc") {
      result.sort((a, b) => Number(b.rating) - Number(a.rating))
    }

    if (sort === "rating-asc") {
      result.sort((a, b) => Number(a.rating) - Number(b.rating))
    }

    setFiltered(result)
  }, [genre, sort, allMovies])

  const trending = allMovies.filter(
    (m) => Number(m.rating) === 10
  )

  const latest = allMovies.filter(
    (m) => Number(m.year) > 2020
  )

  return (
    <div className="pt-16">
      {!loading && bannerMovies.length > 0 && (
        <section
          className="relative h-[75vh] flex items-end transition-all duration-700"
          style={{
            backgroundImage: `url(${bannerMovies[bannerIndex].poster})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative max-w-7xl mx-auto px-6 pb-20">
            <h1 className="text-5xl font-extrabold mb-4">
              {bannerMovies[bannerIndex].title}
            </h1>
            <p className="max-w-xl text-muted-foreground mb-6 line-clamp-3">
              {bannerMovies[bannerIndex].description}
            </p>
            <Link
              to={`/movies/${bannerMovies[bannerIndex].id}`}
              className="btn-animated"
            >
              Watch Details
            </Link>
          </div>
        </section>
      )}

      <section className="py-10 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-6 items-center justify-between">
          <div className="flex gap-3 flex-wrap">
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setGenre(g)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition
                  ${
                    genre === g
                      ? "bg-primary text-black"
                      : "bg-secondary text-muted-foreground hover:bg-muted"
                  }`}
              >
                {g}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground font-medium">
              Sort by rating:
            </span>

            <button
              onClick={() => setSort("rating-desc")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition
                ${
                  sort === "rating-desc"
                    ? "bg-primary text-black"
                    : "bg-secondary text-muted-foreground hover:bg-muted"
                }`}
            >
              ↑ Highest
            </button>

            <button
              onClick={() => setSort("rating-asc")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition
                ${
                  sort === "rating-asc"
                    ? "bg-primary text-black"
                    : "bg-secondary text-muted-foreground hover:bg-muted"
                }`}
            >
              ↓ Lowest
            </button>
          </div>
        </div>
      </section>

      <Section
        icon={<Film className="w-6 h-6 text-primary" />}
        title="All Movies"
        loading={loading}
        movies={filtered}
      />

      <Section
        icon={<Star className="w-6 h-6 text-primary" />}
        title="Top Rated Movies"
        loading={loading}
        movies={topRatedMovies}
      />

      <Section
        icon={<Flame className="w-6 h-6 text-primary" />}
        title="Trending Now"
        loading={loading}
        movies={trending}
      />

      <Section
        icon={<Clock className="w-6 h-6 text-primary" />}
        title="Latest Releases"
        loading={loading}
        movies={latest}
      />

      <section className="py-20 text-center border-t border-border">
        <h3 className="text-3xl font-bold mb-4">
          Want to manage the platform?
        </h3>
        <p className="text-muted-foreground mb-8">
          Login as admin to add, edit, or delete movies.
        </p>
        <Link to="/login" className="btn-secondary">
          Admin Login
        </Link>
      </section>
    </div>
  )
}

function Section({ title, icon, movies, loading }) {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="flex items-center gap-3 text-3xl font-bold mb-8">
          {icon}
          {title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <MovieSkeleton key={i} />
              ))
            : movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
        </div>
      </div>
    </section>
  )
}
