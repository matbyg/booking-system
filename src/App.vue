<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1>Booking System Sample</h1>
    <nav>
      <RouterLink to="/">Booking page</RouterLink>
      <RouterLink to="/admin">Admin page</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style>
#app {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}

header {
  padding: 1rem 0;
  border-bottom: 1px solid #ccc;
  text-align: center;
}

nav a.router-link-exact-active {
  color: #000;
}
nav a {
  display: inline-block;
  text-decoration: none;
  padding: 0 1rem;
  border-left: 1px solid #ccc;
  color: rgb(63, 81, 181);
}

nav a:first-of-type {
  border: 0;
}

button,
input {
  &:focus-visible {
    outline: 4px solid black;
    outline-offset: 2px;
  }
}
</style>
