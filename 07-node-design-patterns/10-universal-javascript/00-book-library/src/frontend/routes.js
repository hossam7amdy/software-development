import { Author } from './pages/Author.js'
import { AuthorsIndex } from './pages/AuthorsIndex.js'
import { NotFound } from './pages/NotFound.js'

export const routes = [
  {
    exact: true,
    path: '/',
    component: AuthorsIndex
  },
  {
    path: '/author/:authorId',
    component: Author
  },
  {
    path: '*',
    component: NotFound
  }
]
