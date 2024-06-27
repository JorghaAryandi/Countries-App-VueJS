import { defineStore } from 'pinia'
import { usePostStore } from './post'
import type { Comment } from '@/types/Comment'

export const useCommentStore = defineStore({
  id: 'comment',
  state: () => ({
    comments: [] as Comment[]
  }),
  getters: {
    getPostComments: (state) => {
      const postSore = usePostStore()
      return state.comments.filter((post) => {
        if (postSore.post) {
          return post.postId === postSore.post.id
        }
        return false
      })
    }
  },
  actions: {
    async fetchComments() {
      this.comments = await fetch('https://jsonplaceholder.typicode.com/comments')
      .then((response) => response.json())
    }
  }
})