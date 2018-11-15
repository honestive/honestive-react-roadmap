import React, { Fragment } from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider, Query } from 'react-apollo'
import gql from 'graphql-tag'
import {
  Text,
  Container,
  Button,
  CandourProvider,
  Link,
} from 'candour'
import candourTheme from './theme/candour'

const query = gql`
  {
    releases {
      id
      version
      url
    }
  }
`

const isLast = (releases, id) => _.last(releases).id === id

const DefaultPoint = (props) => (
  <Button
    component='a'
    target='_blank'
    borderRadius='9999px'
    whiteSpace='nowrap'
    {...props}
  />
)

const DefaultLine = (props) => (
  <Container width={1.5} height='1px' backgroundColor='#000' />
)

export default ({
  last = 5,
  endpoint = 'http://localhost:4000',
  components,
  ...props,
}) => (
  <CandourProvider {...props}>
    <ApolloProvider client={new ApolloClient({ uri: endpoint })}>
      <Query query={query}>
        {({ loading, error, data }) => {
          if (error) return <p>Error :(</p>

          const {
            releases,
          } = data || { releases: _.map(_.times(last), (id) => { id }) }

          const {
            Point,
            Line,
          } = _.defaultsDeep(components, { Point: DefaultPoint, Line: DefaultLine })

          return (
            <Fragment>
              <Container displayFlex paddingBottom width='100%'>
                {_.takeRight(releases, last).map((release, i) => (
                  <Container key={release.id} displayFlex alignItemsCenter>
                    <Point href={release.url} {...release}>
                      {release.version}
                    </Point>
                    <Line />
                  </Container>
                ))}
                <Container displayFlex alignItemsCenter width='100%'>
                  <Point href='/future'>
                    ···
                  </Point>
                  <Line width='100%' />
                </Container>
              </Container>
              <Text marginLeftAuto textAlignRight level={8}>
                <Link
                  component='a'
                  href='https://honestive.com'
                  target='_blank'
                  level={8}
                >
                  ■ Honestive
                </Link>
              </Text>
            </Fragment>
          )
        }}
      </Query>
    </ApolloProvider>
  </CandourProvider>
)
