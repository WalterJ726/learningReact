import React from 'react'

class Test extends React.Component {
  static defaultProps = {
    pageSize: 10
  }
  render () {
    return (
      <div>{this.props.pageSize}</div>
    )
  }
}

// Test.defaultProps = {
//   pageSize: 10
// }

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