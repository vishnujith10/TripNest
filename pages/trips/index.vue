<template>
  <div class="min-h-screen bg-parchment-100 flex flex-col font-sans">
    <Navbar />
    <div class="max-w-5xl mx-auto w-full p-8 space-y-6">
      <div class="flex items-center justify-between border-b border-parchment-300 pb-4">
        <div>
          <h1 class="font-serif font-bold text-3xl text-slate-900">Your Saved Journeys</h1>
          <p class="text-xs font-mono text-slate-500">Travel planners & cartography journals</p>
        </div>
        <NuxtLink to="/trips/kerala-coastal-trip-1" class="px-5 py-2.5 bg-slate-900 text-amber-300 font-semibold text-xs rounded-full shadow-md">
          Open Kerala Trip
        </NuxtLink>
      </div>

      <NuxtLink to="/trips/kerala-coastal-trip-1" class="polaroid-card block p-6 space-y-3 hover:border-amber-500 transition-all">
        <div class="flex items-center justify-between">
          <span class="stamp-badge">Status: Planning</span>
          <span class="text-xs font-mono text-amber-800">Oct 12 - Oct 16, 2026 • 5 Days</span>
        </div>
        <h2 class="font-serif font-bold text-2xl text-slate-900">Kerala Coastal Escape ✦</h2>
        <p class="text-xs text-slate-600 font-sans">
          Fort Kochi heritage walk, Chinese fishing nets at sunset, Alleppey backwater cruise, and Marari beach sunsets.
        </p>
        <div class="flex items-center gap-4 text-xs font-mono text-slate-500 pt-2 border-t border-parchment-200">
          <span>📍 14 Spots Bookmarked</span>
          <span>•</span>
          <span>📋 12/18 Tasks Completed</span>
          <span>•</span>
          <span>📷 32 Memories</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from '~/components/Navbar.vue';
</script>
