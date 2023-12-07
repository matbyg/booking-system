<script setup lang="ts">
import { ref } from 'vue'

const searchDateSpan = ref(null)
</script>

<template>
  <main>
    <h1>Hitta ledigt rum</h1>
    <PrimeCalendar v-model="searchDateSpan" inline showWeek selectionMode="range" />

    <div class="search-button-wrapper">
      <PrimeButton aria-label="Sök">Sök</PrimeButton>
    </div>

    <div v-if="searchDateSpan" class="result-list-wrapper">
      <h2>Tillgängliga rum</h2>
    </div>
  </main>
</template>

<style scoped>
.search-button-wrapper {
  display: flex;
  justify-content: end;
  margin-top: 1rem;

  button {
    font-size: 1.125rem;
  }
}
</style>
