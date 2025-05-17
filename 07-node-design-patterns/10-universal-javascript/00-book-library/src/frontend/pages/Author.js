import htm from 'htm'
import React from 'react'

import { NotFound } from './NotFound.js'
import { AsyncPage } from './AsyncPage.js'
import { Header } from '../components/Header.js'

const html = htm.bind(React.createElement)

export class Author extends AsyncPage {
  static async preloadAsyncData(props) {
    const response = await fetch(
      `http://localhost:3000/api/author/${props.match.params.authorId}`
    )
    const body = await response.json()
    if (!response.ok) {
      throw new Error(body)
    }
    return { author: body }
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

    return html` <${Header} />
      <div>
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
