import React from 'react';
import { createRoot } from 'react-dom/client';

import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import ApolloClientProvider from './ApolloProvider';

import App from './App';
import './index.css';

const root = createRoot(
  document.getElementById('root')
);

root.render(
  <React.StrictMode>
    <ApolloClientProvider>
      <BrowserRouter>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </ApolloClientProvider>
  </React.StrictMode>
);