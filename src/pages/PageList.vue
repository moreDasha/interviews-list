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
  const getData = query(collection(dataBase, `users/${userStore.userId}/interviews`), orderBy('createDate', 'desc'))
  const dataList = await getDocs(getData)

  console.log(dataList.docs.map((doc) => doc.data() as T))
  return dataList.docs.map((doc) => doc.data() as T)
}

onMounted(async () => {
  const interviewsList: Array<IInterview> = await getAllInterviews();
  interviews.value = [...interviewsList]
  isLoading.value = false
})
</script>

<template>List</template>
