import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getUserInfo} from '../store/user'

function User(props) {
  return <div>
      <h1>this is Home</h1>
      <h1>这是home的数据{props.userInfo.name}</h1>
    </div>
}
User.loadData = (store) => {
  return store.dispatch(getUserInfo())
}
export default connect(
  state => ({userInfo: state.user.userInfo}),
  {getUserInfo}
)(User)