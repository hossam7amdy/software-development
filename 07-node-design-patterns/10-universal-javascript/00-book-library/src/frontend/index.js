import React from 'react'
import ReactDOM from 'react-dom/client'
import htm from 'htm'

import { BrowserRouter } from 'react-router-dom'
import { App } from './App.js'

const html = htm.bind(React.createElement)

ReactDOM.hydrateRoot(
  document.getElementById('root'),
  html`<${BrowserRouter}>
<${App} />
</${BrowserRouter}>`
)
