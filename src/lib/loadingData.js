import _ from 'lodash'

export default (last) => ({
  releases: _.map(_.times(last), (id) => { id }),
})
