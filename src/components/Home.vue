<template>
  <div class="home">
    <!-- Hero section -->
    <section class="hero">
      <div class="hero-content">
        <p class="hero-subtitle font-display">Clima en tiempo real</p>
        <h1 class="hero-title font-display">
          Las Playas<br><em>más Hermosas</em><br>del Mundo
        </h1>
        <p class="hero-desc">Explora el clima en destinos costeros icónicos. Temperatura, viento, humedad y pronóstico semanal.</p>

        <!-- Búsqueda con v-model -->
        <div class="search-bar">
          <span class="search-icon">🔍</span>
          <input
            v-model="busqueda"
            type="text"
            placeholder="Buscar playa o país..."
            class="search-input"
            @keyup.escape="busqueda = ''"
          />
          <button v-if="busqueda" class="search-clear" @click="busqueda = ''">✕</button>
        </div>
      </div>
      <div class="hero-decoration">
        <div class="decoration-circle c1"></div>
        <div class="decoration-circle c2"></div>
        <div class="decoration-circle c3"></div>
      </div>
    </section>

    <!-- Resultado de búsqueda -->
    <div class="results-info" v-if="busqueda">
      <span v-if="playasFiltradas.length > 0">
        {{ playasFiltradas.length }} resultado{{ playasFiltradas.length !== 1 ? 's' : '' }} para "<strong>{{ busqueda }}</strong>"
      </span>
      <span v-else class="no-results">
        No se encontraron playas para "{{ busqueda }}"
      </span>
    </div>

    <!-- Mensaje sin resultados -->
    <div v-if="playasFiltradas.length === 0 && busqueda" class="empty-state">
      <div class="empty-icon">🌊</div>
      <h3>Sin resultados</h3>
      <p>Intenta con otro nombre de playa o país</p>
      <button class="btn-limpiar" @click="busqueda = ''">Ver todas las playas</button>
    </div>

    <!-- Grid de playas -->
    <section class="playas-grid" v-else>
      <div
        v-for="playa in playasFiltradas"
        :key="playa.id"
        class="playa-card"
        @click="irAlDetalle(playa.id)"
      >
        <div class="card-accent" :style="{ background: `linear-gradient(135deg, ${playa.imagen_color}40, ${playa.imagen_color}15)` }"></div>
        <div class="card-header">
          <div class="card-emoji">{{ playa.emoji }}</div>
          <div class="card-meta">
            <h3 class="card-nombre">{{ playa.nombre }}</h3>
            <p class="card-pais">📍 {{ playa.pais }}</p>
          </div>
          <div class="card-temp">
            {{ formatTemp(playa.clima_actual.temperatura_c) }}
          </div>
        </div>
        <div class="card-clima">
          <span class="clima-icono">{{ playa.clima_actual.icono }}</span>
          <span class="clima-desc">{{ playa.clima_actual.descripcion }}</span>
        </div>
        <div class="card-stats">
          <div class="stat">
            <span class="stat-icon">💧</span>
            <span>{{ playa.clima_actual.humedad }}%</span>
          </div>
          <div class="stat">
            <span class="stat-icon">💨</span>
            <span>{{ playa.clima_actual.viento_kmh }} km/h</span>
          </div>
          <div class="stat">
            <span class="stat-icon">☀️</span>
            <span>UV {{ playa.clima_actual.uv }}</span>
          </div>
        </div>
        <div class="card-mini-forecast">
          <div
            v-for="dia in playa.pronostico.slice(0, 4)"
            :key="dia.dia"
            class="mini-dia"
          >
            <span class="mini-icono">{{ dia.icono }}</span>
            <span class="mini-nombre">{{ dia.dia }}</span>
            <span class="mini-temp">{{ formatTemp(dia.max) }}</span>
          </div>
        </div>
        <div class="card-cta">
          Ver pronóstico completo →
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { playas, celsiusAFahrenheit } from '../data/playas.js'

export default {
  name: 'Home',
  props: {
    unidad: {
      type: String,
      default: 'C'
    }
  },
  data() {
    return {
      playas,
      busqueda: ''
    }
  },
  computed: {
    playasFiltradas() {
      const q = this.busqueda.toLowerCase().trim()
      if (!q) return this.playas
      return this.playas.filter(p =>
        p.nombre.toLowerCase().includes(q) ||
        p.pais.toLowerCase().includes(q)
      )
    }
  },
  methods: {
    formatTemp(c) {
      if (this.unidad === 'F') {
        return `${celsiusAFahrenheit(c)}°F`
      }
      return `${c}°C`
    },
    irAlDetalle(id) {
      this.$router.push({ name: 'DetalleLugar', params: { id } })
    }
  }
}
</script>

<style scoped>
.home {
  position: relative;
  z-index: 1;
}

/* Hero */
.hero {
  position: relative;
  padding: 80px 40px 60px;
  overflow: hidden;
}

.hero-content {
  max-width: 620px;
  position: relative;
  z-index: 1;
}

.hero-subtitle {
  color: #7dd3fc;
  font-style: italic;
  font-size: 1.1rem;
  margin-bottom: 16px;
  letter-spacing: 0.5px;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  line-height: 1.1;
  color: #fff;
  margin-bottom: 20px;
  font-weight: 700;
}

