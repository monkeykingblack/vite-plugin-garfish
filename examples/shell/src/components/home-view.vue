<script setup lang="ts"></script>

<template>
  <div id="home">
    Try to change route to
    <code>/react</code>
    or
    <code>/vue</code>
    to see magic
  </div>
</template>

<style scoped>
#home {
  padding: 30px 24px 32px;
}

code {
  background-color: #818b981f;
  padding: 4px;
  border-radius: 6px;
}
@media (prefers-color-scheme: light) {
  button {
    background-color: #f9f9f9;
  }
}
</style>
