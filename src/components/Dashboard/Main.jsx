// import React, { useState } from 'react';
// import Login from './Login';
// import Products from './Allproducts';
// import useToken from '../UseToken';

// function setToken(userToken) {
//     sessionStorage.setItem('token', JSON.stringify(userToken));
// }

// function getToken() {
//     const tokenString = sessionStorage.getItem('token');
//     const userToken = JSON.parse(tokenString);
//     return userToken?.token
// }

// function Main() {
//   // const { token, setToken } = useToken();
//   // const [ token, setToken ] = React.useState();

//   if(!token) {
//     return <Login setToken={setToken} />
//   }

//   return (
//     <div>
//         <Products />
//     </div>
//   );
// }

// export default Main;