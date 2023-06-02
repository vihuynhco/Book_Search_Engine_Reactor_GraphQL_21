import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
//to set the context of Apollo Client to include the token with every request
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

const Client = new ApolloClient(
  {
    uri: '/graphql',
    cache: new InMemoryCache(),
  }
);

  
const authLink = setContext((_, {headers}) => {
const token = localStorage.getItem('id_token');
return {
headers: {
      ...headers,
       authorization: token ? `Bearer ${token}` : '',
    }
   }
 });

 


function App() {
  return (
    <ApolloProvider client={Client}>  //to set the context of Apollo Client to include the token with every request
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route 
            path='/' 
            element={<SearchBooks />} 
          />
          <Route 
            path='/saved' 
            element={<SavedBooks />} 
          />
          <Route 
            path='*'
            element={<h1 className='display-2'>Wrong page!</h1>}
          />
        </Routes>
      </>
    </Router>
    </ApolloProvider>  //to set the context of Apollo Client to include the token with every request
  );
}

export default App;
