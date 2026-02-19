<template>
  <div class="detalle">
    <!-- Lugar no encontrado -->
    <div v-if="!playa" class="not-found">
      <div class="not-found-icon">🌊</div>
      <h2>Playa no encontrada</h2>
      <p>No existe ninguna playa con ese ID.</p>
      <router-link to="/" class="btn-volver">← Volver al inicio</router-link>
    </div>

    <template v-else>
      <!-- Back nav -->
      <div class="nav-top">
        <router-link to="/" class="btn-back">
          <span>←</span> Todas las playas
        </router-link>
      </div>

      <!-- Header del lugar -->
      <section class="lugar-hero" :style="{ '--accent': playa.imagen_color }">
        <div class="lugar-hero-bg"></div>
        <div class="lugar-hero-content">
          <div class="lugar-emoji">{{ playa.emoji }}</div>
          <div class="lugar-info">
            <p class="lugar-pais">📍 {{ playa.pais }}</p>
            <h1 class="lugar-nombre font-display">{{ playa.nombre }}</h1>
            <p class="lugar-desc">{{ playa.descripcion }}</p>
          </div>
          <div class="clima-principal">
            <div class="temp-grande">{{ formatTemp(playa.clima_actual.temperatura_c) }}</div>
            <div class="clima-detalle">
              <span class="clima-icono-grande">{{ playa.clima_actual.icono }}</span>
              <span class="clima-texto">{{ playa.clima_actual.descripcion }}</span>
            </div>
          </div>
        </div>

        <!-- Métricas clima actual -->
        <div class="metricas-actuales">
          <div class="metrica">
            <div class="metrica-valor">{{ playa.clima_actual.humedad }}%</div>
            <div class="metrica-label">💧 Humedad</div>
          </div>
          <div class="metrica-sep"></div>
          <div class="metrica">
            <div class="metrica-valor">{{ playa.clima_actual.viento_kmh }} km/h</div>
            <div class="metrica-label">💨 Viento</div>
          </div>
          <div class="metrica-sep"></div>
          <div class="metrica">
            <div class="metrica-valor">{{ playa.clima_actual.uv }}</div>
            <div class="metrica-label">☀️ Índice UV</div>
          </div>
          <div class="metrica-sep"></div>
          <div class="metrica">
            <div class="metrica-valor">{{ formatTemp(estadisticas.temp_max) }}</div>
            <div class="metrica-label">🌡️ Máx. semana</div>
          </div>
        </div>
      </section>

      <!-- Pronóstico semanal -->
      <section class="seccion pronostico-seccion">
        <h2 class="seccion-titulo font-display">Pronóstico Semanal</h2>
        <div class="pronostico-grid">
          <div
            v-for="(dia, index) in playa.pronostico"
            :key="dia.dia"
            class="pronostico-card"
            :class="{ hoy: index === 0 }"
          >
            <div class="pro-dia">{{ index === 0 ? 'Hoy' : dia.dia }}</div>
            <div class="pro-icono">{{ dia.icono }}</div>
            <div class="pro-temps">
              <span class="pro-max">{{ formatTemp(dia.max) }}</span>
              <span class="pro-min">{{ formatTemp(dia.min) }}</span>
            </div>
            <div class="pro-barra">
              <div
                class="pro-barra-fill"
                :style="{
                  height: barraAltura(dia.max, dia.min) + '%',
                  background: `linear-gradient(to top, ${playa.imagen_color}80, ${playa.imagen_color})`
                }"
              ></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Estadísticas de la semana -->
      <section class="seccion estadisticas-seccion">
        <h2 class="seccion-titulo font-display">Estadísticas de la Semana</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-num stat-max">{{ formatTemp(estadisticas.temp_max) }}</div>
            <div class="stat-lbl">Temperatura Máxima</div>
            <div class="stat-desc">Pico de calor registrado en los próximos 7 días</div>
          </div>
          <div class="stat-card">
            <div class="stat-num stat-min">{{ formatTemp(estadisticas.temp_min) }}</div>
            <div class="stat-lbl">Temperatura Mínima</div>
            <div class="stat-desc">Temperatura nocturna más baja de la semana</div>
          </div>
          <div class="stat-card">
            <div class="stat-num stat-prom">{{ formatTemp(estadisticas.promedio_general) }}</div>
            <div class="stat-lbl">Promedio General</div>
            <div class="stat-desc">Media entre todas las máximas y mínimas</div>
          </div>
          <div class="stat-card">
            <div class="stat-num stat-rango">{{ unidad === 'F' ? Math.round(estadisticas.rango_termico * 9/5) : estadisticas.rango_termico }}°{{ unidad }}</div>
            <div class="stat-lbl">Rango Térmico</div>
            <div class="stat-desc">Diferencia entre la máxima y mínima semanal</div>
          </div>
          <div class="stat-card">
            <div class="stat-num stat-prom-max">{{ formatTemp(estadisticas.promedio_max) }}</div>
            <div class="stat-lbl">Promedio Máximas</div>
            <div class="stat-desc">Media de las temperaturas más altas del día</div>
          </div>
          <div class="stat-card">
            <div class="stat-num stat-prom-min">{{ formatTemp(estadisticas.promedio_min) }}</div>
            <div class="stat-lbl">Promedio Mínimas</div>
            <div class="stat-desc">Media de las temperaturas más bajas del día</div>
          </div>
        </div>
      </section>

      <!-- Otras playas -->
      <section class="seccion otras-playas">
        <h2 class="seccion-titulo font-display">Explorar Otras Playas</h2>
        <div class="otras-grid">
          <router-link
            v-for="otra in otrasPlayas"
            :key="otra.id"
            :to="{ name: 'DetalleLugar', params: { id: otra.id } }"
            class="otra-card"
          >
            <span class="otra-emoji">{{ otra.emoji }}</span>
            <div>
              <div class="otra-nombre">{{ otra.nombre }}</div>
              <div class="otra-pais">{{ otra.pais }}</div>
            </div>
            <div class="otra-temp">{{ formatTemp(otra.clima_actual.temperatura_c) }}</div>
          </router-link>
        </div>
      </section>
    </template>
  </div>
