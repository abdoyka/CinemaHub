"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import MovieTable from "./MovieTable"
import { movieService } from "../services/movieService"

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalMovies: 0,
    totalViews: 0,
    totalUsers: 1250,
  })

  useEffect(() => {
    const fetchStats = async () => {
      const movies = await movieService.getAllMovies()
      setStats({
        totalMovies: movies.length,
        totalViews: movies.reduce((acc, m) => acc + (m.views || 0), 0),
        totalUsers: 1250,
      })
    }
    fetchStats()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background pt-16"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Manage movies and content</p>
          </div>

          <Link
  to="/dashboard/add"
  className="btn-animated inline-flex items-center justify-center"
>
  Add Movie
</Link>

        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Stat title="Total Movies" value={stats.totalMovies} />
          <Stat title="Total Views" value={stats.totalViews} />
          <Stat title="Users" value={stats.totalUsers} />
        </div>

        <div className="bg-card border border-border rounded-xl">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold">All Movies</h2>
          </div>
          <MovieTable />
        </div>
      </div>
    </motion.div>
  )
}

function Stat({ title, value }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-3xl font-bold mb-1">{value}</h3>
      <p className="text-muted-foreground">{title}</p>
    </div>
  )
}
