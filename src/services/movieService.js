// Mock movie data
const mockMovies = [
  {
    id: "1",
    title: "Inception",
    description: "فيلم خيال علمي مثير عن أحلام داخل أحلام وعمليات سرقة معقدة عبر العقل الباطن",
    genre: "خيال علمي",
    year: 2010,
    rating: 8.8,
    director: "كريستوفر نولان",
    duration: "148 دقيقة",
    language: "الإنجليزية",
    country: "الولايات المتحدة",
    poster: "/images/inception.jpg",
    views: 15420,
  },
  {
    id: "2",
    title: "The Dark Knight",
    description: "يواجه باتمان أكبر تحدياته النفسية عندما يهدد الجوكر مدينة جوثام بالفوضى",
    genre: "أكشن",
    year: 2008,
    rating: 9.0,
    director: "كريستوفر نولان",
    duration: "152 دقيقة",
    language: "الإنجليزية",
    country: "الولايات المتحدة",
    poster: "/images/dark-knight.jpg",
    views: 18750,
  },
  {
    id: "3",
    title: "Interstellar",
    description: "رحلة ملحمية عبر الزمان والمكان لإنقاذ البشرية من الانقراض",
    genre: "خيال علمي",
    year: 2014,
    rating: 8.6,
    director: "كريستوفر نولان",
    duration: "169 دقيقة",
    language: "الإنجليزية",
    country: "الولايات المتحدة",
    poster: "/images/interstellar.jpg",
    views: 12890,
  },
  {
    id: "4",
    title: "The Shawshank Redemption",
    description: "قصة مؤثرة عن الأمل والصداقة في أحلك الظروف داخل السجن",
    genre: "دراما",
    year: 1994,
    rating: 9.3,
    director: "فرانك دارابونت",
    duration: "142 دقيقة",
    language: "الإنجليزية",
    country: "الولايات المتحدة",
    poster: "/images/shawshank.jpg",
    views: 22100,
  },
  {
    id: "5",
    title: "Pulp Fiction",
    description: "حكايات متشابكة من عالم الجريمة في لوس أنجلوس",
    genre: "دراما",
    year: 1994,
    rating: 8.9,
    director: "كوينتن تارانتينو",
    duration: "154 دقيقة",
    language: "الإنجليزية",
    country: "الولايات المتحدة",
    poster: "/images/pulp-fiction.jpg",
    views: 14560,
  },
  {
    id: "6",
    title: "The Matrix",
    description: "مبرمج كمبيوتر يكتشف أن الواقع الذي يعيشه ليس حقيقياً",
    genre: "خيال علمي",
    year: 1999,
    rating: 8.7,
    director: "الأخوان واتشوسكي",
    duration: "136 دقيقة",
    language: "الإنجليزية",
    country: "الولايات المتحدة",
    poster: "/images/matrix.jpg",
    views: 19320,
  },
];

const API_URL = "http://localhost:5000/movies";

async function handleJson(res) {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const movieService = {
  
  getAll: async () => {
    const res = await fetch(API_URL);
    return handleJson(res);
  },

  getById: async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    return handleJson(res);
  },

  add: async (movie) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie),
    });
    return handleJson(res);
  },

  update: async (id, movie) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie),
    });
    return handleJson(res);
  },

  remove: async (id) => {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    // json-server بيرجع {} غالبًا
    if (!res.ok) throw new Error("Failed to delete movie");
    return true;
  },

  
  getAllMovies: async () => {
    return movieService.getAll();
  },

  getMovieById: async (id) => {
    return movieService.getById(id);
  },

  addMovie: async (movie) => {
    return movieService.add(movie);
  },

  updateMovie: async (id, movie) => {
    return movieService.update(id, movie);
  },

  deleteMovie: async (id) => {
    return movieService.remove(id);
  },

  mockMovies,
};
