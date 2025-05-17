import htm from 'htm'
import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import { AuthorsIndex } from './pages/AuthorsIndex.js'
import { Author } from './pages/Author.js'
import { NotFound } from './pages/NotFound.js'
import { Header } from './components/Header.js'

const html = htm.bind(React.createElement)

export class App extends Component {
  render() {
    return html`<${Header} />
      <${Switch}>
        <${Route} path="/" exact=${true} component=${AuthorsIndex} />
        <${Route} path="/author/:authorId" component=${Author} />
        <${Route} path="*" component=${NotFound} />
      <//>`
  }
}
