import React from 'react'
import { Link } from 'candour'

export default ({ url }) => (
  <Link
    component='a'
    href={url}
    target='_blank'
    fontSize='12px'
    marginLeftAuto
  >
    ■ Honestive
  </Link>
)
