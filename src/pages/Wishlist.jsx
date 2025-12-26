import { useWishlist } from "../context/WishlistContext"
import MovieCard from "../components/MovieCard"

export default function Wishlist() {
  const { wishlist } = useWishlist()

  return (
    <div className="pt-24 max-w-7xl mx-auto px-6">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-muted-foreground">
          Your wishlist is empty.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}
