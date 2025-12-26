export default function MovieSkeleton() {
  return (
    <div className="animate-pulse rounded-xl overflow-hidden bg-card border border-border">
      <div className="aspect-[2/3] bg-muted" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-1/2" />
      </div>
    </div>
  )
}
