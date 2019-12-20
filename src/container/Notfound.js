import React from 'react'
import {Route} from 'react-router-dom'

function Status({code, children}){
    return <Route render={({staticContext})=>{
        if(staticContext) {
            staticContext.statusCode=code
        }
        return children
    }}>
    </Route>
}
export default function Notfound(props) {
    // console.log(666, props)
    return <Status code={404}>
        <p>不好意思，页面走丢了</p>
        <img id="img-404" src="/404.jpg"></img>
    </Status>
}