.hero-title em {
  color: #7dd3fc;
  font-style: italic;
}

.hero-desc {
  color: rgba(255,255,255,0.6);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 36px;
  max-width: 480px;
}

/* Search bar */
.search-bar {
  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 50px;
  padding: 12px 20px;
  gap: 12px;
  max-width: 440px;
  transition: border-color 0.2s, background 0.2s;
}

.search-bar:focus-within {
  border-color: #0ea5e9;
  background: rgba(14, 165, 233, 0.1);
}

.search-icon {
  font-size: 1rem;
  opacity: 0.7;
}

.search-input {
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 0.95rem;
  font-family: 'DM Sans', sans-serif;
  flex: 1;
  min-width: 0;
}

.search-input::placeholder {
  color: rgba(255,255,255,0.4);
}

.search-clear {
  background: none;
  border: none;
  color: rgba(255,255,255,0.5);
  cursor: pointer;
  font-size: 0.8rem;
  padding: 2px 6px;
  border-radius: 50%;
  transition: background 0.2s, color 0.2s;
}

.search-clear:hover {
  background: rgba(255,255,255,0.1);
  color: #fff;
}

/* Decoración */
.hero-decoration {
  position: absolute;
  right: 0;
  top: 0;
  width: 50%;
  height: 100%;
  pointer-events: none;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
}

.c1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #0ea5e9, transparent);
  right: -100px;
  top: -100px;
  animation: pulse 6s ease-in-out infinite;
}

.c2 {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, #06b6d4, transparent);
  right: 100px;
  bottom: -50px;
  animation: pulse 8s ease-in-out infinite reverse;
}

.c3 {
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, #7dd3fc, transparent);
  right: 280px;
  top: 60px;
  animation: pulse 5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.15; }
  50% { transform: scale(1.1); opacity: 0.25; }
}

/* Results info */
.results-info {
  padding: 0 40px 16px;
  color: rgba(255,255,255,0.6);
  font-size: 0.9rem;
}

.results-info strong {
  color: #7dd3fc;
}

.no-results {
  color: rgba(255,255,255,0.5);
}

/* Empty state */
.empty-state {
  text-align: center;
  padding: 80px 40px;
  color: rgba(255,255,255,0.6);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 16px;
  animation: float 3s ease-in-out infinite;
}

.empty-state h3 {
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 8px;
}

.empty-state p {
  margin-bottom: 24px;
}

.btn-limpiar {
  background: rgba(14, 165, 233, 0.2);
  border: 1px solid #0ea5e9;
  color: #7dd3fc;
  padding: 10px 24px;
  border-radius: 30px;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.btn-limpiar:hover {
  background: rgba(14, 165, 233, 0.3);
}

/* Grid */
.playas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  padding: 0 40px 80px;
}

/* Card */
.playa-card {
  position: relative;
  background: rgba(255,255,255,0.07);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: var(--radius-card);
  padding: 28px;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease, border-color 0.3s, box-shadow 0.3s;
}

.playa-card:hover {
  transform: translateY(-6px);
  border-color: rgba(14, 165, 233, 0.4);
  box-shadow: 0 20px 60px rgba(0,0,0,0.3), 0 0 30px rgba(14, 165, 233, 0.15);
}

.card-accent {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s;
  border-radius: var(--radius-card);
}

.playa-card:hover .card-accent {
  opacity: 1;
}

.card-header {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
}

.card-emoji {
  font-size: 2rem;
  line-height: 1;
  flex-shrink: 0;
}

.card-meta {
  flex: 1;
  min-width: 0;
}

.card-nombre {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  color: #fff;
  font-weight: 700;
  margin-bottom: 4px;
}

.card-pais {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.5);
}

.card-temp {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  color: #7dd3fc;
  font-weight: 700;
  flex-shrink: 0;
}

.card-clima {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
}

.clima-icono {
  font-size: 1.4rem;
}

.clima-desc {
  color: rgba(255,255,255,0.7);
  font-size: 0.9rem;
}

.card-stats {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
}

.stat {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.55);
}

.stat-icon {
  font-size: 0.85rem;
}

.card-mini-forecast {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-top: 1px solid rgba(255,255,255,0.08);
  border-bottom: 1px solid rgba(255,255,255,0.08);
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
}

.mini-dia {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
}

.mini-icono {
  font-size: 1.1rem;
}

.mini-nombre {
  font-size: 0.7rem;
  color: rgba(255,255,255,0.4);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.mini-temp {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.7);
  font-weight: 500;
}

.card-cta {
  font-size: 0.8rem;
  color: #0ea5e9;
  text-align: right;
  opacity: 0;
  transform: translateX(-5px);
  transition: opacity 0.2s, transform 0.2s;
  position: relative;
  z-index: 1;
}

.playa-card:hover .card-cta {
  opacity: 1;
  transform: translateX(0);
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

@media (max-width: 600px) {
  .hero {
    padding: 50px 20px 40px;
  }
  .playas-grid {
    padding: 0 20px 60px;
    grid-template-columns: 1fr;
  }
  .results-info {
    padding: 0 20px 12px;
  }
}
</style>
