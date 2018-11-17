import gql from 'graphql-tag'

export default gql`
  query ReleasesQuery($last: Int!) {
    releases(last: $last) {
      id
      version
      url
    }
  }
`
