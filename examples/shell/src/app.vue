<script setup lang="ts">
import heroImg from "./assets/hero.png";
import typescriptLogo from "./assets/typescript.svg";
import viteLogo from "./assets/vite.svg";
</script>

<template>
  <section id="center">
    <div class="hero">
      <img :src="heroImg" class="base" width="170" height="179" />
      <img :src="typescriptLogo" class="framework" alt="TypeScript logo" />
      <img :src="viteLogo" class="vite" alt="Vite logo" />
    </div>
    <div>
      <h1>Shell App</h1>
    </div>
    <nav class="navigation">
      <RouterLink class="nav-link" to="/react">React</RouterLink> /
      <RouterLink class="nav-link" to="/vue">Vue</RouterLink>
    </nav>
  </section>

  <div class="ticks" />
  <main id="sub-app-container">
    <RouterView />
  </main>
</template>

<style scoped>
#center {
  display: flex;
  flex-direction: column;
  gap: 20px;
  place-content: center;
  place-items: center;
  padding: 32px;

  @media (max-width: 1024px) {
    padding: 32px 20px 24px;
    gap: 16px;
  }
}

.hero {
  position: relative;

  .base,
  .framework,
  .vite {
    inset-inline: 0;
    margin: 0 auto;
  }

  .base {
    width: 170px;
    position: relative;
    z-index: 0;
  }

  .framework,
  .vite {
    position: absolute;
  }

  .framework {
    z-index: 1;
    top: 34px;
    height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg) scale(1.4);
  }

  .vite {
    z-index: 0;
    top: 107px;
    height: 26px;
    width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg) scale(0.8);
  }
}
#sub-app-container {
  border-top: 1px solid var(--border);
  flex-grow: 1;
}
.ticks {
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: -4.5px;
    border: 5px solid transparent;
  }

  &::before {
    left: 0;
    border-left-color: var(--border);
  }
  &::after {
    right: 0;
    border-right-color: var(--border);
  }
}
</style>
