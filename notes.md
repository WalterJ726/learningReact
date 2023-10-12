notice: some notes quoted from 'https://www.yuque.com/fechaichai/qeamqf/xbai87#M1UW5'
must give credit to chaichai "good teacher who teach front-end technology"
viedeo website: 'https://www.bilibili.com/video/BV1Z44y1K7Fj?p=98&vd_source=bea7836ea08aee3a5de3fb31e971f9d0'

## JSX基础
概念：JSX是 JavaScript XML（HTML）的缩写，表示在 JS 代码中书写 HTML 结构
作用：在React中创建HTML结构（页面UI结构）
优势：
1. 采用类似于HTML的语法，降低学习成本，会HTML就会JSX
2. 充分利用JS自身的可编程能力创建HTML结构

注意：JSX 并不是标准的 JS 语法，是 JS 的语法扩展，浏览器默认是不识别的，脚手架中内置的 @babel/plugin-transform-react-jsx 包，用来解析该语法

语法
{ JS 表达式 }
const name = '柴柴'

```javascript
<h1>你好，我叫{name}</h1>   
//    <h1>你好,我叫柴柴</h1>
```


可以使用的表达式

1. 字符串、数值、布尔值、null、undefined、object（ [] / {} ）
2. 1 + 2、'abc'.split('')、['a', 'b'].join('-')
3. fn()
### JSX列表渲染
实现：使用数组的map 方法

```javascript
// 来个列表
const songs = [
  { id: 1, name: '痴心绝对' },
  { id: 2, name: '像我这样的人' },
  { id: 3, name: '南山南' }
]

function App() {
  return (
    <div className="App">
      <ul>
        {
          songs.map(item => <li>{item.name}</li>)
        }
      </ul>
    </div>
  )
}

export default App
```


## 组件
组件可以理解为小模块，分为类组件和函数组件。分别对应于函数和类。
使用方法为
```javascript
// 定义函数组件
function HelloFn () {
  return <div>这是我的第一个函数组件!</div>
}


// 定义类组件
class HelloC extends React.Component {
  render () {
    return <div>这是我的第一个类组件!</div>
  }
}


// 定义类组件
function App () {
  return (
    <div className="App">
      {/* 渲染函数组件 */}
      <HelloFn />
      <HelloFn></HelloFn>

        <HelloC />
      <HelloC></HelloC>
    </div>
  )
}
export default App




```

### 更新组件状态的方法
一个前提：在React hook出来之前，函数式组件是没有自己的状态的

```javascript
setstate(
    list: ...this.list,
    新的值
    value: new value
)
```

## 表单
受控和非受控组件
### 受控组件
什么是受控组件？  input框自己的状态被React组件状态控制
React组件的状态的地方是在state中，input表单元素也有自己的状态是在value中，React将state与表单元素的值（value）绑定到一起，由state的值来控制表单元素的值，从而保证单一数据源特性

实现步骤
以获取文本框的值为例，受控组件的使用步骤如下：
1. 在组件的state中声明一个组件的状态数据
2. 将状态数据设置为input标签元素的value属性的值
3. 为input添加change事件，在事件处理程序中，通过事件对象e获取到当前文本框的值（即用户当前输入的值）
4. 调用setState方法，将文本框的值作为state状态的最新值

```JSX
import React from 'react'

class InputComponent extends React.Component {
  // 声明组件状态
  state = {
    message: 'this is message',
  }
  // 声明事件回调函数
  changeHandler = (e) => {
    this.setState({ message: e.target.value })
  }
  render () {
    return (
      <div>
        {/* 绑定value 绑定事件*/}
        <input value={this.state.message} onChange={this.changeHandler} />
      </div>
    )
  }
}


function App () {
  return (
    <div className="App">
      <InputComponent />
    </div>
  )
}
export default App
```
### 非受控组件
什么是非受控组件？
非受控组件就是通过手动操作dom的方式获取文本框的值，文本框的状态不受react组件的state中的状态控制，直接通过原生dom获取输入框的值

实现步骤
1. 导入createRef 函数
2. 调用createRef函数，创建一个ref对象，存储到名为msgRef的实例属性中
3. 为input添加ref属性，值为msgRef
4. 在按钮的事件处理程序中，通过msgRef.current即可拿到input对应的dom元素，而其中msgRef.current.value拿到的就是文本框的值


