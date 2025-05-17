import htm from 'htm'
import React, { Component } from 'react'

import { NotFound } from './NotFound.js'

const html = htm.bind(React.createElement)

export class Author extends Component {
  constructor(props) {
    super(props)
    this.state = {
      author: null,
      loading: true
    }
  }

  async loadData() {
    let author = null
    this.setState({ loading: true, author })
    try {
      const response = await fetch(
        `http://localhost:3000/api/author/${this.props.match.params.authorId}`
      )
      const body = await response.json()
      if (!response.ok) {
        throw new Error(body.error)
      }
      author = body
    } catch (e) {}
    this.setState({ loading: false, author })
  }

  componentDidMount() {
    document.title = `Book Library - Author`

    this.loadData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.authorId !== this.props.match.params.authorId) {
      this.loadData()
    }
  }

  render() {
    if (this.state.loading) {
      return html`<h1>Loading ...</h1>`
    }

    if (!this.state.author) {
      return html`<${NotFound}
        staticContext=${this.props.staticContext}
        error="Author not found"
      />`
    }

    return html`<div>
      <h2>${this.state.author.name}</h2>
      <p>${this.state.author.bio}</p>
      <h3>Books</h3>
      <ul>
        ${this.state.author.books.map(
          book => html`<li key=${book.id}>${book.title} (${book.year})</li>`
        )}
      </ul>
    </div>`
  }
}
