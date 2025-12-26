"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { movieService } from "../services/movieService"
import { useWishlist } from "../context/WishlistContext"

export default function MovieDetails() {
  const { id } = useParams()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await movieService.getMovieById(id)
        setMovie(data)
      } catch (error) {
        console.error("Error fetching movie:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchMovie()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center text-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Movie Not Found</h2>
          <Link to="/movies" className="text-primary hover:underline">
            Back to Movies
          </Link>
        </div>
      </div>
    )
  }

  const inWishlist = isInWishlist(movie.id)

  return (
    <div className="min-h-screen pt-16">
      <div className="relative h-[500px] overflow-hidden">
        <img
          src={movie.backdrop || movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      <div className="relative -mt-40 z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-8">
          <img
            src={movie.poster}
            alt={movie.title}
            className="rounded-xl shadow-2xl border border-border"
          />

          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="text-primary font-semibold text-lg">
                ⭐ {movie.rating}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{movie.year}</span>
              <span className="text-muted-foreground">•</span>
              <span className="px-3 py-1 bg-secondary rounded-full text-sm">
                {movie.genre}
              </span>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {movie.description}
            </p>

            <div className="flex gap-4">
              <button className="btn-animated">▶ Watch Now</button>

              <button
                onClick={() =>
                  inWishlist
                    ? removeFromWishlist(movie.id)
                    : addToWishlist(movie)
                }
                className={`btn-animated ${
                  inWishlist ? "btn-secondary" : ""
                }`}
              >
                {inWishlist ? "✓ In Wishlist" : "+ Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
