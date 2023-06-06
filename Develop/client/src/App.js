import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {setContext} from '@apollo/client/link/context';


import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink(
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

 const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  
function App() {
  return (
    <ApolloProvider client={client}>  //to set the context of Apollo Client to include the token with every request
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
