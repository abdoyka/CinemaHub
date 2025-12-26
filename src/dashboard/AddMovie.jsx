import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { movieService } from "../services/movieService"

export default function AddMovie() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    year: "",
    rating: "",
    poster: "",
  })

  const [preview, setPreview] = useState(null)
  const [dragActive, setDragActive] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)

    const file = e.dataTransfer.files[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("Please drop an image file")
      return
    }

    setPreview(URL.createObjectURL(file))

    setFormData((prev) => ({
      ...prev,
      poster: `/images/${file.name}`,
    }))
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setPreview(URL.createObjectURL(file))
    setFormData((prev) => ({
      ...prev,
      poster: `/images/${file.name}`,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await movieService.add(formData)
      navigate("/dashboard")
    } catch (error) {
      alert("Failed to add movie")
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-black pt-24 px-4">
      <div className="max-w-3xl mx-auto bg-card border border-border rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-2">Add New Film</h2>
        <p className="text-muted-foreground mb-8">
          Drag and drop or select a poster
        </p>

        <form onSubmit={handleSubmit} className="grid gap-6">
          <input
            name="title"
            placeholder="Movie Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="bg-input border border-border rounded-lg px-4 py-3 text-foreground focus:ring-2 focus:ring-primary"
          />

          <div
            onDragOver={(e) => {
              e.preventDefault()
              setDragActive(true)
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-xl p-6 text-center transition
              ${
                dragActive
                  ? "border-primary bg-primary/10"
                  : "border-border"
              }`}
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="mx-auto max-h-64 rounded-lg"
              />
            ) : (
              <div className="text-muted-foreground">
                <p className="mb-2"> Drag and drop poster here</p>
                <p className="text-sm">Or click to select</p>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              name="genre"
              placeholder="Genre (Comedy, Drama...)"
              value={formData.genre}
              onChange={handleChange}
              className="bg-input border border-border rounded-lg px-4 py-3 text-foreground"
            />

            <input
              name="year"
              placeholder="Release Year"
              value={formData.year}
              onChange={handleChange}
              className="bg-input border border-border rounded-lg px-4 py-3 text-foreground"
            />

            <input
              name="rating"
              placeholder="Rating (e.g., 8.5)"
              value={formData.rating}
              onChange={handleChange}
              className="bg-input border border-border rounded-lg px-4 py-3 text-foreground"
            />
          </div>

          <textarea
            name="description"
            placeholder="Movie Description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="bg-input border border-border rounded-lg px-4 py-3 text-foreground resize-none"
          />

          <div className="flex gap-4 mt-6">
            <button type="submit" className="btn-animated">
              Add Movie
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="btn-animated btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
