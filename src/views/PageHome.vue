<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { IInterview } from '@/interfaces/interview';
import { v4 as uuidv4 } from 'uuid';
import { getAuth } from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';

const dataBase = getFirestore();

const router = useRouter();

const company = ref<string>('');
const vacancyLink = ref<string>('');
const hrName = ref<string>('');
const telegram = ref<string>('');
const whatsApp = ref<string>('');
const phone = ref<string>('');
const isLoading = ref<boolean>(false);

const addInterview = async (): Promise<void> => {
  isLoading.value = true;

  const userId = getAuth().currentUser?.uid;

  const payload: IInterview = {
    id: uuidv4(),
    company: company.value,
    vacancyLink: vacancyLink.value,
    hrName: hrName.value,
    telegram: telegram.value,
    whatsApp: whatsApp.value,
    phone: phone.value,
    createDate: new Date()
  };

  if (userId) {
    await setDoc(doc(dataBase, `users/${userId}/interviews`, payload.id), payload).then(() => {
      router.push('/list');
    })
  } else {
    isLoading.value = false; 
  }
};

const isSubmitDisabled = computed<boolean>(() => {
  return !(company.value && vacancyLink.value && hrName.value);
});
</script>

<template>
  <app-card>
    <template #title>Новое собеседование</template>
    <template #content>
      <app-input-wrap>
        <app-input-icon>
          <i class="pi pi-at"></i>
        </app-input-icon>
        <app-input-text v-model="company" placeholder="Компания" />
      </app-input-wrap>
      <app-input-wrap>
        <app-input-icon>
          <i class="pi pi-at"></i>
        </app-input-icon>
        <app-input-text v-model="vacancyLink" placeholder="Описание вакансии (ссылка)" />
      </app-input-wrap>
      <app-input-wrap>
        <app-input-icon>
          <i class="pi pi-at"></i>
        </app-input-icon>
        <app-input-text v-model="hrName" placeholder="Контакт (имя)" />
      </app-input-wrap>
      <app-input-wrap>
        <app-input-icon>
          <i class="pi pi-at"></i>
        </app-input-icon>
        <app-input-text v-model="telegram" placeholder="Telegram username HR" />
      </app-input-wrap>
      <app-input-wrap>
        <app-input-icon>
          <i class="pi pi-at"></i>
        </app-input-icon>
        <app-input-text v-model="whatsApp" placeholder="WhatsApp телефон HR" />
      </app-input-wrap>
      <app-input-wrap>
        <app-input-icon>
          <i class="pi pi-at"></i>
        </app-input-icon>
        <app-input-text v-model="phone" placeholder="Телефон HR" />
      </app-input-wrap>
      <app-button
        @click="addInterview"
        label="Создать собеседование"
        :disabled="isSubmitDisabled"
        :loading="isLoading"
      ></app-button>
    </template>
  </app-card>
</template>
