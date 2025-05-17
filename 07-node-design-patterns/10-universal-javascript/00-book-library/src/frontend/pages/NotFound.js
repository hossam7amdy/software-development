import htm from 'htm'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Header } from '../components/Header.js'

const html = htm.bind(React.createElement)

export class NotFound extends Component {
  render() {
    if (this.props.staticContext) {
      this.props.staticContext.statusCode = 404
    }

    return html`
    <${Header} />
    <div>
      <div>
        <h2>404</h2>
        <h3>${this.props.error || 'Page not found'}</h3>
        <${Link} to="/">Go back to the home page</>
      </div>
    </div>`
  }
}
