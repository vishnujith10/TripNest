<template>
  <div class="min-h-screen bg-parchment-100 flex flex-col font-sans">
    <Navbar />

    <!-- Hero Header -->
    <div class="bg-slate-950 text-parchment-100 py-16 px-4 lg:px-8 border-b border-slate-800 relative overflow-hidden">
      <div class="max-w-5xl mx-auto space-y-6 text-center relative z-10">
        <span class="stamp-badge border-amber-500/40 bg-amber-500/10 text-amber-300">
          ✦ Cartography & Travel Memories Engine
        </span>

        <h1 class="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
          Craft Nostalgic Journeys & Vintage Cartography
        </h1>

        <p class="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
          Plan full-stack travel itineraries, explore heritage sites with interactive split-screen maps, organize preparation checklists, and log post-trip journal memories.
        </p>

        <div class="flex items-center justify-center gap-4 pt-4 flex-wrap">
          <NuxtLink
            to="/search"
            class="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-full shadow-lg transition-all flex items-center gap-2"
          >
            <span>🔍 Launch Map Explorer</span>
          </NuxtLink>

          <NuxtLink
            to="/trips/kerala-coastal-trip-1"
            class="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-full border border-slate-700 transition-all flex items-center gap-2"
          >
            <span>🎒 Open Trip Planner</span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- 5 Hubs Showcase Grid -->
    <div class="max-w-7xl mx-auto w-full p-6 lg:p-12 space-y-8">
      <div class="text-center space-y-2">
        <h2 class="font-serif font-bold text-2xl sm:text-3xl text-slate-900">Explore the 5 Core Platform Views</h2>
        <p class="text-xs font-mono text-slate-500">Curated travel workspace designed with retro paper & journal aesthetics</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Card 1 -->
        <NuxtLink to="/search" class="polaroid-card group space-y-3 block">
          <div class="rounded-lg overflow-hidden h-40 border border-parchment-200 relative">
            <img src="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80" alt="Search Map" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            <span class="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-amber-300 text-[10px] font-mono px-2 py-0.5 rounded">
              View 1
            </span>
          </div>
          <h3 class="font-serif font-bold text-lg text-slate-900 group-hover:text-amber-800">1. Split-Screen Search & Map Explorer</h3>
          <p class="text-xs text-slate-600 font-sans leading-relaxed">
            Search heritage sites, cafes, and stays with custom Leaflet cartography map pins and instant filter pills.
          </p>
        </NuxtLink>

        <!-- Card 2 -->
        <NuxtLink to="/places/p1" class="polaroid-card group space-y-3 block">
          <div class="rounded-lg overflow-hidden h-40 border border-parchment-200 relative">
            <img src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80" alt="Place Details" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            <span class="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-amber-300 text-[10px] font-mono px-2 py-0.5 rounded">
              View 2
            </span>
          </div>
          <h3 class="font-serif font-bold text-lg text-slate-900 group-hover:text-amber-800">2. Place Details Slide-Over Hub</h3>
          <p class="text-xs text-slate-600 font-sans leading-relaxed">
            Heritage site narrative, UNESCO tags, crowd density histogram, photo gallery polaroids, and itinerary action bar.
          </p>
        </NuxtLink>

        <!-- Card 3 -->
        <NuxtLink to="/trips/kerala-coastal-trip-1" class="polaroid-card group space-y-3 block">
          <div class="rounded-lg overflow-hidden h-40 border border-parchment-200 relative">
            <img src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80" alt="Trip Workspace" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            <span class="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-amber-300 text-[10px] font-mono px-2 py-0.5 rounded">
              View 3
            </span>
          </div>
          <h3 class="font-serif font-bold text-lg text-slate-900 group-hover:text-amber-800">3. Trip Planner & Route Workspace</h3>
          <p class="text-xs text-slate-600 font-sans leading-relaxed">
            Multi-day itinerary timeline with transit connectors, numbered route polylines, weather stats, and current stop popup.
          </p>
        </NuxtLink>

        <!-- Card 4 -->
        <NuxtLink to="/trips/kerala-coastal-trip-1/checklists" class="polaroid-card group space-y-3 block">
          <div class="rounded-lg overflow-hidden h-40 border border-parchment-200 relative">
            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80" alt="Checklists" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            <span class="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-amber-300 text-[10px] font-mono px-2 py-0.5 rounded">
              View 4
            </span>
          </div>
          <h3 class="font-serif font-bold text-lg text-slate-900 group-hover:text-amber-800">4. Trip Checklists & Bucket List Hub</h3>
          <p class="text-xs text-slate-600 font-sans leading-relaxed">
            3-Column Kanban board featuring unassigned places bucket list, saved heritage lodging, and preparation task tracker.
          </p>
        </NuxtLink>

        <!-- Card 5 -->
        <NuxtLink to="/trips/kerala-coastal-trip-1/memories" class="polaroid-card group space-y-3 block">
          <div class="rounded-lg overflow-hidden h-40 border border-parchment-200 relative">
            <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80" alt="Memories Journal" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            <span class="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-amber-300 text-[10px] font-mono px-2 py-0.5 rounded">
              View 5
            </span>
          </div>
          <h3 class="font-serif font-bold text-lg text-slate-900 group-hover:text-amber-800">5. Post-Trip Memories & Journal Hub</h3>
          <p class="text-xs text-slate-600 font-sans leading-relaxed">
            Scrapbook polaroid gallery, handwritten journal quotes, memory map nodes, relive video generator, and coffee table book exporter.
          </p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from '~/components/Navbar.vue';
</script>
