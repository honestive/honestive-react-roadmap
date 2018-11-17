import React, { Fragment } from 'react'
import { ApolloProvider, Query } from 'react-apollo'
import gql from 'graphql-tag'
import {
  Text,
  Container,
  Button,
  CandourProvider,
  Link,
} from 'candour'
import defaultComponents from './components'
import loadingData from './lib/loadingData'
import releasesQuery from './lib/releasesQuery'
import client from './lib/client'

export default ({
  last = 5,
  endpoint = 'http://localhost:4000/graphql',
  roadmapUrl,
  components: propComponents,
  hideSupportBadge,
  ...props,
}) => (
  <ApolloProvider client={client(endpoint)}>
    <Query query={releasesQuery} variables={{ last }}>
      {({ loading, error, data }) => {
        const components = _.defaultsDeep(propComponents, defaultComponents)
        const {
          Error,
          Release,
          Point,
          Line,
          SupportBadge,
        } = components

        const componentsBag = { components, defaultComponents }

        if (error) return <Error error={error} {...componentsBag} />

        const {
          releases,
        } = data || loadingData(last)

        return (
          <Fragment>
            <Container displayFlex paddingBottom width='100%'>
              {_.map(releases, (release) => (
                <Release
                  key={release.id}
                  release={release}
                  {...componentsBag}
                />
              ))}
              <Container displayFlex alignItemsCenter width='100%'>
                {roadmapUrl && <Point url={roadmapUrl} {...componentsBag}>
                  ···
                </Point>}
                <Line width='100%' {...componentsBag} />
              </Container>
            </Container>

            {!hideSupportBadge && <SupportBadge
              url='https://honestive.com'
              {...componentsBag}
            />}
          </Fragment>
        )
      }}
    </Query>
  </ApolloProvider>
)
