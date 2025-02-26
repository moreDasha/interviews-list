<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AppHeader from './components/AppHeader.vue';
import { useUserStore } from './stores/user';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const userStore = useUserStore();
const isLoading = ref<boolean>(true)

onMounted(() => {
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      userStore.userId = user.uid;
      console.log(!!userStore.userId)
    } else {
      userStore.userId = '';
    }
    isLoading.value = false
  });
})
</script>

<template>
  <app-progress v-if="isLoading"></app-progress> 
  <div v-else class="container">
    <app-header />
    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.container {
  max-width: 1280px;
  width: 100%;
  margin: auto;
  padding: 20px;
}
</style>
