import { defineStore } from 'pinia'
import { usePostStore } from './post'
import type { Author } from '@/types/Author'

export const useAuthorStore = defineStore({
  id: 'author',
  state: () => ({
    authors: [] as Author[]
  }),
  getters: {
    getPostAuthor: (state) => {
      const postStore = usePostStore()
      return state.authors.find((author) => {
        if (postStore.post) {
          return author.id === postStore.post.userId
        }
        return false
      })
    }
  },
  actions: {
    async fetchAuthors() {
      this.authors = await fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
    }
  }
})