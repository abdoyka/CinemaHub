import { createContext, useContext, useEffect, useState } from "react"

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem("wishlist")
    if (stored) setWishlist(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
  }, [wishlist])

  const addToWishlist = (movie) => {
    if (wishlist.find((m) => m.id === movie.id)) return
    setWishlist((prev) => [...prev, movie])
  }

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((m) => m.id !== id))
  }

  const isInWishlist = (id) => {
    return wishlist.some((m) => m.id === id)
  }

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
