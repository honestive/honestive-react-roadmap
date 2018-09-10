import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider, Query } from 'react-apollo'
import gql from 'graphql-tag'
import {
  Text,
  Container,
  Button,
  CandourProvider,
} from 'candour'
import candourTheme from './theme/candour'

const query = gql`
  {
    releases {
      id
      version
    }
  }
`

const isLast = (releases, id) => _.last(releases).id === id

export default ({
  last = 5,
  endpoint = 'http://localhost:4000',
}) => (
  <CandourProvider theme={candourTheme}>
    <ApolloProvider client={new ApolloClient({ uri: endpoint })}>
      <Query query={query}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error :(</p>

          const {
            releases,
          } = data

          return (
            <Container displayFlex paddingBottom>
              {_.takeRight(releases, last).map(({ id, version }, i) => (
                <Container displayFlex alignItemsCenter width={isLast(releases, id) ? '100%' : 'initial'}>
                  <Container
                    key={id}
                    style={styles.dot.container}
                    padding
                    paddingTop={0.5}
                    paddingBottom={0.5}
                  >
                    <Text fontWeightBold whiteSpace='nowrap'>
                      {version}
                    </Text>
                  </Container>
                  <Container width={isLast(releases, id) ? '100%' : 1.5} height='2px' backgroundColor='#000' />
                </Container>
              ))}
            </Container>
          )
        }}
      </Query>
    </ApolloProvider>
    <Container displayFlex alignItems='flex-end' justifyContentSpaceBetween paddingTop={2}>
      <Button
        component='a'
        href='http://github.com'
        backgroundColor='transparent'
        color='#2765EF'
        border='2px solid #2765EF'
        width='inherit'
        height='40px'
        fontWeight={450}
      >
        View on GitHub
      </Button>
      <Text textAlignRight paddingTop>
        ⚡️ by <Text
          component='a'
          href='https://honestive.com'
          target='_blank'
          style={styles.link}
          color='#2765EF'
        >
          Honestive
        </Text>
      </Text>
    </Container>
  </CandourProvider>
)

const styles = {
  dot: {
    container: {
      border: '2px solid #000',
      borderRadius: '9999px',
    },
  },
}
