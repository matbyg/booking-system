<script setup lang="ts">
import { ref, computed } from 'vue'

interface Reservation {
  guestName: string
  checkInDate: string
  checkOutDate: string
}

const guestName = ref('')
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
  if (checkInDate.value && checkOutDate.value) {
    const isAvailable = checkDateAvailability(checkInDate.value, checkOutDate.value)

    if (!isAvailable) {
      showDeclineModal.value = true
      return
    }

    addReservation({
      guestName: guestName.value,
      checkInDate: checkInDate.value.toLocaleString('en-US', localeOptions),
      checkOutDate: checkOutDate.value.toLocaleString('en-US', localeOptions)
    })
    showConfirmationModal.value = true
  }
}

function addReservation(newReservation: Reservation): void {
  console.log(newReservation)
  const existingReservationsJSON = localStorage.getItem('reservations')
  const existingReservations: Reservation[] = existingReservationsJSON
    ? JSON.parse(existingReservationsJSON)
    : []
  existingReservations.push(newReservation)
  const updatedReservationsJSON = JSON.stringify(existingReservations)
  localStorage.setItem('reservations', updatedReservationsJSON)
}

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
      <p>Select a check in and check out date</p>
      <PrimeCalendar
        v-model="searchDateSpan"
        locale="en"
        inline
        :minDate="minDate"
        selectionMode="range"
      />

      <div v-if="checkInDate" class="address-summary">
        <strong>Selected dates</strong>
        {{ checkInDate?.toLocaleDateString('en-US', localeOptions) }} →
        {{ checkOutDate?.toLocaleDateString('en-US', localeOptions) }}
      </div>

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
        From
        <strong>{{ checkInDate?.toLocaleDateString('en-US', localeOptions) }}</strong> to
        <strong>{{ checkOutDate?.toLocaleDateString('en-US', localeOptions) }}</strong>
      </p>
      <template #footer>
        <PrimeButton aria-label="Close" @click="showConfirmationModal = false">Done</PrimeButton>
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

  button {
    margin-top: 1rem;
    font-size: 1.125rem;
  }
}
.address-summary {
  margin-top: 1rem;
  background: #f4f1f1;
  font-size: 0.875rem;
  width: fit-content;
  padding: 0.5rem 1rem;
  border-radius: 5px;
}
</style>
