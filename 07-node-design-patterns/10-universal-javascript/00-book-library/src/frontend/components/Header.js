import htm from 'htm'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const html = htm.bind(React.createElement)

export class Header extends Component {
  render() {
    return html`<header>
      <h1>
        <${Link} to="/">My Library<//>
      </h1>
    </header>`
  }
}
