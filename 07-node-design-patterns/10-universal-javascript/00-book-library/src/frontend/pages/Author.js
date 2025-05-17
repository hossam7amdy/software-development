import htm from 'htm'
import React, { Component } from 'react'

import { authors } from '../../data/authors.js'
import { NotFound } from './NotFound.js'

const html = htm.bind(React.createElement)

export class Author extends Component {
  render() {
    const author = authors.find(
      author => author.id === this.props.match.params.authorId
    )

    if (!author) {
      return html`<${NotFound} error="Author not found" />`
    }

    document.title = `Author - ${author.name}`
    return html`<div>
      <h2>${author.name}</h2>
      <p>${author.bio}</p>
      <h3>Books</h3>
      <ul>
        ${author.books.map(
          book => html`<li key=${book.id}>${book.title} (${book.year})</li>`
        )}
      </ul>
    </div>`
  }
}
