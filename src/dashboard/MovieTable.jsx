"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { movieService } from "../services/movieService"
import DeleteModal from "../components/DeleteModal"

export default function MovieTable() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    movieId: null,
    movieTitle: "",
  })

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    try {
      const data = await movieService.getAllMovies()
      setMovies(data)
    } catch (error) {
      console.error("Failed to fetch movies", error)
    } finally {
      setLoading(false)
    }
  }

  const openDeleteModal = (id, title) => {
    setDeleteModal({
      isOpen: true,
      movieId: id,
      movieTitle: title,
    })
  }

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      movieId: null,
      movieTitle: "",
    })
  }

  const handleDeleteConfirm = async () => {
    try {
      await movieService.deleteMovie(deleteModal.movieId)

      // ✅ Update UI instantly
      setMovies((prev) =>
        prev.filter((movie) => movie.id !== deleteModal.movieId)
      )

      closeDeleteModal()
    } catch (error) {
      alert("Failed to delete movie")
      console.error(error)
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Loading movies...
      </div>
    )
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary">
            <tr>
              <th className="px-6 py-4 text-left">Movie</th>
              <th className="px-6 py-4 text-left">Genre</th>
              <th className="px-6 py-4 text-left">Rating</th>
              <th className="px-6 py-4 text-left">Year</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {movies.map((movie) => (
              <tr key={movie.id} className="hover:bg-secondary/50 transition">
                <td className="px-6 py-4 font-medium">
                  {movie.title}
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                  {movie.genre || "-"}
                </td>
                <td className="px-6 py-4">
                  ⭐ {movie.rating}
                </td>
                <td className="px-6 py-4">
                  {movie.year}
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <Link
                    to={`/dashboard/edit/${movie.id}`}
                    className="btn-animated px-4 py-2 text-sm"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      openDeleteModal(movie.id, movie.title)
                    }
                    className="btn-animated btn-secondary px-4 py-2 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {movies.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-muted-foreground"
                >
                  No movies found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        movieTitle={deleteModal.movieTitle}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
      />
    </>
  )
}
