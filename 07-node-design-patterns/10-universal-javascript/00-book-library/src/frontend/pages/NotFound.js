import htm from 'htm'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const html = htm.bind(React.createElement)

export class NotFound extends Component {
  render() {
    if (this.props.staticContext) {
      this.props.staticContext.statusCode = 404
    }

    return html`<div>
      <div>
        <h2>404</h2>
        <h3>${this.props.error || 'Page not found'}</h3>
        <${Link} to="/">Go back to the home page</>
      </div>
    </div>`
  }
}
