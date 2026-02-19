# 🌊 CoastalClima — Playas del Mundo

Una **Single Page Application (SPA)** de clima con temática de playas icónicas del mundo, construida con **Vue.js 3** y **Vue Router**.

---

## Descripción

CoastalClima muestra el clima actual y pronóstico semanal de 6 playas paradisíacas alrededor del mundo: Bora Bora, Maldivas, Ipanema, Whitehaven, Navagio y Tulum. Los datos provienen de un módulo mock en JavaScript.

La app permite explorar el clima de cada destino costero con estadísticas semanales, pronóstico de 7 días, y conversión de unidades (°C / °F).

---

## Vistas principales

| Vista | Descripción |
|-------|-------------|
| **Home** | Listado de todas las playas con clima actual, mini-pronóstico y búsqueda por nombre/país |
| **Detalle de Lugar** | Información ampliada: clima actual, pronóstico semanal completo, estadísticas (min, max, promedio, rango térmico), y otras playas sugeridas |

---

## Rutas — Vue Router

| Ruta | Nombre | Componente | Descripción |
|------|--------|------------|-------------|
| `/` | `Home` | `Home.vue` | Listado de playas con búsqueda |
| `/lugar/:id` | `DetalleLugar` | `DetalleLugar.vue` | Detalle de una playa por su ID numérico |

La app usa `createWebHashHistory` (rutas con `#`) para compatibilidad sin servidor.

---

## Funcionalidades

- ✅ Listado de ≥ 5 lugares con clima actual
- ✅ Búsqueda/filtrado de playas con `v-model` (two-way binding)
- ✅ Selección de unidades de temperatura (°C / °F) en el header global
- ✅ Detalle de cada playa con pronóstico semanal y estadísticas
- ✅ Estadísticas calculadas: máxima, mínima, promedio, rango térmico
- ✅ Navegación con `<router-link>` y navegación programática (`$router.push`)
- ✅ Botón de volver al Home desde el Detalle
- ✅ Transiciones animadas entre vistas

---

## Estructura del proyecto

```
weather-spa/
├── index.html
├── vite.config.js
├── package.json
├── README.md
└── src/
    ├── main.js
    ├── App.vue                  # Componente raíz (header, router-view, footer)
    ├── assets/
    │   └── global.css
    ├── router/
    │   └── index.js             # Configuración de Vue Router
    ├── data/
    │   └── playas.js            # Datos mock + funciones utilitarias
    └── components/
        ├── Home.vue             # Vista principal
        └── DetalleLugar.vue     # Vista de detalle
```

---

## Instrucciones de ejecución

### Requisitos
- Node.js ≥ 16

### Instalación y ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev

# Abrir en http://localhost:5173
```

### Build de producción

```bash
npm run build
npm run preview
```

---

## Tecnologías

- **Vue.js 3** (Composition API-ready, Options API)
- **Vue Router 4**
- **Vite 5** (bundler)
- Datos mock en JavaScript puro
- CSS custom properties + Backdrop Filter

---

## Repositorio

[GitHub — CoastalClima](https://github.com/tu-usuario/coastal-clima)
# Weather-
# Weather-