</template>

<script>
import { playas, calcularEstadisticas, celsiusAFahrenheit } from '../data/playas.js'

export default {
  name: 'DetalleLugar',
  props: {
    id: {
      type: [String, Number],
      required: true
    },
    unidad: {
      type: String,
      default: 'C'
    }
  },
  computed: {
    playa() {
      return playas.find(p => p.id === parseInt(this.id))
    },
    estadisticas() {
      if (!this.playa) return {}
      return calcularEstadisticas(this.playa.pronostico)
    },
    otrasPlayas() {
      return playas.filter(p => p.id !== parseInt(this.id)).slice(0, 3)
    }
  },
  methods: {
    formatTemp(c) {
      if (this.unidad === 'F') return `${celsiusAFahrenheit(c)}°F`
      return `${c}°C`
    },
    barraAltura(max, min) {
      const globalMax = Math.max(...this.playa.pronostico.map(d => d.max))
      const globalMin = Math.min(...this.playa.pronostico.map(d => d.min))
      const rango = globalMax - globalMin
      const alto = rango === 0 ? 50 : ((max - globalMin) / rango) * 70 + 30
      return Math.round(alto)
    }
  }
}
</script>

<style scoped>
.detalle {
  position: relative;
  z-index: 1;
  padding-bottom: 80px;
}

/* Not found */
.not-found {
  text-align: center;
  padding: 120px 40px;
  color: rgba(255,255,255,0.7);
}
.not-found-icon { font-size: 4rem; margin-bottom: 20px; }
.not-found h2 { font-size: 2rem; color: #fff; margin-bottom: 12px; font-family: 'Playfair Display', serif; }
.not-found p { margin-bottom: 30px; }

/* Back nav */
.nav-top {
  padding: 24px 40px 0;
}

.btn-back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
  padding: 8px 16px;
  border-radius: 30px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.05);
}

.btn-back:hover {
  color: #7dd3fc;
  border-color: rgba(14, 165, 233, 0.4);
}

.btn-volver {
  display: inline-block;
  color: #7dd3fc;
  text-decoration: none;
  border: 1px solid #0ea5e9;
  padding: 10px 24px;
  border-radius: 30px;
  transition: background 0.2s;
}

.btn-volver:hover {
  background: rgba(14, 165, 233, 0.1);
}

/* Hero del lugar */
.lugar-hero {
  position: relative;
  padding: 40px 40px 0;
  overflow: hidden;
}

.lugar-hero-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 80% 50%, var(--accent, #0ea5e9)20, transparent 70%);
  opacity: 0.3;
  pointer-events: none;
}

.lugar-hero-content {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 40px;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
}

