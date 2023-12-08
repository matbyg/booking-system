<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ReservationListItem from '../components/ReservationListItem.vue'

const parsedReservations = ref<Reservation[]>([])

interface Reservation {
  guestName: string
  checkInDate: string
  checkOutDate: string
}

onMounted(() => loadReservations())

function loadReservations() {
  const reservations = localStorage.getItem('reservations')
  parsedReservations.value = reservations ? JSON.parse(reservations).reverse() : []
}

function clearReservations() {
  localStorage.clear()
  parsedReservations.value = []
}
</script>

<template>
  <main>
    <h2>All reservations (newest to oldest)</h2>

    <div v-if="parsedReservations.length > 0">
      <ul>
        <ReservationListItem
          v-for="(reservation, index) in parsedReservations"
          :key="index"
          :guest-name="reservation.guestName"
          :check-in-date="reservation.checkInDate"
          :check-out-date="reservation.checkOutDate"
        />
      </ul>
      <div class="clear-button-wrapper">
        <PrimeButton class="clear-button" @click="clearReservations()">
          Clear all reservations
        </PrimeButton>
      </div>
    </div>

    <div v-else>There are currently no reservations to display</div>
  </main>
</template>

<style scoped>
.clear-button-wrapper {
  display: flex;
  justify-content: end;
}
.clear-button {
  background-color: #d93232;
}
ul {
  padding: 0;
}
</style>
