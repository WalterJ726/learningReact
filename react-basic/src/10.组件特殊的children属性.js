import React, { Children } from 'react'


function ListItem ({children}) {
  return (
    <div>
      ListItem, {children.map(child => child)}
    </div>
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