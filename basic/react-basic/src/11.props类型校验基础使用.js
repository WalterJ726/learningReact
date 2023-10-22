import React from 'react'
import PropTypes from 'prop-types'

function Test ({ list }) {
  return (
    <div>
      {list.map(item => <p>{item}</p>)}
    </div>
  )
}

Test.propTypes = {
  list: PropTypes.array // 限定这里的参数必须是array类型
}

class App extends React.Component {
  render () {
    return (
      <div>
      <Test list={[1,2,3]}/>
    </div>
    )
  }
}

export default App;