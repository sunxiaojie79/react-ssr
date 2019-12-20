import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getUserInfo} from '../store/user'
import {Redirect} from 'react-router-dom'
function User(props) {
   
  return <Redirect to="/about"></Redirect>
  // return <div>
  //     <h1>this is User</h1>
  //     <h1>这是home的数据{props.userInfo.name}</h1>
  //   </div>
}
User.loadData = (store) => {
  return store.dispatch(getUserInfo())
}
export default connect(
  state => ({userInfo: state.user.userInfo}),
  {getUserInfo}
)(User)