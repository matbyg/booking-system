<script setup lang="ts">
import { ref, computed } from 'vue'

// interface Reservation {
//   guestName: string
//   checkInDate: string
//   checkOutDate: string
// }

const minDate = ref(new Date())
const searchDateSpan = ref(null)
const guestName = ref('Dummy')
// const showModal = ref(false)

const checkInDate = computed<Date | null>(() => {
  if (searchDateSpan.value) return searchDateSpan.value[0]
  return null
})

const checkOutDate = computed<Date | null>(() => {
  if (searchDateSpan.value) return searchDateSpan.value[1]
  return null
})

const disableSearchButton = computed<boolean>(() => {
  if (!checkInDate.value || !checkOutDate.value || !guestName.value) return true
  return false
})

function checkDateAvailability(): boolean {
  if (!guestName.value || !checkInDate.value || !checkOutDate.value) return false

  const reservations = localStorage.getItem('reservations')
  const parsedReservations = reservations ? JSON.parse(reservations) : null

  if (!parsedReservations) return true

  for (const reservation of parsedReservations) {
    if (
      !(
        checkOutDate.value < new Date(reservation.checkInDate) ||
        checkInDate.value > new Date(reservation.checkOutDate)
      )
    ) {
      return false
    }
  }
  return true
}

function requestReservation(): void {
  const isAvailable = checkDateAvailability()
  console.log(isAvailable)
}

// function makeReservation(guestName: string, userCheckIn: Date, userCheckOut: Date): void {
//   const newReservation: Reservation = {
//     guestName,
//     checkInDate: JSON.stringify(userCheckIn),
//     checkOutDate: JSON.stringify(userCheckOut)
//   }
//   localStorage.setItem('reservations', JSON.stringify(newReservation))
// }
</script>

<template>
  <main>
    <section>
      <p>Please enter your name</p>
      <PrimeInput type="text" v-model="guestName" />
    </section>

    <section>
      <p>Choose the date for your visit</p>
      <PrimeCalendar v-model="searchDateSpan" inline :minDate="minDate" selectionMode="range" />

      <div class="search-button-wrapper">
        <PrimeButton
          aria-label="Search"
          :disabled="disableSearchButton"
          @click="requestReservation()"
        >
          Make reservation
        </PrimeButton>
      </div>
    </section>
  </main>
</template>

<style scoped>
section {
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
