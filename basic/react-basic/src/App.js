import React, { Children, createContext } from 'react'


const {Provider, Consumer} = createContext()
function ComA () {
  return (
    <div>
      this is ComA
      <ComC/>
    </div>
  )
}

function ComC () {
  return (
    <
  )
}

class App extends React.Component {
  render () {
    return (
      <div>
      <ListItem>
        this is child
        <div>this is div</div>
        <p>this is p</p>
        
      </ListItem>
    </div>
    )
  }
}

export default App;