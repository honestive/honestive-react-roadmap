import React from 'react'
import { Container } from 'candour'

export default ({
  release: {
    url,
    version,
  },
  components: {
    Point,
    Line,
  },
  components,
  ...rest
}) => (
  <Container displayFlex alignItemsCenter>
    <Point url={url} components={components} {...rest}>
      {version}
    </Point>
    <Line components={components} {...rest}/>
  </Container>
)
