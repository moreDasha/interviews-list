<script setup lang="ts">
import { computed, ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

const isLogin = ref<boolean>(true);
const isLoading = ref<boolean>(false);
const router = useRouter();
const toast = useToast();
const email = ref<string>('');
const password = ref<string>('');

const subtitleText = computed<string>(() => {
  return isLogin.value ? 'Ещё нет аккаунта?' : 'Уже есть аккаунт?';
});

const subtitleButtonText = computed<string>(() => {
  return isLogin.value ? 'Создайте аккаунт прямо сейчас' : 'Войдите в аккаунт';
});

const submitButtonText = computed<string>(() => {
  return isLogin.value ? 'Вход' : 'Регистрация';
});

const registration = async (): Promise<void> => {
  isLoading.value = true;
  try {
    await createUserWithEmailAndPassword(getAuth(), email.value, password.value);
    router.push('/');
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
    }
  } finally {
    isLoading.value = false;
  }
};

const login = async (): Promise<void> => {
  isLoading.value = true;
  try {
    await signInWithEmailAndPassword(getAuth(), email.value, password.value);
    router.push('/');
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
    }
  } finally {
    isLoading.value = false;
  }
};

const submitForm = () => {
  if (isLogin.value) {
    login();
  } else {
    registration();
  }
};

const handleLogin = () => {
  isLogin.value = !isLogin.value;
};
</script>

<template>
  <app-toast-service position="bottom-left"></app-toast-service>
  <div class="enter-block">
    <app-card>
      <template #title>
        <div class="enter-block__header">
          <span>{{ subtitleText }}</span>
          <button class="enter-block__btn-change" @click="handleLogin">{{ subtitleButtonText }}</button>
        </div>
      </template>
      <template #content>
        <form @submit.prevent="submitForm" class="enter-block__form">
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
            <app-input-text type="password" v-model="password" placeholder="Password" />
          </app-input-wrap>
          <app-button type="submit" :label="submitButtonText" :loading="isLoading"></app-button>
        </form>
      </template>
    </app-card>
  </div>
</template>

<style scoped>
.enter-block,
.enter-block__form {
  display: flex;
  flex-direction: column;
}

.enter-block {
  gap: 24px;
}

.enter-block__header {
  display: flex;
  gap: 1.25rem;
  align-items: center;
}

.enter-block__form {
  gap: 18px;
}

.enter-block__form > button {
  align-self: flex-start;
}

.enter-block__btn-change {
  font-size: var(--p-card-title-font-size);
  font-weight: var(--p-card-title-font-weight);
  color: var(--p-primary-color);
  transition: color var(--p-transition-duration);
}

@media(any-hover: hover) {
  .enter-block__btn-change:hover {
    color: var(--p-primary-hover-color);
  }
}
</style>
