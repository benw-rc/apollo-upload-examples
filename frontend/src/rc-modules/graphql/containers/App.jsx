import React from 'react';
import { ApolloClient } from 'apollo-client'
import { createUploadLink } from 'apollo-upload-client'
import { ApolloProvider } from 'react-apollo'

const apollo_client = new ApolloClient({
  link: createUploadLink({ uri: process.env.REACT_APP_API_URI })
})

export const CustomApp = () => (
  <ApolloProvider client={apollo_client}>
    { this.props.children }
  </ApolloProvider>
);

export default CustomApp;
