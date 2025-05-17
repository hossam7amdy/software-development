import htm from 'htm'
import React, { Component } from 'react'

import { authors } from '../../data/authors.js'
import { Link } from 'react-router-dom'

const html = htm.bind(React.createElement)

export class AuthorsIndex extends Component {
  componentDidMount() {
    document.title = 'Book Library - Index'
  }

  render() {
    return html`<div>
      <div>
        ${authors.map(
          author =>
            html`<div key="${author.id}">
              <p>
                <${Link} to="${`/author/${author.id}`}">${author.name}<//>
              </p>
            </div>`
        )}
      </div>
    </div>`
  }
}
