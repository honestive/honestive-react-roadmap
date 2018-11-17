import React from 'react'
import { Container } from 'candour'

export default ({ components, defaultComponents, ...rest }) => (
  <Container width='20px' height='1px' backgroundColorBlack {...rest} />
)
