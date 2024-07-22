<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/" active-class="active-link">Home</RouterLink>
        <RouterLink to="/about" active-class="active-link">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
}

nav {
  background-color: #3498db;
  padding: 1rem;
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: larger;
}

nav a {
  color: white;
  text-decoration: none;
  margin: 0 1rem;
}

.active-link {
  font-weight: bold;
  color: #000000;
}
</style>