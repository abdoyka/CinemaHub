import { Link } from "react-router-dom"

export default function MovieCard({ movie }) {
  return (
    <Link
      to={`/movies/${movie.id}`}
      className="group relative overflow-hidden rounded-xl bg-card border border-border transition-all hover:scale-105 hover:border-primary/50"
    >
      <div className="aspect-[2/3] overflow-hidden bg-muted">
        <img
          src={movie.poster || `/placeholder.svg?height=600&width=400&query=movie+poster+${movie.title}`}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm text-primary font-medium">
            {movie.rating || "8.5"}
          </span>
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2">
          {movie.description || "A short movie description appears on hover"}
        </p>
      </div>

\      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {movie.year || "2024"}
          </span>
          <span className="text-xs text-muted-foreground">
            {movie.genre || "Drama"}
          </span>
        </div>
      </div>
    </Link>
  )
}
