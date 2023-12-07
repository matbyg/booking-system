<script setup lang="ts">
import { ref, computed } from 'vue'

interface Reservation {
  id: string
  guestName: string
  checkInDate: string
  checkOutDate: string
}

const minDate = ref(new Date())
const searchDateSpan = ref(null)
const guestName = ref('Dummy')

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

function checkDateAvailability(): void {
  const reservations = localStorage.getItem('reservations')
  const parsedReservations = reservations ? JSON.parse(reservations) : null

  if (!parsedReservations) return

  parsedReservations.every((reservation: Reservation) => {
    console.log(reservation.id)
    const hasCollision =
      checkInDate.value && checkOutDate.value
        ? areDateRangesColliding(
            checkInDate.value,
            checkOutDate.value,
            new Date(reservation.checkInDate),
            new Date(reservation.checkOutDate)
          )
        : null

    if (hasCollision) console.log('your reservation is not possible')
    if (!hasCollision) console.log('available!')
  })
}

function areDateRangesColliding(
  userCheckIn: Date,
  userCheckOut: Date,
  reservationCheckIn: Date,
  reservationCheckOut: Date
): boolean {
  if (userCheckOut < reservationCheckIn || userCheckIn > reservationCheckOut) {
    return false
  } else {
    return true
  }
}
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
          @click="checkDateAvailability()"
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
