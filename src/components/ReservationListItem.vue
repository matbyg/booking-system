<script setup lang="ts">
const props = defineProps({
  guestName: {
    type: String,
    default: ''
  },
  checkInDate: {
    type: String,
    default: ''
  },
  checkOutDate: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <li class="reservation-wrapper">
    <p class="guest-name">Guest: {{ props.guestName }}</p>
    {{ props.checkInDate }} -- {{ props.checkOutDate }}
  </li>
</template>

<style scoped>
.reservation-wrapper {
  list-style: none;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
}
.guest-name {
  font-size: 1.125rem;
  font-weight: bold;
  margin: 0;
  margin-bottom: 0.5rem;
}
</style>
