<template>
  <header class="sticky top-0 z-40 bg-parchment-50/95 backdrop-blur-md border-b border-parchment-300 px-4 lg:px-8 py-3 transition-all shadow-sm">
    <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
      <!-- Logo & Brand -->
      <NuxtLink to="/" class="flex items-center gap-2.5 group">
        <div class="w-9 h-9 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center font-serif text-lg font-bold shadow-md group-hover:rotate-12 transition-transform border border-amber-600/40">
          ✦
        </div>
        <div>
          <span class="font-serif text-xl font-bold tracking-tight text-slate-900 block leading-tight">Wanderlust</span>
          <span class="text-[10px] font-mono tracking-widest text-amber-800 uppercase block -mt-0.5">Est. Cartography 2026</span>
        </div>
      </NuxtLink>

      <!-- Search & Location Quick Bar -->
      <div class="hidden md:flex items-center gap-2 flex-1 max-w-xl bg-white border border-parchment-300 rounded-full px-3.5 py-1.5 shadow-inner">
        <!-- Location Picker Button -->
        <div class="flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-parchment-100 px-3 py-1 rounded-full border border-parchment-300 shrink-0">
          <svg class="w-3.5 h-3.5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Fort Kochi, Kerala</span>
          <svg class="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <span class="h-4 w-px bg-parchment-300"></span>

        <!-- Quick Search -->
        <div class="flex items-center gap-2 flex-1">
          <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            v-model="quickQuery"
            @keyup.enter="handleSearch"
            placeholder="Search heritage sites, cafes, stays..."
            class="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
          />
        </div>
      </div>

      <!-- Navigation Links -->
      <nav class="flex items-center gap-1 sm:gap-2">
        <NuxtLink
          to="/search"
          class="px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5"
          :class="$route.path === '/search' ? 'bg-slate-900 text-amber-300 shadow-sm' : 'text-slate-700 hover:bg-parchment-200'"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <span>Explore</span>
        </NuxtLink>

        <NuxtLink
          to="/trips/kerala-coastal-trip-1"
          class="px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5"
          :class="$route.path.startsWith('/trips') && !$route.path.endsWith('/memories') && !$route.path.endsWith('/checklists') ? 'bg-slate-900 text-amber-300 shadow-sm' : 'text-slate-700 hover:bg-parchment-200'"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Planner</span>
        </NuxtLink>

        <NuxtLink
          to="/trips/kerala-coastal-trip-1/checklists"
          class="px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 hidden lg:flex"
          :class="$route.path.endsWith('/checklists') ? 'bg-slate-900 text-amber-300 shadow-sm' : 'text-slate-700 hover:bg-parchment-200'"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <span>Checklists</span>
        </NuxtLink>

        <NuxtLink
          to="/trips/kerala-coastal-trip-1/memories"
          class="px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all flex items-center gap-1.5"
          :class="$route.path.endsWith('/memories') ? 'bg-slate-900 text-amber-300 shadow-sm' : 'text-slate-700 hover:bg-parchment-200'"
        >
          <svg class="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h0.93a2 2 0 001.664-.89l0.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l0.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Journal</span>
        </NuxtLink>

        <!-- User Profile Avatar -->
        <div class="ml-2 flex items-center gap-2 border-l border-parchment-300 pl-3">
          <div class="relative group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="Profile"
              class="w-8 h-8 rounded-full border-2 border-amber-600/40 object-cover shadow-sm"
            />
            <span class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border border-white rounded-full"></span>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSearchStore } from '~/stores/useSearchStore';

const router = useRouter();
const searchStore = useSearchStore();
const quickQuery = ref('');

const handleSearch = () => {
  if (!quickQuery.value) return;
  searchStore.query = quickQuery.value;
  searchStore.performSearch();
  if (router.currentRoute.value.path !== '/search') {
    router.push('/search');
  }
};
</script>
