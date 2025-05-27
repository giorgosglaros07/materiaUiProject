


const API_KEY = "4e144f047119d064f5579636c123dfba";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const data = await response.json();
        return data.results 
    } catch (error) {
        console.error("Error fetching popular movies:", error);
        return [];
    }
};

export const SearchMovies = async (query) => {
    try {
        const response = await fetch(
            `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        );
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        return data.results || []; 
    } catch (error) {
        console.error("Error searching movies:", error);
        return [];
    }
};
