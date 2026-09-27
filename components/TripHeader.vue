<template>
  <div class="bg-parchment-50 border-b border-parchment-300 px-4 lg:px-8 py-5 shadow-xs">
    <div class="max-w-7xl mx-auto space-y-4">
      <!-- Top Breadcrumb & Status -->
      <div class="flex items-center justify-between gap-4 text-xs font-mono text-slate-500">
        <div class="flex items-center gap-2">
          <NuxtLink to="/search" class="hover:underline text-amber-800">Explore</NuxtLink>
          <span>&rsaquo;</span>
          <span class="text-slate-800 font-semibold">Kerala Coastal Escape</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="stamp-badge">Status: Planning</span>
        </div>
      </div>

      <!-- Main Trip Header & Actions Bar -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-3">
            <h1 class="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Kerala Coastal Escape ✦
            </h1>

            <!-- Collaborators -->
            <div class="flex items-center -space-x-2">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" title="Elena Vance (Owner)" class="w-7 h-7 rounded-full border-2 border-white object-cover shadow-xs" />
              <div class="w-7 h-7 rounded-full bg-amber-200 border-2 border-white text-amber-900 font-bold text-[10px] flex items-center justify-center shadow-xs">RP</div>
              <div class="w-7 h-7 rounded-full bg-teal-200 border-2 border-white text-teal-900 font-bold text-[10px] flex items-center justify-center shadow-xs">AN</div>
              <div class="w-7 h-7 rounded-full bg-slate-900 border-2 border-white text-amber-300 font-bold text-[10px] flex items-center justify-center shadow-xs">+2</div>
            </div>
          </div>

          <div class="flex items-center gap-3 text-xs text-slate-600 mt-1.5 flex-wrap">
            <span class="flex items-center gap-1 font-mono text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
              📅 Oct 12 - Oct 16 • 5 Days
            </span>
            <span class="text-slate-300">•</span>
            <span class="font-mono text-slate-700">🌿 Slow Heritage Route</span>
            <span class="text-slate-300">•</span>
            <span class="text-slate-500">14 Spots Bookmarked</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-2.5">
          <button @click="shareTrip" class="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-parchment-200 rounded-full border border-parchment-300 shadow-sm transition-colors flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span>Share</span>
          </button>

          <button @click="$emit('addActivity')" class="px-4 py-2 text-xs font-semibold text-amber-300 bg-slate-900 hover:bg-amber-700 rounded-full shadow-md transition-colors flex items-center gap-1.5">
            <span>+ Add Activity</span>
          </button>
        </div>
      </div>

      <!-- Top Sub-Navigation Tabs Bar -->
      <div class="pt-2 flex items-center justify-between border-t border-parchment-200 overflow-x-auto gap-4">
        <div class="flex items-center gap-2">
          <NuxtLink
            :to="`/trips/${tripId}`"
            class="px-4 py-2 text-xs font-semibold rounded-full transition-all flex items-center gap-2"
            :class="isTimelineActive ? 'bg-slate-900 text-amber-300 shadow-sm' : 'text-slate-700 hover:bg-parchment-200'"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span>Timeline & Map</span>
          </NuxtLink>

          <NuxtLink
            :to="`/trips/${tripId}/checklists`"
            class="px-4 py-2 text-xs font-semibold rounded-full transition-all flex items-center gap-2"
            :class="$route.path.endsWith('/checklists') ? 'bg-slate-900 text-amber-300 shadow-sm' : 'text-slate-700 hover:bg-parchment-200'"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <span>Packing & Tasks</span>
          </NuxtLink>

          <NuxtLink
            :to="`/trips/${tripId}/memories`"
            class="px-4 py-2 text-xs font-semibold rounded-full transition-all flex items-center gap-2"
            :class="$route.path.endsWith('/memories') ? 'bg-slate-900 text-amber-300 shadow-sm' : 'text-slate-700 hover:bg-parchment-200'"
          >
            <svg class="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h0.93a2 2 0 001.664-.89l0.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l0.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Memories & Journal</span>
          </NuxtLink>
        </div>

        <!-- Preparation Progress Indicator -->
        <div class="hidden sm:flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
          <div class="relative w-6 h-6 flex items-center justify-center font-bold text-[10px] text-emerald-800">
            <span>67%</span>
          </div>
          <div class="text-[11px] text-emerald-900 font-mono">
            <span class="font-bold">12/18</span> Tasks Ready
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const tripId = computed(() => route.params.tripId || 'kerala-coastal-trip-1');

const isTimelineActive = computed(() => {
  return !route.path.endsWith('/checklists') && !route.path.endsWith('/memories');
});

const shareTrip = () => {
  navigator.clipboard?.writeText(window.location.href);
  alert('Trip link copied to clipboard!');
};
</script>
