<template>
  <div class="relative w-full h-full min-h-[400px] bg-[#e5e0d8] overflow-hidden rounded-xl border border-parchment-300 shadow-inner group">
    <!-- Leaflet Map Container -->
    <div ref="mapContainer" class="w-full h-full z-0"></div>

    <!-- Retro Cartography Watermark / Vignette Overlay -->
    <div class="absolute inset-0 pointer-events-none border-[12px] border-amber-900/5 z-10"></div>

    <!-- Map Top Controls Bar -->
    <div class="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-auto">
      <div class="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-parchment-300 shadow-md">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span class="text-xs font-semibold text-slate-800 tracking-wide uppercase font-mono">
          {{ selectedCategory ? selectedCategory : 'All Map Layers' }}
        </span>
        <span class="text-[11px] font-medium text-slate-500 font-mono">({{ markers.length }} spots)</span>
      </div>

      <div class="flex items-center gap-2">
        <button
          @click="resetView"
          class="bg-white/90 backdrop-blur-md hover:bg-white text-slate-800 p-2 rounded-full border border-parchment-300 shadow-md transition-all text-xs flex items-center gap-1 font-medium"
          title="Reset Map View"
        >
          <svg class="w-4 h-4 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="hidden sm:inline">Recenter</span>
        </button>
      </div>
    </div>

    <!-- Bottom Vintage Cartography Legend & Scale -->
    <div class="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-md border border-parchment-300 shadow-sm text-[11px] font-mono text-slate-600 flex items-center gap-3 z-20 pointer-events-auto">
      <div class="flex items-center gap-1.5">
        <div class="w-6 h-1 bg-slate-900 rounded"></div>
        <span>500 m</span>
      </div>
      <span class="text-slate-300">|</span>
      <span>Fort Kochi Cartography • Wanderlust Engine</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue';

export interface MapMarker {
  id: string;
  name: string;
  category: string;
  location: { lat: number; lng: number };
  rating?: number;
  coverImage?: string;
  numberLabel?: number;
  address?: string;
}

const props = defineProps<{
  markers: MapMarker[];
  center?: { lat: number; lng: number };
  selectedId?: string | null;
  selectedCategory?: string;
  routeLine?: { lat: number; lng: number }[];
}>();

const emit = defineEmits(['select', 'inspect', 'addToTrip']);

const mapContainer = ref<HTMLDivElement | null>(null);
let L: any = null;
let mapInstance: any = null;
let leafletMarkers: any[] = [];
let routePolyline: any = null;

const defaultCenter = props.center || { lat: 9.9658, lng: 76.2421 }; // Fort Kochi default

const initMap = async () => {
  if (process.server || !mapContainer.value) return;

  try {
    if ((window as any).L) {
      L = (window as any).L;
    } else {
      L = await import('leaflet');
    }

    if (mapInstance) {
      mapInstance.remove();
    }

    mapInstance = L.map(mapContainer.value, {
      center: [defaultCenter.lat, defaultCenter.lng],
      zoom: 14,
      zoomControl: false,
    });

    // Add CartoDB Voyage Tiles (Vintage/Parchment feel)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyage/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(mapInstance);

    // Custom Zoom control at bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(mapInstance);

    renderMarkers();
    renderRoutePolyline();
  } catch (err) {
    console.error('Leaflet load error:', err);
  }
};

