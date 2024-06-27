<template>
  <main>
    <p v-if="loading">Loading posts...</p>
    <p v-if="error">{{ error.message }}</p>
    <template v-if="posts">
      <div v-for="post in posts" :key="post.id">
        <RouterLink :to="`/post/${post.id}`">{{ post.title }}</RouterLink>
        <p>{{ post.body }}</p>
      </div>
    </template>
  </main>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { usePostStore } from '../stores/post'

  const { posts, loading, error } = storeToRefs(usePostStore())
  const { fetchPosts } = usePostStore()

  fetchPosts()
</script>