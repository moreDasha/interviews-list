<script setup lang="ts">
import { computed, ref } from 'vue';

const isLogin = ref<boolean>(true);
const isLoading = ref<boolean>(false);
const email = ref<string>('');
const password = ref<string>('')

const subtitleText = computed<string>(() => {
  return isLogin.value ? 'Ещё нет аккаунта?': 'Уже есть аккаунт?'
});

const subtitleButtonText = computed<string>(() => {
  return isLogin.value ? 'Создайте аккаунт прямо сейчас': 'Войдите в аккаунт'
});

const submitButtonText = computed<string>(() => {
  return isLogin.value ? 'Вход' : 'Регистрация'
});

const submitForm = () => {
  
}

const handleLogin = () => {
  isLogin.value = !isLogin.value
}
</script>

<template>
  <div class="enter-block">
    <div class="enter-block__greetings">
      <div class="text-900 text-3xl font-medium mb-3">Приветствую!</div>
      <span class="text-600 font-medium line-height-3">{{ subtitleText }}</span>
      <button @click="handleLogin">{{ subtitleButtonText }}</button>
    </div>
    <form @submit.prevent="submitForm">
      <app-input-wrap>
        <app-input-icon>
          <i class="pi pi-at"></i>
        </app-input-icon>
        <app-input-text v-model="email" placeholder="Email" />
      </app-input-wrap>
      <app-input-wrap>
        <app-input-icon>
          <i class="pi pi-user"></i>
        </app-input-icon>
        <app-input-text v-model="password" placeholder="Password" />
      </app-input-wrap>
      <app-button :label="submitButtonText" :loading="isLoading"></app-button>
    </form>
  </div>
</template>
