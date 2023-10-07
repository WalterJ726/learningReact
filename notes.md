## 组件
组件可以理解为小模块，分为类组件和函数组件。分别对应于函数和类。
使用方法为
```javascript
class text extends react.component {
    render() {
        return(
        <div></div>
    )
    }
}

function test {
    return(
        <div></div>
    )
}


class App extends react.component {

    render () {
        return(
            <div>
            // 使用方法
                <test /> 
            </div>
        )
    }
}

```

### 更新组件状态的方法
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
组件内部有个state

## 组件通信
- 父传子
直接传递props
- 子传父
父传子func，子调用父的func返回数据
- 兄弟通信
子传父 -> 父传子
- 跨组件通信（爷传孙）
provider机制，生产者消费者模型

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