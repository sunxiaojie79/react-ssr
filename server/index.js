import React from 'react'
import {renderToString} from 'react-dom/server'
import express from 'express'
import {StaticRouter, matchPath, Route, Switch} from 'react-router-dom'
import routes from '../src/App'
import {Provider} from 'react-redux'
import {getServerStore} from '../src/store/store'
import Header from '../src/component/Header'
import proxy from 'http-proxy-middleware'
import path from 'path'
import fs from 'fs'

const store = getServerStore()
const app = express()
app.use(express.static('public'))

app.use(
  '/api',
  proxy({target: 'http://localhost:9090', changeOrigin: true})
)
function csrRender(res) {
  const file = path.resolve(process.cwd(), 'public/index.csr.html')
  const html = fs.readFileSync(file, 'utf-8')
  return res.send(html)
}

app.get('*', (req, res) => {
  if (req.query._mode === 'csr') {
    return csrRender(res)
  }
  const promises = []
  routes.some(route => {
    const match = matchPath(req.path, route)
    if (match) {
      const {loadData} = route.component
      if (loadData) {
        // promises.push(loadData(store))
        promises.push(new Promise((resolve, reject) => {
          loadData(store)
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            resolve()
          })
        }))
      }
    }
  })
  Promise.all(promises).then(() => { // allSettled
    const context = {
      css: []
    }
    console.log('1', context)

    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <Header></Header>
          <Switch>
            {routes.map(route => <Route {...route}></Route>)}
          </Switch>
        </StaticRouter>
      </Provider>
    )
    debugger
    console.log('context', context)
    if (context.statusCode){
      res.status(context.statusCode)
    }
    if (context.action==='REPLACE'){
      res.redirect(301, context.url)
    }
    const css = context.css.join('\n')
    console.log('css', css)
    res.send(`
      <html>
        <head>
          <meta charset="utf-8"/>
          <title>react ssr</title>
          <style>
            ${css}
          </style>
        </head>
        <body>
          <div id="root">${content}</div>
          <script>
            window.__context = ${JSON.stringify(store.getState())}
          </script>
          <script src="/bundle.js"></script>
        </body>
      </html>
    `)
  }).catch(() => {
    res.send('404')
  })
})

app.listen(9093, () => {
  console.log('running')
})