```JSX
import React, { createRef } from 'react'

class InputComponent extends React.Component {
  // 使用createRef产生一个存放dom的对象容器
  msgRef = createRef()

  changeHandler = () => {
    console.log(this.msgRef.current.value)
  }

  render() {
    return (
      <div>
        {/* ref绑定 获取真实dom */}
        <input ref={this.msgRef} />
        <button onClick={this.changeHandler}>click</button>
      </div>
    )
  }
}

function App () {
  return (
    <div className="App">
      <InputComponent />
    </div>
  )
}
export default App
```

## 组件通信
### 父传子
直接传递props

props介绍
1.  props是只读对象（readonly）
根据单项数据流的要求，子组件只能读取props中的数据，不能进行修改

2. props可以传递任意数据
数字、字符串、布尔值、数组、对象、函数、JSX

```JSX
import React from 'react'

// 函数式子组件
function FSon(props) {
  console.log(props)
  return (
    <div>
      子组件1
      {props.msg}
    </div>
  )
}

// 类子组件
class CSon extends React.Component {
  render() {
    return (
      <div>
        子组件2
        {this.props.msg}
      </div>
    )
  }
}
// 父组件
class App extends React.Component {
  state = {
    message: 'this is message'
  }
  render() {
    return (
      <div>
        <div>父组件</div>
        <FSon msg={this.state.message} />
        <CSon msg={this.state.message} />
      </div>
    )
  }
}

export default App
```
### 子传父
父传子func，子调用父的func返回数据
```JSX
import React from 'react'

// 子组件
function Son(props) {
  function handleClick() {
    // 调用父组件传递过来的回调函数 并注入参数
    props.changeMsg('this is newMessage')
  }
  return (
    <div>
      {props.msg}
      <button onClick={handleClick}>change</button>
    </div>
  )
}


class App extends React.Component {
  state = {
    message: 'this is message'
  }
  // 提供回调函数
  changeMessage = (newMsg) => {
    console.log('子组件传过来的数据:',newMsg)
    this.setState({
      message: newMsg
    })
  }
  render() {
    return (
      <div>
        <div>父组件</div>
        <Son
          msg={this.state.message}
          // 传递给子组件
          changeMsg={this.changeMessage}
        />
      </div>
    )
  }
}

export default App
```
### 兄弟通信
子传父 -> 父传子
```JSX
import React from 'react'

// 子组件A
function SonA(props) {
  return (
    <div>
      SonA
      {props.msg}
    </div>
  )
}
// 子组件B
function SonB(props) {
  return (
    <div>
      SonB
      <button onClick={() => props.changeMsg('new message')}>changeMsg</button>
    </div>
  )
}

// 父组件
class App extends React.Component {
  // 父组件提供状态数据
  state = {
    message: 'this is message'
  }
  // 父组件提供修改数据的方法
  changeMsg = (newMsg) => {
    this.setState({
      message: newMsg
    })
  }

  render() {
    return (
      <>
        {/* 接收数据的组件 */}
        <SonA msg={this.state.message} />
        {/* 修改数据的组件 */}
        <SonB changeMsg={this.changeMsg} />
      </>
    )
  }
}

export default App
```
### 跨组件通信（爷传孙）
provider机制，生产者消费者模型

```JSX
import React, { createContext }  from 'react'

// 1. 创建Context对象 
const { Provider, Consumer } = createContext()


// 3. 消费数据
function ComC() {
  return (
    <Consumer >
      {value => <div>{value}</div>}
    </Consumer>
  )
}

function ComA() {
  return (
    <ComC/>
  )
}

// 2. 提供数据
class App extends React.Component {
  state = {
    message: 'this is message'
  }
  render() {
    return (
      <Provider value={this.state.message}>
        <div className="app">
          <ComA />
        </div>
      </Provider>
    )
  }
}

export default App
```
## 组件生命周期
mount

render
setState的改动

unmount
## hook使用
### usestate
```javascript
[msg, setmsg] = usestate()


```
捆绑信息，能根据信息的改变从而再改变信息


### useEffect
```javascript
// 能根据参数的改动再改动

// 传参，不同参数作用不一样

return // 做一个结束之后的动作，类似与destructor
```

### useWindowScroll
记录滚动的y坐标

### useLocalStorage
存到本地内存
### useRef
使用整个class

### usecontext
使用class内部的属性和方法


## react-router
### 基本组件说明
route 对应组件渲染部分

link 跳转部分，会改变对应的url

### 路由出口和入口跳转

### 嵌套路由
嵌套route和routers
### 404实现

## mobx
主要是做一个存储组件的作用

观察者模式

## command 
netstat -ano


https://segmentfault.com/a/1190000038559170#item-0-5