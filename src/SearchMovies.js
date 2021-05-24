import React, {useState} from "react"

const apiKey = "de4201227d99b79845d7761f232ce6b8"

export default function SearchMovies() {
    const [query, setQuery] = useState("")
    const [movies, setMovies] = useState([])

    
    const searchMovies = async (e) => {
        e.preventDefault()
        const searchMovieURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`
        
        try {
            const res = await fetch(searchMovieURL)
            const data = await res.json()
            setMovies(data.results)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="container">
            <form onSubmit={searchMovies}>
                <input 
                    type="text" 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)}
                    />
                <button className="button">Search Movie</button>
            </form>

            <div className="movie-cards">
                {movies.map(movie => 
                    <div className="card">
                        <h2>{movie.title}</h2>
                        <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}></img>
                        <p>{movie.release_date}</p>
                        <p>{movie.overview}</p>
                    </div>
                )}
            </div>
        </div>
    )
}