<template>
  <div class="app-wrapper">
    <!-- Header -->
    <header class="app-header">
      <router-link to="/" class="logo">
        <span class="logo-icon">🌊</span>
        <span class="logo-text font-display">CoastalClima</span>
      </router-link>
      <nav class="app-nav">
        <router-link to="/" class="nav-link">Inicio</router-link>
        <div class="unit-toggle">
          <button
            :class="['unit-btn', { active: unidad === 'C' }]"
            @click="unidad = 'C'"
          >°C</button>
          <button
            :class="['unit-btn', { active: unidad === 'F' }]"
            @click="unidad = 'F'"
          >°F</button>
        </div>
      </nav>
    </header>

    <!-- Router View -->
    <main class="app-main">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" :unidad="unidad" />
        </transition>
      </router-view>
    </main>

    <!-- Footer -->
    <footer class="app-footer">
      <p>CoastalClima &copy; 2025 — Playas del Mundo</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      unidad: 'C'
    }
  }
}
</script>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px;
  background: rgba(12, 20, 69, 0.6);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.logo-icon {
  font-size: 1.8rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.5px;
}

.app-nav {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-link {
  color: rgba(255,255,255,0.7);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #7dd3fc;
}

.unit-toggle {
  display: flex;
  background: rgba(255,255,255,0.1);
  border-radius: 30px;
  padding: 3px;
  gap: 2px;
}

.unit-btn {
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.6);
  padding: 5px 14px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  font-family: 'DM Sans', sans-serif;
  transition: all 0.2s;
}

.unit-btn.active {
  background: #0ea5e9;
  color: #fff;
}

.unit-btn:hover:not(.active) {
  color: #fff;
}

.app-main {
  flex: 1;
  padding: 0;
}

.app-footer {
  text-align: center;
  padding: 20px;
  color: rgba(255,255,255,0.3);
  font-size: 0.8rem;
  position: relative;
  z-index: 1;
}

@media (max-width: 600px) {
  .app-header {
    padding: 16px 20px;
  }
  .logo-text {
    font-size: 1.2rem;
  }
}
</style>
