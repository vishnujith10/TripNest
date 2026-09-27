<template>
  <div class="min-h-screen bg-parchment-100 flex flex-col font-sans">
    <Navbar />

    <!-- Top Retro Banner Box -->
    <div class="bg-slate-950 text-parchment-100 border-b border-slate-800 px-4 lg:px-8 py-6 shadow-lg">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs font-mono text-amber-400">
            <span class="stamp-badge border-amber-500/40 bg-amber-500/10 text-amber-300">✓ Trip Completed</span>
            <span>📅 Oct 12 - Oct 16, 2026</span>
          </div>

          <h1 class="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Kerala Coastal Journey ✦
          </h1>

          <div class="flex items-center gap-4 text-xs font-mono text-slate-300 flex-wrap">
            <span>📍 14 Places Explored</span>
            <span>•</span>
            <span>📷 32 Memories Logged</span>
            <span>•</span>
            <div class="flex items-center gap-1">
              <span class="w-5 h-5 rounded-full bg-amber-200 text-slate-900 font-bold text-[10px] flex items-center justify-center">EV</span>
              <span>+3 Collaborators</span>
            </div>
          </div>
        </div>

        <!-- Export Actions -->
        <div class="flex items-center gap-3">
          <button @click="downloadPdfRecap" class="px-4 py-2.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-full border border-slate-700 transition-colors flex items-center gap-1.5">
            <svg class="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Download PDF Recap</span>
          </button>

          <button @click="shareStoryLink" class="px-4 py-2.5 text-xs font-semibold text-slate-900 bg-amber-300 hover:bg-amber-400 rounded-full shadow-md transition-colors flex items-center gap-1.5">
            <span>Share Story Link</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Day Filter Pills Bar -->
    <div class="bg-parchment-50 border-b border-parchment-300 px-4 lg:px-8 py-3">
      <div class="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto">
        <button
          v-for="filter in dayFilters"
          :key="filter.id"
          @click="activeFilter = filter.id"
          class="px-4 py-1.5 text-xs font-semibold rounded-full transition-all whitespace-nowrap"
          :class="activeFilter === filter.id ? 'bg-slate-900 text-amber-300 shadow-xs' : 'bg-white text-slate-700 hover:bg-parchment-200 border border-parchment-300'"
        >
          {{ filter.label }} <span v-if="filter.count" class="text-[10px] opacity-75">({{ filter.count }})</span>
        </button>
      </div>
    </div>

    <!-- Main Workspace Grid -->
    <div class="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
      <!-- Left Memory Timeline Journal Feed -->
      <div class="lg:col-span-7 overflow-y-auto max-h-[calc(100vh-220px)] space-y-6 pr-2">
        <!-- Day Section Header -->
        <div class="flex items-center justify-between pb-2 border-b border-parchment-300">
          <div>
            <h2 class="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
              <span>📅 Day 1 • Fort Kochi & Mattancherry</span>
            </h2>
            <p class="text-xs text-slate-500 font-mono">Monday, Oct 12, 2026 • 8 memories captured</p>
          </div>
          <span class="stamp-badge">Sunny • 28°C</span>
        </div>

        <!-- Memory Card 1: Sunset & Fishing Nets Collage -->
        <div class="bg-white p-5 rounded-2xl border border-parchment-300 shadow-sm journal-tape space-y-4">
          <!-- Photo Collage Grid -->
          <div class="grid grid-cols-3 gap-2">
            <div class="col-span-2 rounded-xl overflow-hidden shadow-polaroid border-2 border-white h-52">
              <img src="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80" alt="Sunset Nets" class="w-full h-full object-cover" />
            </div>
            <div class="grid grid-rows-2 gap-2 h-52">
              <div class="rounded-lg overflow-hidden border border-parchment-200">
                <img src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=400&q=80" alt="Palace" class="w-full h-full object-cover" />
              </div>
              <div class="rounded-lg overflow-hidden border border-parchment-200">
                <img src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80" alt="Church" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <!-- Handwritten / Serif Journal Quote -->
          <blockquote class="bg-parchment-100/90 p-4 rounded-xl border-l-4 border-amber-700 text-slate-900 font-serif italic text-sm leading-relaxed">
            "The sunset near the Chinese fishing nets was serene. Met local artists along the promenade showcasing handmade woodblock prints."
            <footer class="mt-2 text-right text-[11px] font-mono text-slate-500 not-italic">
              Logged by Elena Vance • 6:15 PM
            </footer>
          </blockquote>

          <!-- Metadata Tags & Social Reaction Bar -->
          <div class="flex items-center justify-between pt-2 border-t border-parchment-200 text-xs flex-wrap gap-2">
            <div class="flex items-center gap-1.5 flex-wrap font-mono text-[11px]">
              <span class="bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                📍 Chinese Fishing Nets • 05:45 PM
              </span>
              <span class="bg-parchment-200 text-slate-700 px-2 py-0.5 rounded">🌅 Golden Hour</span>
              <span class="bg-parchment-200 text-slate-700 px-2 py-0.5 rounded">📷 3 Photos</span>
            </div>

            <div class="flex items-center gap-3 font-mono text-slate-600">
              <button @click="m1Likes++" class="hover:text-rose-600 flex items-center gap-1">
                <span>♥</span> <span>{{ m1Likes }}</span>
              </button>
              <button class="hover:text-amber-800 flex items-center gap-1">
                <span>💬</span> <span>3</span>
              </button>
              <button class="hover:text-amber-800">🔖</button>
            </div>
          </div>
        </div>

        <!-- Memory Card 2: Courtyard Cafe -->
        <div class="bg-white p-5 rounded-2xl border border-parchment-300 shadow-sm journal-tape space-y-4">
          <div class="rounded-xl overflow-hidden shadow-polaroid border-2 border-white h-60">
            <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80" alt="Kashi Art Cafe" class="w-full h-full object-cover" />
          </div>

          <blockquote class="bg-parchment-100/90 p-4 rounded-xl border-l-4 border-amber-700 text-slate-900 font-serif italic text-sm leading-relaxed">
            "Fresh pour-over coffee and ginger cake at Kashi Art Cafe. The shaded courtyard was an oasis from midday humidity."
            <footer class="mt-2 text-right text-[11px] font-mono text-slate-500 not-italic">
              Logged by Elena Vance • 1:15 PM
            </footer>
          </blockquote>

          <div class="flex items-center justify-between pt-2 border-t border-parchment-200 text-xs flex-wrap gap-2">
            <div class="flex items-center gap-1.5 flex-wrap font-mono text-[11px]">
              <span class="bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                ☕️ Kashi Art Cafe • 12:30 PM
              </span>
              <span class="bg-parchment-200 text-slate-700 px-2 py-0.5 rounded">☕️ Artisan Coffee</span>
              <span class="bg-parchment-200 text-slate-700 px-2 py-0.5 rounded">🌿 Courtyard Vibes</span>
            </div>

            <div class="flex items-center gap-3 font-mono text-slate-600">
              <button @click="m2Likes++" class="hover:text-rose-600 flex items-center gap-1">
                <span>♥</span> <span>{{ m2Likes }}</span>
              </button>
              <button class="hover:text-amber-800 flex items-center gap-1">
                <span>💬</span> <span>2</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Add New Photo or Journal Note Logger -->
        <div class="bg-parchment-200/80 p-5 rounded-2xl border border-dashed border-parchment-400 space-y-3">
          <h3 class="font-serif font-bold text-sm text-slate-900 flex items-center gap-2">
            <span>📷 Add Photo or Journal Note</span>
          </h3>

          <textarea
            v-model="newJournalText"
            placeholder="Drop new high-res photos or jot down memorable sounds and tastes from today..."
            rows="3"
            class="w-full text-xs p-3 rounded-xl bg-white border border-parchment-300 placeholder-slate-400 focus:outline-none focus:border-amber-600"
          ></textarea>

          <div class="flex items-center justify-between flex-wrap gap-2">
            <div class="flex items-center gap-2">
              <button @click="triggerPhotoUpload" class="px-3 py-1.5 bg-white border border-parchment-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-parchment-100 flex items-center gap-1">
                <span>📷 Upload Photos</span>
              </button>
              <select v-model="selectedPlaceId" class="text-xs font-mono bg-white border border-parchment-300 rounded-lg px-2 py-1.5 text-slate-700">
                <option value="">Tag Location...</option>
                <option value="p2">Chinese Fishing Nets</option>
                <option value="p1">Mattancherry Palace</option>
                <option value="p4">Kashi Art Cafe</option>
              </select>
            </div>

            <button @click="postMemory" class="px-5 py-2 bg-slate-900 hover:bg-amber-700 text-amber-300 text-xs font-semibold rounded-full shadow-md transition-colors">
              Log Memory
            </button>
          </div>
        </div>
      </div>

      <!-- Right Panel: Interactive Memory Map -->
      <div class="lg:col-span-5 space-y-4">
        <!-- Interactive Map Container -->
        <div class="h-[450px] relative rounded-2xl overflow-hidden border border-parchment-300 shadow-md">
          <InteractiveMap
            :markers="memoryMapMarkers"
            :center="{ lat: 9.962, lng: 76.248 }"
          />

          <!-- Top Overlay Banner -->
          <div class="absolute top-4 left-4 right-4 z-20 pointer-events-none">
            <div class="bg-white/95 backdrop-blur-md p-3 rounded-xl border border-parchment-300 shadow-md flex items-center justify-between pointer-events-auto">
              <span class="text-xs font-mono font-bold text-slate-800">🧭 Interactive Map • Click pin to jump to photos</span>
            </div>
          </div>

          <!-- Bottom Floating Memory Stats Widget -->
          <div class="absolute bottom-4 left-4 right-4 z-20 pointer-events-none">
            <div class="bg-white/95 backdrop-blur-md p-3 rounded-xl border border-parchment-300 shadow-xl flex items-center justify-between gap-3 pointer-events-auto">
              <div>
                <h4 class="font-serif font-bold text-xs text-slate-900">4 Checkpoints Visited</h4>
                <p class="text-[10px] text-slate-500 font-mono">📍 6.2 km walked • Fort Kochi</p>
              </div>
              <button @click="playRelive" class="px-3 py-1.5 bg-slate-900 hover:bg-amber-700 text-amber-300 text-xs font-semibold rounded-full shadow-sm transition-colors flex items-center gap-1">
                <span>▶ Play Relive</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Story Export Banner Box -->
        <div class="bg-white p-4 rounded-xl border border-parchment-300 shadow-sm flex items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-serif font-bold text-lg">
              📖
            </div>
            <div>
              <h4 class="font-serif font-bold text-xs text-slate-900">Story Export</h4>
              <p class="text-[10px] text-slate-500 font-mono">Ready to compile into coffee table book</p>
            </div>
          </div>
          <button @click="previewBook" class="text-xs font-semibold text-amber-800 hover:underline">
            Preview &rsaquo;
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Navbar from '~/components/Navbar.vue';
import InteractiveMap from '~/components/InteractiveMap.vue';