.lugar-emoji {
  font-size: 4rem;
  flex-shrink: 0;
  animation: float 4s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.lugar-info {
  flex: 1;
  min-width: 200px;
}

.lugar-pais {
  color: rgba(255,255,255,0.5);
  font-size: 0.85rem;
  margin-bottom: 8px;
}

.lugar-nombre {
  font-size: clamp(2.5rem, 5vw, 4rem);
  color: #fff;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 12px;
}

.lugar-desc {
  color: rgba(255,255,255,0.6);
  font-size: 0.95rem;
  line-height: 1.5;
  max-width: 420px;
}

.clima-principal {
  text-align: right;
  flex-shrink: 0;
}

.temp-grande {
  font-family: 'Playfair Display', serif;
  font-size: 5rem;
  color: #fff;
  line-height: 1;
  font-weight: 700;
}

.clima-detalle {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  margin-top: 4px;
}

.clima-icono-grande {
  font-size: 1.5rem;
}

.clima-texto {
  color: rgba(255,255,255,0.6);
  font-size: 0.9rem;
}

/* Métricas actuales */
.metricas-actuales {
  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: var(--radius-card);
  padding: 24px 32px;
  gap: 0;
  position: relative;
  z-index: 1;
  flex-wrap: wrap;
}

.metrica {
  flex: 1;
  text-align: center;
  min-width: 100px;
  padding: 8px;
}

.metrica-valor {
  font-family: 'Playfair Display', serif;
  font-size: 1.6rem;
  color: #7dd3fc;
  font-weight: 700;
}

.metrica-label {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.4);
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.metrica-sep {
  width: 1px;
  height: 40px;
  background: rgba(255,255,255,0.1);
  flex-shrink: 0;
}

/* Secciones */
.seccion {
  padding: 60px 40px 0;
}

.seccion-titulo {
  font-size: 2rem;
  color: #fff;
  margin-bottom: 28px;
  font-weight: 700;
  font-style: italic;
}

/* Pronóstico */
.pronostico-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 12px;
}

.pronostico-card {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 16px 12px;
  text-align: center;
  transition: transform 0.2s, background 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.pronostico-card:hover {
  background: rgba(255,255,255,0.1);
  transform: translateY(-3px);
}

.pronostico-card.hoy {
  border-color: rgba(14, 165, 233, 0.4);
  background: rgba(14, 165, 233, 0.1);
}

.pro-dia {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.5);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.pronostico-card.hoy .pro-dia {
  color: #7dd3fc;
}

.pro-icono {
  font-size: 1.8rem;
}

.pro-temps {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.pro-max {
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
}

.pro-min {
  color: rgba(255,255,255,0.4);
  font-size: 0.8rem;
}

.pro-barra {
  width: 6px;
  height: 50px;
  background: rgba(255,255,255,0.08);
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
}

.pro-barra-fill {
  width: 100%;
  border-radius: 3px;
  transition: height 0.8s ease;
}

/* Estadísticas */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.stat-card {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 24px;
  transition: transform 0.2s, background 0.2s;
}

.stat-card:hover {
  background: rgba(255,255,255,0.09);
  transform: translateY(-2px);
}

.stat-num {
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 6px;
}

.stat-max { color: #fb7185; }
.stat-min { color: #60a5fa; }
.stat-prom { color: #7dd3fc; }
.stat-rango { color: #fbbf24; }
.stat-prom-max { color: #f97316; }
.stat-prom-min { color: #a78bfa; }

.stat-lbl {
  color: rgba(255,255,255,0.7);
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.stat-desc {
  color: rgba(255,255,255,0.35);
  font-size: 0.75rem;
  line-height: 1.4;
}

/* Otras playas */
.otras-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.otra-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  padding: 16px 20px;
  text-decoration: none;
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
}

.otra-card:hover {
  background: rgba(255,255,255,0.09);
  border-color: rgba(14, 165, 233, 0.3);
  transform: translateX(4px);
}

.otra-emoji {
  font-size: 1.6rem;
}

.otra-nombre {
  color: #fff;
  font-weight: 500;
  font-size: 0.95rem;
}

.otra-pais {
  color: rgba(255,255,255,0.4);
  font-size: 0.8rem;
  margin-top: 2px;
}

.otra-temp {
  margin-left: auto;
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  color: #7dd3fc;
}

@media (max-width: 900px) {
  .pronostico-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .seccion { padding: 40px 20px 0; }
  .nav-top { padding: 20px 20px 0; }
  .lugar-hero { padding: 20px 20px 0; }
  .lugar-hero-content { flex-direction: column; }
  .clima-principal { text-align: left; }
  .pronostico-grid { grid-template-columns: repeat(4, 1fr); }
  .stats-grid { grid-template-columns: 1fr 1fr; }
  .metricas-actuales { padding: 16px; }
  .temp-grande { font-size: 3.5rem; }
}
</style>
