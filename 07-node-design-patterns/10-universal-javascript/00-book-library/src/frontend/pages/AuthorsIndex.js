import htm from 'htm'
import React from 'react'
import { Link } from 'react-router-dom'

import { AsyncPage } from './AsyncPage.js'
import { Header } from '../components/Header.js'

const html = htm.bind(React.createElement)

export class AuthorsIndex extends AsyncPage {
  static async preloadAsyncData(props) {
    const response = await fetch('http://localhost:3000/api/authors')
    const body = await response.json()
    if (!response.ok) {
      throw new Error(body)
    }
    return { authors: body }
  }

  render() {
    if (this.state.loading) {
      return html`<h2>Loading...</h2>`
    }

    return html` <${Header} />
      <div>
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
