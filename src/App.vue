<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

interface Booking {
  id: string
  guestName: string
  checkInDate: string
  checkOutDate: string
}

const dummyBookings: Booking[] = [
  {
    id: '001',
    guestName: 'Bertil',
    checkInDate: 'Tue Dec 19 2023 00:00:00 GMT+0100 (Central European Standard Time)',
    checkOutDate: 'Sat Dec 23 2023 00:00:00 GMT+0100 (Central European Standard Time)'
  },
  {
    id: '002',
    guestName: 'Sven',
    checkInDate: 'Tue Dec 24 2023 00:00:00 GMT+0100 (Central European Standard Time)',
    checkOutDate: 'Sat Dec 25 2023 00:00:00 GMT+0100 (Central European Standard Time)'
  }
]

localStorage.setItem('dummy-bookings', JSON.stringify(dummyBookings))
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  display: flex;
  justify-content: center;
  padding: 1rem 0;
}

nav a.router-link-exact-active {
  color: #000;
}

nav a.router-link-exact-active:hover {
}

nav a {
  display: inline-block;
  text-decoration: none;
  padding: 0 1rem;
  border-left: 1px solid #ccc;
  color: rgb(84, 46, 255);
}

nav a:first-of-type {
  border: 0;
}
</style>
