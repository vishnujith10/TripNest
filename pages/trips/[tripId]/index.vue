<template>
  <div class="min-h-screen bg-parchment-100 flex flex-col font-sans">
    <Navbar />
    <TripHeader @addActivity="openAddModal" />

    <!-- Day Selector Bar -->
    <div class="bg-parchment-50 border-b border-parchment-300 px-4 lg:px-8 py-3">
      <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div class="flex items-center gap-2 overflow-x-auto">
          <button
            v-for="day in days"
            :key="day.id"
            @click="activeDayId = day.id"
            class="px-4 py-1.5 text-xs font-semibold rounded-full transition-all whitespace-nowrap flex items-center gap-1.5"
            :class="activeDayId === day.id ? 'bg-slate-900 text-amber-300 shadow-xs' : 'bg-white text-slate-700 hover:bg-parchment-200 border border-parchment-300'"
          >
            <span>Day {{ day.dayNumber }} • {{ day.dateLabel }}</span>
          </button>
          <NuxtLink
            to="/trips/kerala-coastal-trip-1/checklists"
            class="px-4 py-1.5 text-xs font-semibold rounded-full bg-amber-100/80 text-amber-900 hover:bg-amber-200 border border-amber-300 transition-colors flex items-center gap-1 shrink-0"
          >
            <span>Bucket List</span>
            <span class="w-4 h-4 rounded-full bg-amber-800 text-white font-mono text-[10px] flex items-center justify-center">4</span>
          </NuxtLink>
        </div>

        <div class="hidden md:flex items-center gap-2 text-xs font-mono text-slate-500">
          <span>Transit Summary: 4.8 km • 3 Stops</span>
        </div>
      </div>
    </div>

    <!-- Main Workspace Split Container -->
    <div class="flex-1 flex flex-col lg:flex-row overflow-hidden max-w-7xl mx-auto w-full p-4 lg:p-6 gap-6">
      <!-- Left Timeline & Route Planner Panel -->
      <div class="w-full lg:w-7/12 overflow-y-auto max-h-[calc(100vh-210px)] space-y-6 pr-2">
        <!-- Curated Destination Route Banner Box -->
        <div class="bg-slate-900 text-parchment-100 p-6 rounded-2xl shadow-lg border border-slate-800 journal-tape space-y-3 relative overflow-hidden">
          <div class="flex items-center justify-between text-xs font-mono text-amber-400">
            <span class="uppercase tracking-widest bg-amber-400/10 px-2.5 py-0.5 rounded border border-amber-400/30">Curated Destination Route</span>
            <span>⏱ 09:00 - 16:30</span>
          </div>

          <h2 class="font-serif font-bold text-2xl sm:text-3xl text-white tracking-tight">
            {{ activeDay.title }}
          </h2>
          <p class="text-xs text-slate-300 font-sans leading-relaxed">
            {{ activeDay.description }}
          </p>

          <div class="flex items-center gap-3 text-xs pt-2 flex-wrap text-amber-200/90 font-mono">
            <span class="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded border border-slate-700">
              ☀️ 29°C • Sunny Breeze
            </span>
            <span class="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded border border-slate-700">
              📍 4.8 km total transit
            </span>
            <span class="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded border border-slate-700">
              ⏱ ~5.5 hrs active time
            </span>
          </div>
        </div>

        <!-- Itinerary Timeline List -->
        <div class="space-y-4">
          <div
            v-for="(item, idx) in activeDay.items"
            :key="item.id"
            class="relative flex items-start gap-3 group"
          >
            <!-- Timeline Number Badge -->
            <div class="w-8 h-8 rounded-full bg-slate-900 text-amber-300 font-bold text-xs flex items-center justify-center shadow-md border border-amber-500/40 shrink-0 mt-2 z-10">
              {{ idx + 1 }}
            </div>

            <!-- Item Card -->
            <div class="flex-1 bg-white p-4 rounded-xl border border-parchment-300 shadow-sm hover:shadow-md transition-all space-y-3">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-parchment-200 pb-2">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {{ item.startTime }}
                  </span>
                  <span class="text-xs text-slate-500 font-mono">⏱ {{ item.duration }}</span>
                </div>

                <div class="flex items-center gap-2">
                  <button @click="toggleComplete(item)" class="p-1 text-slate-400 hover:text-emerald-600 transition-colors" :class="item.isCompleted ? 'text-emerald-600' : ''">
                    <svg class="w-5 h-5" :fill="item.isCompleted ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  <button class="p-1 text-slate-400 hover:text-slate-700 cursor-grab">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="flex gap-3">
                <img :src="item.place.coverImage" :alt="item.place.name" class="w-20 h-20 rounded-lg object-cover border border-parchment-300 shrink-0" />
                <div class="space-y-1 flex-1">
                  <h3 class="font-serif font-bold text-base text-slate-900 leading-snug">{{ item.place.name }}</h3>
                  <p class="text-xs text-slate-600 line-clamp-2">{{ item.place.description }}</p>
                  <div class="flex items-center gap-2 pt-1 flex-wrap">
                    <span v-for="tag in item.tags" :key="tag" class="text-[10px] font-mono bg-parchment-200 text-slate-700 px-2 py-0.5 rounded">
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Transit Connector Bar if next item exists -->
              <div v-if="idx < activeDay.items.length - 1" class="pt-2 border-t border-dashed border-parchment-300 flex items-center justify-between text-[11px] font-mono text-slate-500 bg-parchment-50 p-2 rounded">
                <span class="flex items-center gap-1.5 text-amber-800 font-semibold">
                  🚗 10 min drive (3.2 km) via Bazaar Rd
                </span>
                <span class="text-slate-400">Next stop in 15 mins</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Add Activity Button -->
        <button
          @click="openAddModal"
          class="w-full py-3 bg-white hover:bg-parchment-50 text-slate-700 font-semibold text-xs rounded-xl border border-dashed border-parchment-400 shadow-sm transition-all flex items-center justify-center gap-2 group"
        >
          <span class="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center group-hover:bg-slate-900 group-hover:text-amber-300 transition-colors">+</span>
          <span>Add Attraction or Custom Activity to {{ activeDay.title }}</span>
        </button>
      </div>

      <!-- Right Interactive Cartographic Route Map -->
      <div class="w-full lg:w-5/12 h-[500px] lg:h-auto relative">
        <InteractiveMap
          :markers="activeDayMarkers"
          :routeLine="activeDayCoordinates"
          :selectedId="activeSelectedMarkerId"
        />

        <!-- Top Route Navigation Bar Overlay -->
        <div class="absolute top-4 left-4 right-4 z-20 pointer-events-none">
          <div class="bg-white/90 backdrop-blur-md p-3 rounded-xl border border-parchment-300 shadow-md flex items-center justify-between pointer-events-auto">
            <div class="flex items-center gap-2 text-xs font-mono text-slate-800">
              <span class="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
              <span class="font-bold">Fort Kochi • Route Navigation</span>
            </div>
            <span class="text-[11px] font-mono text-slate-500">3 stops • 45 min transit • 4.8 km</span>
          </div>
        </div>

        <!-- Floating Current Stop Card Widget -->
        <div class="absolute bottom-4 left-4 right-4 z-20 pointer-events-none">
          <div class="bg-white/95 backdrop-blur-md p-3 rounded-xl border border-parchment-300 shadow-xl flex items-center justify-between gap-3 pointer-events-auto">
            <div class="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=200&q=80" alt="Mattancherry Palace" class="w-12 h-12 rounded-lg object-cover border border-parchment-300" />
              <div>
                <span class="text-[9px] font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">CURRENT STOP • STOP 2</span>
                <h4 class="font-serif font-bold text-xs text-slate-900 mt-0.5">Mattancherry Palace</h4>
                <p class="text-[10px] text-slate-500 font-mono">🎟 E-Ticket verified • ₹25 entry</p>
              </div>
            </div>
            <button @click="openPlaceDetailsForCurrent" class="text-xs font-semibold text-amber-800 hover:underline">
              Inspect &rsaquo;
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Navbar from '~/components/Navbar.vue';
import TripHeader from '~/components/TripHeader.vue';
import InteractiveMap from '~/components/InteractiveMap.vue';

