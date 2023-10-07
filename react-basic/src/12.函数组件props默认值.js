import React from 'react'
import PropTypes from 'prop-types'

function Test ({pageSize = 10}) {
  return (
    <div>
      this is test
    </div>
  )
}

Test.propTypes = {
  list: PropTypes.array.isRequired
}
class App extends React.Component {
  render () {
    return (
      <div>
      <Test />
    </div>
    )
  }
}

export default App;