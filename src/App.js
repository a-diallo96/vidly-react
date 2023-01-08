
import Movies from './components/moviesComponent';
import {  Route, Routes, Navigate } from 'react-router-dom';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import React, { Component } from 'react';
import NavBar from './components/navBar';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/RegisterForm';
import NewMovieForm from './components/newMovieForm';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.css';

const App =  () => {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar /> 
        <main className="container">   
      <Routes>
         <Route path ="/login" element={<LoginForm />}></Route>
         <Route path ="/register" element={<RegisterForm />}></Route>
         <Route path ="/movie/:id" element={<NewMovieForm />}></Route>
         <Route path ="/movies" element={<Movies />}></Route>
         <Route path ="/customers" element={<Customers />}></Route>
         <Route path ="/rentals" element={<Rentals />}></Route>
         <Route path ="/not-found" element={<NotFound />}></Route>
         <Route path="/" element={<Navigate replace to="/movies" />} />
         <Route path="*" element={<Navigate replace to="/not-Found" />} />
      </Routes>
      </main>
      </React.Fragment>
      
     );
  }
  


export default App;