const activeDayId = ref('d1');
const activeSelectedMarkerId = ref('p2');

const days = [
  {
    id: 'd1',
    dayNumber: 1,
    dateLabel: 'Mon, Oct 12',
    title: 'Day 1: Fort Kochi Heritage Walk',
    description: 'Historic Portuguese settlements, iconic cantilever fishing nets against morning tides, and spice-scented alleyways.',
    items: [
      {
        id: 'i1',
        startTime: '09:30 AM',
        duration: '1 hr 30 min',
        isCompleted: true,
        tags: ['Sight • Coastal', 'Catch morning catch weighing', 'Riverine walkway access'],
        place: {
          id: 'p2',
          name: 'Fort Kochi Beach & Chinese Fishing Nets',
          description: 'Witness fishermen operate massive 14th-century cantilevered fishing mechanisms along the harbor.',
          coverImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80',
          location: { lat: 9.967, lng: 76.241 },
        },
      },
      {
        id: 'i2',
        startTime: '11:00 AM',
        duration: '1 hr 15 min',
        isCompleted: false,
        tags: ['Museum • Architecture', 'Pass booked • ₹25 Entry', 'Courtyard murals'],
        place: {
          id: 'p1',
          name: 'Mattancherry Palace (Dutch Palace)',
          description: 'Built by the Portuguese in 1555 and renovated by the Dutch. Renowned for vibrant tempera murals.',
          coverImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80',
          location: { lat: 9.958, lng: 76.259 },
        },
      },
      {
        id: 'i3',
        startTime: '01:00 PM',
        duration: '1 hr 00 min',
        isCompleted: false,
        tags: ['Dining • Artisan Cafe', 'Cold brew coffee', 'Shaded courtyard'],
        place: {
          id: 'p4',
          name: 'Kashi Art Cafe & Courtyard',
          description: 'Relaxed bohemian art gallery cafe serving organic pies and pour-over coffee in a lush greenery courtyard.',
          coverImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
          location: { lat: 9.964, lng: 76.244 },
        },
      },
    ],
  },
  {
    id: 'd2',
    dayNumber: 2,
    dateLabel: 'Tue, Oct 13',
    title: 'Day 2: Alleppey Backwater Cruise',
    description: 'Serene luxury houseboat navigation across Vembanad Lake through emerald palm-lined canals.',
    items: [],
  },
  {
    id: 'd3',
    dayNumber: 3,
    dateLabel: 'Wed, Oct 14',
    title: 'Day 3: Marari Beach Sunset & Spice Bazaar',
    description: 'Tranquil white sand beaches followed by artisanal spice shopping in ancient Jew Town.',
    items: [],
  },
];

const activeDay = computed(() => days.find((d) => d.id === activeDayId.value) || days[0]);

const activeDayMarkers = computed(() => {
  return activeDay.value.items.map((item, idx) => ({
    id: item.place.id,
    name: item.place.name,
    category: item.tags[0] || 'Stop',
    location: item.place.location,
    coverImage: item.place.coverImage,
    numberLabel: idx + 1,
  }));
});

const activeDayCoordinates = computed(() => {
  return activeDay.value.items.map((item) => item.place.location);
});

const toggleComplete = (item: any) => {
  item.isCompleted = !item.isCompleted;
};

const openAddModal = () => {
  alert('Opened Add Activity Dialog for ' + activeDay.value.title);
};

const openPlaceDetailsForCurrent = () => {
  alert('Inspecting Mattancherry Palace');
};
</script>
