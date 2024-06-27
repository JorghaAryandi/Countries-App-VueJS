import type { Post } from '@/types/Post'
import { defineStore } from 'pinia'

export const usePostStore = defineStore({
  id: 'post',
  state: () => ({
    posts: [] as Post[],
    post: null as Post | null,
    loading: false,
    error: null as any
  }),
  getters: {
    getPostsPerAuthor: (state) => {
      return (authorId: number) => state.posts.filter((post) => post.userId === authorId)
    }
  }, 
  actions: {
    async fetchPosts() {
      this.posts = []
      this.loading = true
      try {
        this.posts = await fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json()) 
      } catch (error: any) {
        this.error = error
      } finally {
        this.loading = false
      }
    },
    async fetchPost(id: string) {
      this.post = null
      this.loading = true
      try {
        this.post = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
      } catch (error: any) {
        this.error = error
      } finally {
        this.loading = false
      }
    }
  }
})