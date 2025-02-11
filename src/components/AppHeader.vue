<script setup lang="ts">
import { computed, ref } from 'vue';
import type { ComputedRef } from 'vue';
import { useUserStore } from '@/stores/user';

interface IMenuItem {
  label: string;
  icon: string;
  path: string;
  isShow: boolean;
}

const userStore = useUserStore();
const isAuth: ComputedRef<boolean> = computed(() => !!userStore.userId);

const items = ref<IMenuItem[]>([
  {
    label: 'Авторизация',
    icon: 'pi pi-user',
    path: '/auth',
    isShow: !isAuth.value
  },
  {
    label: 'Добавить',
    icon: 'pi pi-plus',
    path: '/',
    isShow: isAuth.value
  },
  {
    label: 'Список собеседований',
    icon: 'pi pi-list',
    path: '/list',
    isShow: isAuth.value
  },
  {
    label: 'Статистика',
    icon: 'pi pi-chart-pie',
    path: '/statistic',
    isShow: isAuth.value
  }
]);
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
        <router-link v-if="isAuth" to="/auth" class="flex align-items-center menu-exit">
          <span class="pi pi-sign-out p-menuitem-icon"></span>
          <span class="ml-2">Выход</span>
        </router-link>
      </template>
    </app-menubar>
  </header>
</template>

<style scoped>
.app-menu {
  margin: 30px 0;
}
</style>
