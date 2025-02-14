<script setup lang="ts">
import { computed, ref } from 'vue';
import type { ComputedRef } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { getAuth, signOut } from 'firebase/auth';

interface IMenuItem {
  label: string;
  icon: string;
  path: string;
  isShow: ComputedRef<boolean>;
}

const userStore = useUserStore();
const isAuth: ComputedRef<boolean> = computed(() => !!userStore.userId);
const router = useRouter();

const items = ref<IMenuItem[]>([
  {
    label: 'Авторизация',
    icon: 'pi pi-user',
    path: '/auth',
    isShow: computed((): boolean => !userStore.userId)
  },
  {
    label: 'Добавить',
    icon: 'pi pi-plus',
    path: '/',
    isShow: computed((): boolean => !!userStore.userId)
  },
  {
    label: 'Список собеседований',
    icon: 'pi pi-list',
    path: '/list',
    isShow: computed((): boolean => !!userStore.userId)
  },
  {
    label: 'Статистика',
    icon: 'pi pi-chart-pie',
    path: '/statistic',
    isShow: computed((): boolean => !!userStore.userId)
  }
]);

const exit = async (): Promise<void> => {
  await signOut(getAuth());
  router.push('/auth');
};
</script>

<template>
  <header>
    <app-menubar :model="items" class="app-menu">
      <template #item="{ item, props }">
        <router-link v-if="item.isShow" :to="item.path" v-bind="props.action" class="flex align-items-center">
          <span :class="item.icon" class="p-menuitem-icon"></span>
          <span class="ml-2">{{ item.label }}</span>
        </router-link>
      </template>
      <template #end>
        <button v-if="isAuth" @click="exit" class="flex align-items-center menu-exit">
          <span class="pi pi-sign-out p-menuitem-icon"></span>
          <span class="ml-2">Выход</span>
        </button>
      </template>
    </app-menubar>
  </header>
</template>

<style scoped>
.app-menu {
  margin: 30px 0;
}
</style>
