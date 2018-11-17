import React from 'react'
import { Button } from 'candour'

export default ({
  url,
  children,
}) => (
  <Button
    component='a'
    href={url}
    target='_blank'
    whiteSpace='nowrap'
    backgroundColorBlack
    colorWhite
    padding='10px 20px'
    borderRadius='999px'
  >
    {children}
  </Button>
)
