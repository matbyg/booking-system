<script setup lang="ts">
import { ref, computed } from 'vue'

// interface Reservation {
//   guestName: string
//   checkInDate: string
//   checkOutDate: string
// }

const guestName = ref('Dummy')
const searchDateSpan = ref([])
const minDate = ref(new Date())

const checkInDate = computed<Date | undefined>(() => {
  if (searchDateSpan.value) return searchDateSpan.value[0]
  return undefined
})

const checkOutDate = computed<Date | undefined>(() => {
  if (searchDateSpan.value) return searchDateSpan.value[1]
  return undefined
})

function checkDateAvailability(userCheckIn: Date, userCheckOut: Date): boolean {
  const reservations = localStorage.getItem('reservations')
  const parsedReservations = reservations ? JSON.parse(reservations) : null
  if (parsedReservations) {
    for (const reservation of parsedReservations) {
      if (
        !(
          userCheckOut < new Date(reservation.checkInDate) ||
          userCheckIn > new Date(reservation.checkOutDate)
        )
      ) {
        return false
      }
    }
  }
  return true
}

const showConfirmationModal = ref(false)
const showDeclineModal = ref(false)

function requestReservation(): void {
  const isAvailable =
    checkInDate.value && checkOutDate.value
      ? checkDateAvailability(checkInDate.value, checkOutDate.value)
      : false

  if (!isAvailable) {
    showDeclineModal.value = true
    return
  }

  showConfirmationModal.value = true
}

// function makeReservation(guestName: string, userCheckIn: Date, userCheckOut: Date): void {
//   const newReservation: Reservation = {
//     guestName,
//     checkInDate: JSON.stringify(userCheckIn),
//     checkOutDate: JSON.stringify(userCheckOut)
//   }
//   localStorage.setItem('reservations', JSON.stringify(newReservation))
// }

const disableSearchButton = computed<boolean>(() => {
  if (!checkInDate.value || !checkOutDate.value || !guestName.value) return true
  return false
})

const localeOptions: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'short',
  day: 'numeric'
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
          @click="requestReservation()"
        >
          Make reservation
        </PrimeButton>
      </div>
    </section>

    <PrimeDialog
      v-model:visible="showConfirmationModal"
      :style="{ width: '40rem' }"
      :header="`Thank you ${guestName} for your reservation!`"
      :draggable="false"
      modal
    >
      <p>You have successfully made a reservation for the following dates.</p>
      <p>
        {{ checkInDate?.toLocaleDateString('en-US', localeOptions) }} →
        {{ checkOutDate?.toLocaleDateString('en-US', localeOptions) }}
      </p>
      <template #footer>
        <PrimeButton aria-label="Close" @click="showConfirmationModal = false">Okay</PrimeButton>
      </template>
    </PrimeDialog>

    <PrimeDialog
      v-model:visible="showDeclineModal"
      :style="{ width: '40rem' }"
      header="Your reservation is not possible"
      :draggable="false"
      modal
    >
      <p>
        The dates you have chosen are unavailable. Please choose another period of time for your
        visit.
      </p>
    </PrimeDialog>
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
