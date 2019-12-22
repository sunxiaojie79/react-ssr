import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {getIndexList} from '../store/index'
import styles from './Index.css'

function Index(props) {
  console.log('_getCss', styles._getCss())
  if (props.staticContext) {
    props.staticContext.css.push(styles._getCss())
  }
  console.log('props', props)

  const [count, setCount] = usetate(1)
  useEffect(() => {
    if (!props.list.length) {
      props.getIndexList()
    }
  }, [])
  return <div className={styles.container}>
      <h1 className={styles.title}>this is a react ssr demo</h1>
      <h1>{count}</h1>
      <button onClick={()=>setCount(count + 1)}>加一</button>
      <hr/>
      <ul>
        {
          props.list.map(item => {
            return <li key={item.id}>{item.name}</li>
          })
        }
      </ul>
    </div>
}
Index.loadData = (store) => {
  return store.dispatch(getIndexList())
}
export default connect(
  state => ({list: state.index.list}),
  {getIndexList}
)(Index)