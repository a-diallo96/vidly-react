import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { getGenres } from '../services/genreService';
import { getMovie, saveMovie } from '../services/movieService';
import { withRouter } from './common/withRouter';


class NewMovieForm extends Form {
    state = {  
        data: {
            title: "",
            genreId: "",
            numberInStock: "",
            dailyRentalRate: ""
        },
        genres: [],
        errors: { }
    } ;
    schema = {
        title: Joi.string().required().label("Title"),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().min(0).max(100).label('number In Stock').required(),
        dailyRentalRate: Joi.number().required().label("Daily Rental Rate").min(0).max(10)
    };

    async componentDidMount() {
        const { data:genres } = await getGenres();
        this.setState({genres});
        
        
        const movieId = this.props.router.params.id;
        if(movieId === "new") return;

        const {data: movie} = await getMovie(movieId);

         
        if(!movie) {
            const {navigate} =this.props.router;
            navigate("/not-found");
        }
         this.setState({data: this.mapToViewModel(movie)});  
       
    }

    mapToViewModel(movie) {
        return  {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        };
    }

    async doSubmit(){

        await saveMovie(this.state.data);
        const {navigate} =this.props.router;
        navigate("/movies");

    }
    render() { 
        return (
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                {this.renderInput("title","Title")}
                {this.renderSelect('genreId',"Genre",this.state.genres)}
                {this.renderInput("numberInStock","Number in stock")}
                {this.renderInput("dailyRentalRate","Rate")}
                {this.renderButton("Save")}
                </form>
            </div>
        );
    }
}
 



    export default withRouter(NewMovieForm);