const activeFilter = ref('all');
const m1Likes = ref(12);
const m2Likes = ref(8);
const newJournalText = ref('');
const selectedPlaceId = ref('');

const dayFilters = [
  { id: 'all', label: 'All Memories', count: 32 },
  { id: 'd1', label: 'Day 1: Fort Kochi', count: 8 },
  { id: 'd2', label: 'Day 2: Alleppey Backwaters', count: 14 },
  { id: 'd3', label: 'Day 3: Marari Beach', count: 10 },
];

const memoryMapMarkers = [
  {
    id: 'm1',
    name: 'Chinese Fishing Nets Sunset',
    category: 'Golden Hour',
    location: { lat: 9.967, lng: 76.241 },
    coverImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=400&q=80',
    numberLabel: 1,
  },
  {
    id: 'm2',
    name: 'Mattancherry Courtyard',
    category: 'Heritage',
    location: { lat: 9.958, lng: 76.259 },
    coverImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=400&q=80',
    numberLabel: 2,
  },
  {
    id: 'm3',
    name: 'Kashi Art Cafe',
    category: 'Coffee',
    location: { lat: 9.964, lng: 76.244 },
    coverImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80',
    numberLabel: 3,
  },
];

const triggerPhotoUpload = () => {
  alert('Opened Photo Gallery Upload Picker!');
};

const postMemory = () => {
  if (!newJournalText.value) return;
  alert('Memory logged successfully to Kerala Coastal Journey!');
  newJournalText.value = '';
};

const playRelive = () => {
  alert('Launching Relive 3D Animated Video Slideshow!');
};

const previewBook = () => {
  alert('Opening Coffee Table Book Layout Preview...');
};

const downloadPdfRecap = () => {
  alert('Generating High-Res PDF Journal Printable...');
};

const shareStoryLink = () => {
  navigator.clipboard?.writeText(window.location.href);
  alert('Story Link copied to clipboard!');
};
</script>
