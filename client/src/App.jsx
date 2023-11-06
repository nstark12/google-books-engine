import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client'
import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Auth from './utils/auth'

const httpLink = createHttpLink({
  uri: '/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = Auth.getToken()
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