const renderMarkers = () => {
  if (!mapInstance || !L) return;

  // Clear existing markers
  leafletMarkers.forEach((m) => mapInstance.removeLayer(m));
  leafletMarkers = [];

  props.markers.forEach((marker) => {
    const isSelected = marker.id === props.selectedId;

    // Custom HTML Marker Icon
    const customIcon = L.divIcon({
      className: 'custom-leaflet-pin',
      html: `
        <div class="relative group cursor-pointer transition-transform duration-200 transform ${isSelected ? 'scale-125 z-50' : 'hover:scale-110 z-20'}">
          <div class="w-8 h-8 rounded-full ${isSelected ? 'bg-amber-600 ring-4 ring-amber-300' : 'bg-slate-900'} text-amber-300 flex items-center justify-center font-bold text-xs shadow-lg border border-amber-500/40">
            ${marker.numberLabel ? marker.numberLabel : '✦'}
          </div>
          <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 ${isSelected ? 'bg-amber-600' : 'bg-slate-900'} rotate-45"></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    const lMarker = L.marker([marker.location.lat, marker.location.lng], { icon: customIcon }).addTo(mapInstance);

    // Popup Card HTML with Inspect Details button
    const popupContent = `
      <div class="p-1 max-w-xs font-sans text-slate-800">
        ${marker.coverImage ? `<img src="${marker.coverImage}" class="w-full h-24 object-cover rounded-md mb-2 border border-parchment-300" />` : ''}
        <div class="flex items-center justify-between gap-2 mb-1">
          <span class="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300">
            ${marker.category}
          </span>
          ${marker.rating ? `<span class="text-xs font-semibold text-amber-700">★ ${marker.rating}</span>` : ''}
        </div>
        <h4 class="font-serif font-bold text-sm text-slate-900 leading-tight mb-1">${marker.name}</h4>
        ${marker.address ? `<p class="text-[11px] text-slate-500 mb-2 truncate">${marker.address}</p>` : ''}
        <div class="flex items-center gap-1.5 mt-2 pt-2 border-t border-parchment-200">
          <button id="inspect-btn-${marker.id}" class="flex-1 bg-slate-900 hover:bg-amber-700 text-white text-xs font-medium py-1 px-2.5 rounded text-center transition-colors">
            Inspect Details
          </button>
        </div>
      </div>
    `;

    lMarker.bindPopup(popupContent, { maxWidth: 240 });

    lMarker.on('click', () => {
      emit('select', marker.id);
    });

    lMarker.on('popupopen', () => {
      setTimeout(() => {
        const btn = document.getElementById(`inspect-btn-${marker.id}`);
        if (btn) {
          btn.onclick = () => emit('inspect', marker.id);
        }
      }, 50);
    });

    leafletMarkers.push(lMarker);
  });
};

const renderRoutePolyline = () => {
  if (!mapInstance || !L) return;

  if (routePolyline) {
    mapInstance.removeLayer(routePolyline);
    routePolyline = null;
  }

  if (props.routeLine && props.routeLine.length > 1) {
    const latLngs = props.routeLine.map((pt) => [pt.lat, pt.lng]);
    routePolyline = L.polyline(latLngs, {
      color: '#D97706',
      weight: 4,
      dashArray: '8, 8',
      opacity: 0.85,
    }).addTo(mapInstance);
  }
};

const resetView = () => {
  if (mapInstance) {
    if (props.markers.length > 0) {
      const group = L.featureGroup(leafletMarkers);
      mapInstance.fitBounds(group.getBounds().pad(0.2));
    } else {
      mapInstance.setView([defaultCenter.lat, defaultCenter.lng], 14);
    }
  }
};

watch(() => props.markers, () => {
  renderMarkers();
}, { deep: true });

watch(() => props.routeLine, () => {
  renderRoutePolyline();
}, { deep: true });

watch(() => props.selectedId, (newId) => {
  if (newId && mapInstance) {
    const target = props.markers.find((m) => m.id === newId);
    if (target) {
      mapInstance.flyTo([target.location.lat, target.location.lng], 15, { duration: 1 });
    }
  }
});

onMounted(() => {
  initMap();
});

onUnmounted(() => {
  if (mapInstance) {
    mapInstance.remove();
  }
});
</script>

<style>
.leaflet-container {
  font-family: inherit;
}
.leaflet-popup-content-wrapper {
  background: #FAF6F0;
  border: 1px solid #D9C5AA;
  border-radius: 8px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
}
.leaflet-popup-tip {
  background: #FAF6F0;
  border: 1px solid #D9C5AA;
}
</style>
