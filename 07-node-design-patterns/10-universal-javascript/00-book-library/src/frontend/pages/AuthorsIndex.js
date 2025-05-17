import htm from 'htm'
import React, { Component } from 'react'

import { Link } from 'react-router-dom'

const html = htm.bind(React.createElement)

export class AuthorsIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authors: [],
      loading: true
    }
  }

  async componentDidMount() {
    document.title = 'Book Library - Index'

    const response = await fetch('http://localhost:3000/api/authors')
    const authors = await response.json()
    this.setState({ loading: false, authors })
  }

  render() {
    if (this.state.loading) {
      return html`<h2>Loading...</h2>`
    }

    return html`<div>
      <div>
        ${this.state.authors.map(
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
