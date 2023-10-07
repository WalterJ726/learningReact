import React from 'react'

class App extends React.Component {
  constructor() {
    super()
    console.log('constructor')
  }

  state = {
    count: 0
  }

  componentDidMount () {
    console.log('componentDidMount')
    // ajax 有点像vue的mount
  }

  clickHandler = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  
  render () {
    console.log('render')
    return (
      <div>
        this is div
        <button onClick={this.clickHandler}>{this.state.count}</button>
      </div>
    )
  }

}

export default App