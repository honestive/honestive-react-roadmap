import ApolloClient from 'apollo-boost'

export default (uri) => (
  new ApolloClient({ uri })
)
