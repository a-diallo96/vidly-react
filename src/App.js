
import { ToastContainer } from 'react-toastify';
import Movies from './components/moviesComponent';
import {  Route, Routes, Navigate } from 'react-router-dom';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import React, { Component } from 'react';
import NavBar from './components/navBar';
import LoginForm from './components/loginForm';
import RegisterForm from './components/RegisterForm';
import NewMovieForm from './components/newMovieForm';
import auth from './services/authService';
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Logout from './components/logout';
import ProtectedRoute from './components/common/protectedRoute';

class  App extends React.Component {
  state = {};


  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render () {
    const {user} = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user}/> 
        <main className="container">   
      <Routes>
         <Route path ="/login" element={<LoginForm />}></Route>
         <Route path ="/logout" element={<Logout />}></Route>
         <Route path ="/register" element={<RegisterForm />}></Route>

         <Route path ="/movie/:id" element={ <ProtectedRoute  />} >
          <Route path="/movie/:id" element={<NewMovieForm />} />
         </Route>

         {/*<Route path ="/movie/:id" element={ user ? <NewMovieForm />: <Navigate replace to="/login" />} ></Route>*/}
         <Route path ="/movies" element={<Movies user ={this.state.user}/>}></Route>
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
  
}


export default App;
