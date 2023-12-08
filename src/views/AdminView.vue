<script setup lang="ts">
import ReservationListItem from '../components/ReservationListItem.vue'
const reservations = localStorage.getItem('reservations')
const parsedReservations = reservations ? JSON.parse(reservations) : null
</script>

<template>
  <main>
    <h2>All reservations (newest to oldest)</h2>
    <ul>
      <ReservationListItem
        v-for="(reservation, index) in parsedReservations.reverse()"
        :key="index"
        :guest-name="reservation.guestName"
        :check-in-date="reservation.checkInDate"
        :check-out-date="reservation.checkOutDate"
      />
    </ul>
  </main>
</template>

<style scoped>
ul {
  padding: 0;
}
</style>
