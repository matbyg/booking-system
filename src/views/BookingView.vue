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

const checkInDate = computed<Date>(() => {
  return searchDateSpan.value ? searchDateSpan.value[0] : new Date()
})

const checkOutDate = computed<Date>(() => {
  return searchDateSpan.value ? searchDateSpan.value[1] : new Date()
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

const isConfirmationModalVisible = ref(false)
const isDeclineModalVisible = ref(false)

function requestReservation(): void {
  const isAvailable = checkDateAvailability(checkInDate.value, checkOutDate.value)

  if (!isAvailable) {
    isDeclineModalVisible.value = true
    return
  }

  addReservation({
    guestName: guestName.value,
    checkInDate: formatDate(checkInDate.value),
    checkOutDate: formatDate(checkOutDate.value)
  })
  isConfirmationModalVisible.value = true
}

function addReservation(newReservation: Reservation): void {
  const existingReservationsJSON = localStorage.getItem('reservations')
  const existingReservations: Reservation[] = existingReservationsJSON
    ? JSON.parse(existingReservationsJSON)
    : []
  existingReservations.push(newReservation)
  const updatedReservationsJSON = JSON.stringify(existingReservations)
  localStorage.setItem('reservations', updatedReservationsJSON)
}

const disableReservationButton = computed<boolean>(() => {
  if (!checkInDate.value || !checkOutDate.value || !guestName.value) return true
  return false
})

function formatDate(date: Date): string {
  return date.toLocaleString('en-US', localeOptions)
}

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
      <label for="guest-name" class="required">Please enter your name</label>
      <PrimeInput type="text" id="guest-name" v-model="guestName" />
    </section>

    <section>
      <p class="required">Select a check-in and check-out date</p>
      <PrimeCalendar
        v-model="searchDateSpan"
        locale="en"
        inline
        :minDate="minDate"
        selectionMode="range"
      />

      <div class="button-wrapper">
        <PrimeButton
          aria-label="Make reservation"
          :disabled="disableReservationButton"
          @click="requestReservation()"
        >
          Make reservation
        </PrimeButton>
      </div>
    </section>

    <PrimeDialog
      v-model:visible="isConfirmationModalVisible"
      :style="{ width: '40rem' }"
      :header="`Thank you ${guestName} for your reservation!`"
      :draggable="false"
      modal
    >
      <p>You have successfully made a reservation for the following dates.</p>
      <p>
        From
        <strong>{{ formatDate(checkInDate) }}</strong> to
        <strong>{{ formatDate(checkOutDate) }}</strong>
      </p>
      <template #footer>
        <PrimeButton aria-label="Close" @click="isConfirmationModalVisible = false">
          Done
        </PrimeButton>
      </template>
    </PrimeDialog>

    <PrimeDialog
      v-model:visible="isDeclineModalVisible"
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
.button-wrapper {
  display: flex;
  justify-content: end;
  margin-top: 1rem;

  button {
    font-size: 1.125rem;
  }
}
.required {
  margin-bottom: 0.5rem;
  &:after {
    content: '*';
    margin-left: 0.375rem;
    font-weight: bold;
    color: #d93232;
  }
}
</style>
