<template>
  <div class="min-h-screen bg-parchment-100 flex flex-col font-sans">
    <Navbar />

    <!-- Split Page Layout -->
    <div class="flex-1 flex flex-col lg:flex-row overflow-hidden">
      <!-- Left Cartographic Context Map -->
      <div class="w-full lg:w-5/12 h-[350px] lg:h-auto border-r border-parchment-300 relative">
        <InteractiveMap
          :markers="[currentPlaceMarker]"
          :center="currentPlace.location"
          :selectedId="currentPlace.id"
        />
        <div class="absolute bottom-4 left-4 right-4 z-20 pointer-events-none">
          <div class="bg-white/95 backdrop-blur-md p-3 rounded-xl border border-parchment-300 shadow-lg pointer-events-auto">
            <span class="text-[10px] font-mono uppercase text-amber-800 tracking-wider block mb-1">📍 Selected Context Landmark</span>
            <h4 class="font-serif font-bold text-sm text-slate-900">{{ currentPlace.name }}</h4>
            <p class="text-xs text-slate-500 font-mono">{{ currentPlace.address }}</p>
          </div>
        </div>
      </div>

      <!-- Right Full Heritage Slide-Over Hub Panel -->
      <div class="w-full lg:w-7/12 p-6 lg:p-8 overflow-y-auto max-h-[calc(100vh-64px)] space-y-6 bg-parchment-50">
        <!-- Top Breadcrumbs & Actions Bar -->
        <div class="flex items-center justify-between gap-4 text-xs">
          <div class="flex items-center gap-2 font-mono text-slate-500">
            <NuxtLink to="/search" class="hover:underline text-amber-800">Places</NuxtLink>
            <span>&rsaquo;</span>
            <span>Kochi</span>
            <span>&rsaquo;</span>
            <span class="font-bold text-slate-800">{{ currentPlace.name }}</span>
          </div>

          <div class="flex items-center gap-2">
            <button class="px-3 py-1 bg-white hover:bg-parchment-200 border border-parchment-300 rounded-full text-slate-700 transition-colors">
              Share
            </button>
            <button @click="isFavorite = !isFavorite" class="px-3 py-1 bg-white hover:bg-parchment-200 border border-parchment-300 rounded-full text-slate-700 transition-colors" :class="isFavorite ? 'text-rose-600 font-bold' : ''">
              ♥ {{ isFavorite ? 'Saved' : 'Save' }}
            </button>
          </div>
        </div>

        <!-- Hero Photo Gallery Collage -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div class="md:col-span-2 rounded-xl overflow-hidden shadow-polaroid border-4 border-white h-72">
            <img :src="currentPlace.coverImage" :alt="currentPlace.name" class="w-full h-full object-cover" />
          </div>
          <div class="grid grid-rows-2 gap-3 h-72">
            <div class="rounded-lg overflow-hidden border border-parchment-300">
              <img src="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80" alt="Courtyard" class="w-full h-full object-cover" />
            </div>
            <div class="rounded-lg overflow-hidden border border-parchment-300 relative group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80" alt="Murals" class="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all" />
              <div class="absolute inset-0 flex items-center justify-center bg-slate-900/40">
                <span class="text-xs font-semibold text-white tracking-wide bg-slate-900/80 px-2.5 py-1 rounded-full border border-white/20">
                  📷 +12 Photos
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Header Info -->
        <div class="space-y-2">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="stamp-badge">🏛️ {{ currentPlace.category }}</span>
            <span class="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded border border-emerald-300">
              ● Open Now • Closes 5:00 PM
            </span>
          </div>

          <h1 class="font-serif text-3xl font-bold text-slate-900 tracking-tight">{{ currentPlace.name }}</h1>
          <p class="text-xs text-slate-600 font-mono">{{ currentPlace.address }} • 1.8 km from center</p>

          <div class="flex items-center gap-4 text-xs pt-1">
            <div class="flex items-center gap-1 font-bold text-slate-900">
              <span class="text-amber-500">★</span>
              <span>{{ currentPlace.rating }}</span>
              <span class="text-slate-500 font-normal">(1,420 reviews)</span>
            </div>
            <span class="text-slate-300">•</span>
            <span class="text-amber-800 font-medium bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
              UNESCO Tentative Heritage
            </span>
          </div>
        </div>

        <!-- Quick Stats Grid -->
        <div class="grid grid-cols-3 gap-3 bg-white p-4 rounded-xl border border-parchment-300 shadow-sm text-center">
          <div>
            <span class="text-[10px] uppercase font-mono text-slate-400 block">Est. Time</span>
            <span class="text-sm font-bold text-slate-900">1.5 - 2 Hours</span>
          </div>
          <div class="border-x border-parchment-200">
            <span class="text-[10px] uppercase font-mono text-slate-400 block">Best Visit</span>
            <span class="text-sm font-bold text-slate-900">09:00 - 11:00 AM</span>
          </div>
          <div>
            <span class="text-[10px] uppercase font-mono text-slate-400 block">Entry Fee</span>
            <span class="text-sm font-bold text-amber-800">₹25 / person</span>
          </div>
        </div>

        <!-- Detailed Historical Narrative -->
        <div class="space-y-3 border-t border-parchment-300 pt-4">
          <h3 class="font-serif font-bold text-lg text-slate-900">About the Heritage Site</h3>
          <p class="text-sm text-slate-700 leading-relaxed font-sans">
            Built around 1555 by the Portuguese as a goodwill gift to the Raja of Kochi, Veera Kerala Varma, this majestic palace represents an exquisite crossroads of colonial European fortification and indigenous Kerala timber temple architecture.
          </p>
          <p class="text-sm text-slate-700 leading-relaxed font-sans">
            The double-storeyed palace stands renowned worldwide for its extraordinary 16th- to 17th-century Hindu mythological tempera murals. Spanning more than 300 square feet across the King's bedchamber and adjoining corridors.
          </p>
        </div>

        <!-- Sticky Action Bar -->
        <div class="bg-white p-4 rounded-xl border border-parchment-300 shadow-md flex items-center justify-between gap-4">
          <div class="text-xs">
            <span class="font-bold text-slate-900 block">Select Itinerary Day</span>
            <span class="text-slate-500 font-mono">Kerala Coastal Escape (Oct 2026)</span>
          </div>
          <button @click="addToItinerary" class="bg-slate-900 hover:bg-amber-700 text-amber-300 font-semibold text-xs px-6 py-2.5 rounded-full transition-all">
            {{ isAdded ? '✓ Added to Itinerary!' : '+ Add to Day Itinerary' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Navbar from '~/components/Navbar.vue';
import InteractiveMap from '~/components/InteractiveMap.vue';

const isFavorite = ref(false);
const isAdded = ref(false);

const currentPlace = {
  id: 'p1',
  name: 'Mattancherry Palace (Dutch Palace)',
  category: '16th-Century Architecture',
  address: 'Palace Road, Mattancherry, Kochi, Kerala 682002',
  rating: 4.7,
  coverImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
  location: { lat: 9.958, lng: 76.259 },
};

const currentPlaceMarker = computed(() => ({
  id: currentPlace.id,
  name: currentPlace.name,
  category: currentPlace.category,
  location: currentPlace.location,
  rating: currentPlace.rating,
  coverImage: currentPlace.coverImage,
  address: currentPlace.address,
}));

const addToItinerary = () => {
  isAdded.value = true;
  setTimeout(() => {
    isAdded.value = false;
  }, 2500);
};
</script>
