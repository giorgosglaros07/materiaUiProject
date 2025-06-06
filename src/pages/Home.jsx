import MovieCard from "../components/MovieCard"
import { useState,useEffect } from "react";
import "../css/Home.css"
import { SearchMovies,getPopularMovies } from "../services/api";
import { useMovieContext } from "../contexts/MovieContext"
function Home() {

    const [searchQuery, setSearchQuery] = useState("")
    const[movies,setMovies] = useState([]);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(true);
 
    useEffect(() => {
        const loadPopoularMovies = async () =>{
            
            try{
                const popularMovies = await getPopularMovies()   
                setMovies(popularMovies)
                console.log(popularMovies)
            } catch (err) {
                console.log(err)
                setError("Failed to laod movies...")
            }
            finally {
                setLoading(false)
            }
        }
        loadPopoularMovies()
    },[])

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return
        if (loading) return
    
        setLoading(true)
        try {
            const searchResults = await SearchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch (err) {
            console.log(err)
            setError("Failed to search movies...")
        } finally {
            setLoading(false)
        }
      };
    
    return (
        <div className="Home">
            <form onSubmit={handleSearch} className="search-form">
                <input type="text"
                    placeholder="search for movies.."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>
            {error && <div className="error-message">{error}</div>}

{loading ? (
  <div className="loading">Loading...</div>
) : (
  <div className="movies-grid">
    {movies.map((movie) => (
      <MovieCard movie={movie} key={movie.id} />
    ))}
  </div>
)}
</div>
);
}
export default Home