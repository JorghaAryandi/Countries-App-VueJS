<template>
  <div>
    <p v-if="loading">Loading post...</p>
    <p v-if="error">{{ error.message }}</p>
    <p v-if="post">
      <post :post="post" :author="getPostAuthor"></post>
    </p>
  </div> 
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { useAuthorStore } from '../stores/author'
  import { usePostStore } from '../stores/post'

  const route = useRoute() 
  const { getPostAuthor } = storeToRefs(useAuthorStore())
  const { fetchAuthors} = useAuthorStore()
  const { post, loading, error } = storeToRefs(usePostStore())
  const { fetchPost } = usePostStore()

  fetchAuthors()
  fetchPost(route.params.id as string)
</script>