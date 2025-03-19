<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getFirestore, collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useUserStore } from '@/stores/user';
import type { IInterview } from '@/interfaces/interview';

const userStore = useUserStore();
const dataBase = getFirestore();

const interviews = ref<IInterview[]>([]);
const isLoading = ref<boolean>(true);

const getAllInterviews = async <T extends IInterview>(): Promise<T[]> => {
  const getData = query(collection(dataBase, `users/${userStore.userId}/interviews`), orderBy('createDate', 'desc'));
  const dataList = await getDocs(getData);

  console.log(dataList.docs.map((doc) => doc.data() as T));
  return dataList.docs.map((doc) => doc.data() as T);
};

onMounted(async () => {
  const interviewsList: Array<IInterview> = await getAllInterviews();
  interviews.value = [...interviewsList];
  isLoading.value = false;
});
</script>

<template>
  <app-table :value="interviews">
    <template #header> Список собеседований </template>
    <app-column field="company" header="компания"></app-column>
    <app-column field="vacancyLink" header="Вакансия">
      <template #body="slotProps">
        <a :href="slotProps.data.vacancyLink" target="_blank">Перейти</a>
      </template>
    </app-column>
    <app-column field="hrName" header="ФИО hr"></app-column>
    <app-column header="контакты hr">
      <template #body="slotProps">
        <a v-if="slotProps.data.telegram" :href="`https://t.me/${slotProps.data.telegram}`" target="_blank">
          <span class="pi pi-telegram"></span>
        </a>
        <a v-if="slotProps.data.whatsApp" :href="`https://wa.me/${slotProps.data.whatsApp}`" target="_blank">
          <span class="pi pi-whatsapp"></span>
        </a>
        <a v-if="slotProps.data.phone" :href="`tel:${slotProps.data.phone}`" target="_blank">
          <span class="pi pi-phone"></span>
        </a>
      </template>
    </app-column>
    <app-column>
      <template #body="slotProps">
        <router-link :to="`/interviews/${slotProps.data.id}`">
          <span class="pi pi-pencil"></span>
        </router-link>
        <app-button icon="pi pi-trash"></app-button>
      </template>
    </app-column>
  </app-table>
</template>

<style scoped>
.table-wrap {
  padding: var(--p-card-body-padding);
  background: var(--p-card-background);
  box-shadow: var(--p-card-shadow);
  border-radius: var(--p-card-border-radius);
}
</style>
