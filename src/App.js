import React, {useState} from 'react'

function App(props) {
  const [count, setCount] = useState(1)
  return <div>
      <h1>{props.title},this is a react ssr demo</h1>
      <h1>{count}</h1>
      <button onClick={()=>setCount(count + 1)}>加一</button>
    </div>
}

export default <App title="hello"></App>