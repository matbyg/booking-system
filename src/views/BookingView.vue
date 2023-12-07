<script setup lang="ts">
import { ref, computed } from 'vue'

const minDate = ref(new Date())
const searchDateSpan = ref(null)

const checkInDate = computed<string | null>(() => {
  if (searchDateSpan.value) return searchDateSpan.value[0]
  return null
})

const checkOutDate = computed<string | null>(() => {
  if (searchDateSpan.value) return searchDateSpan.value[1]
  return null
})

const disableSearchButton = computed<boolean>(() => {
  if (!checkInDate.value || !checkOutDate.value) return true
  return false
})

function getAvailableCabins(): void {
  console.log('searchForAvailableCabins')
  console.log(checkInDate.value)
  console.log(checkOutDate.value)
}
</script>

<template>
  <main>
    <h2>Choose the date for your visit</h2>
    <PrimeCalendar v-model="searchDateSpan" inline :minDate="minDate" selectionMode="range" />

    <div class="search-button-wrapper">
      <PrimeButton
        aria-label="Search"
        :disabled="disableSearchButton"
        @click="getAvailableCabins()"
      >
        Search
      </PrimeButton>
    </div>

    <!-- <div class="result-list-wrapper">
      <h2>Tillgängliga rum</h2>
      {{ checkInDate }}
      {{ checkOutDate }}
    </div> -->
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1rem;
}
.search-button-wrapper {
  display: flex;
  justify-content: end;
  margin-top: 1rem;

  button {
    font-size: 1.125rem;
  }
}
</style>
