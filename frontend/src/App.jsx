import { Suspense } from 'react';
import { useStore } from './store/user';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container, Flex, Spinner } from '@chakra-ui/react';
// pages
import Post from './pages/Post';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
// components
import Navbar from './components/Navbar';

export default function App() {
  const { user } = useStore();

  return (
    <div className='App'>
      <Container maxW='container.xl'>
        <Flex>
          <Navbar />
          <Container maxW='container.lg' marginTop={10}>
            <Routes>
              <Route
                path='/'
                element={
                  <Suspense fallback={<Spinner colorScheme='whiteAlpha' />}>
                    <Home />
                  </Suspense>
                }
              />
              <Route
                path='/login'
                element={user ? <Navigate to='/' /> : <Login />}
              />
              <Route
                path='/register'
                element={user ? <Navigate to='/' /> : <Register />}
              />
              <Route
                path='/post/:id'
                element={<Post />} />
            </Routes>
          </Container>
        </Flex>
      </Container>
    </div>
  );
}