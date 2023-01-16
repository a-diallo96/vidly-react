import React, {Component} from "react";
import Pagination from "./common/pagination.jsx";
import { paginate } from "../utils/paginate.js";
import ListGroup from "./common/listGroupe.jsx";
import {getMovies, deleteMovie} from '../services/movieService.js';
import { getGenres } from "../services/genreService.js";
import MoviesTable from "./moviesTable.jsx";
import {NavigateButton} from './common/withRouter';
import Search from "./common/search.jsx";
import _ from "lodash";
import { toast } from 'react-toastify';


class Movies extends Component {

    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        searchQuery: "",
        selectedGenre: null,
        pageSize:4,
        sortColumn: {path: "title", order: "asc"}
    };

    handleDelete = async (movie) => {
        const originalMovies = this.state.movies;
       const  movies = originalMovies.filter(m => m._id !== movie._id);
       this.setState({movies});
       try{
           await deleteMovie(movie)
       }
       catch(ex) {
        if(ex.response && ex.response.status===404)
            toast.error("this movie has already been  deleted");
            this.setState({movies: originalMovies});
       }

    }

    handleLike = (m) => {
        const movies = [...this.state.movies];
        //const index = movies.indexOf(m);
       // const movie = { ...movies[index] };
        //movies[index].liked = !movie.liked;
        m.liked = !m.liked;
       // console.log(this.state.movies);
        this.setState({movies});
     }
    
    handlePageChange = (page) => {
        this.setState({currentPage: page});
    }

    handleGenreSelect = (genre) => {
        this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1});
    }

    handleSearch = query => {
        this.setState({searchQuery: query, selectedGenre: null, currentPage: 1});
    }

    handleSort = (sortColumn) => {
        this.setState({sortColumn});
    }

    async componentDidMount() {
        const {data} = await getGenres();
        const genres = [{ _id: "", name: 'All Genres'}, ...data];
        
        const {data: movies} = await getMovies();

        this.setState({movies, genres});
    }

    getPagedData = () => {
        const { 
            pageSize,
            currentPage,
            searchQuery,
            selectedGenre, 
            movies: allMovies, 
            sortColumn 
        } = this.state;

        let filtered = allMovies;
        if(searchQuery) {
            filtered = allMovies.filter(m =>
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
                );
        }
        else if( selectedGenre && selectedGenre._id ) {
            filtered = allMovies.filter(m => m.genre._id===selectedGenre._id)
        }
       /*  const filtered = selectedGenre && selectedGenre._id
            ? allMovies.filter(m => selectedGenre._id === m.genre._id): allMovies;
         */
        const sortered = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sortered, currentPage, pageSize);
        return {totalCount: filtered.length, data:movies};
    }

    render() {
        const { length: count } = this.state.movies;
        const { pageSize, currentPage,  sortColumn ,searchQuery} = this.state;
        const {user} = this.props;

        if(count === 0) return <p>There are no movies in the database</p>

        const {totalCount, data:movies} = this.getPagedData();
       
        
        return(
            <div className="row">
                <div className="col-2">
                    <ListGroup 
                    items={this.state.genres}
                    selectedItem={this.state.selectedGenre}
                    onItemSelect={this.handleGenreSelect}
                    />
                </div>
                <div className="col">
                    {user && <NavigateButton  buttonTitle="New Movie" route="/movie/new" isReplaced="true" />}
                    <p>Showing {totalCount} in the database</p>
                   <Search  value={searchQuery} onChange={this.handleSearch}/>
                    <MoviesTable 
                    movies={movies}
                    sortColumn={sortColumn}
                    onLike={this.handleLike}
                    onDelete={this.handleDelete}
                    onSort={this.handleSort}
                    />
                    <Pagination
                    itemsCount={totalCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                    />
                </div>
            </div>
        );
    }

}


export default Movies;
