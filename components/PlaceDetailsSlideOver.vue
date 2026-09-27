<template>
  <Teleport to="body">
    <!-- Backdrop overlay -->
    <div
      v-if="isOpen"
      @click="close"
      class="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 transition-opacity duration-300"
    ></div>

    <!-- Slide-Over Drawer Container -->
    <div
      v-if="isOpen"
      class="fixed top-0 right-0 bottom-0 w-full max-w-2xl bg-parchment-50 border-l border-parchment-300 shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out overflow-hidden"
    >
      <!-- Top Navigation Header -->
      <div class="sticky top-0 z-30 bg-parchment-100/95 backdrop-blur-md px-6 py-4 border-b border-parchment-300 flex items-center justify-between gap-4">
        <div class="flex items-center gap-2 text-xs font-mono text-slate-500 overflow-x-auto">
          <span>Places</span>
          <span>&rsaquo;</span>
          <span>Kochi</span>
          <span>&rsaquo;</span>
          <span class="font-bold text-slate-800 truncate">{{ place?.name || 'Heritage Spot' }}</span>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <button class="p-2 rounded-full hover:bg-parchment-200 text-slate-600 transition-colors" title="Share Spot">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
          <button @click="toggleFavorite" class="p-2 rounded-full hover:bg-parchment-200 text-slate-600 transition-colors" :class="isFavorite ? 'text-rose-600' : ''">
            <svg class="w-4 h-4" :fill="isFavorite ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
            </svg>
          </button>
          <button @click="close" class="p-2 rounded-full hover:bg-parchment-300 text-slate-700 transition-colors">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Scrollable Main Content -->
      <div class="flex-1 overflow-y-auto p-6 space-y-6">
        <!-- Hero Polaroid Gallery -->
        <div class="space-y-3">
          <div class="relative rounded-xl overflow-hidden shadow-polaroid border-4 border-white bg-white group">
            <img
              :src="place?.coverImage || 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80'"
              :alt="place?.name"
              class="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-xs text-amber-300 font-mono flex items-center gap-1.5 border border-amber-500/30">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0a2 2 0 01-2-2V5a2 2 0 012-2h4a2 2 0 012 2v12a2 2 0 01-2 2" />
              </svg>
              <span>16th-Century Architecture</span>
            </div>
          </div>

          <!-- Secondary Image Grid -->
          <div class="grid grid-cols-2 gap-3">
            <div class="rounded-lg overflow-hidden h-28 border border-parchment-300 relative">
              <img src="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80" alt="Courtyard" class="w-full h-full object-cover" />
              <span class="absolute bottom-1.5 left-2 text-[10px] text-white bg-slate-900/70 px-2 py-0.5 rounded font-mono">Courtyard Nalukettu</span>
            </div>
            <div class="rounded-lg overflow-hidden h-28 border border-parchment-300 relative group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80" alt="Murals" class="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all" />
              <div class="absolute inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-[1px]">
                <span class="text-xs font-semibold text-white tracking-wide bg-slate-900/80 px-2.5 py-1 rounded-full border border-white/20">
                  📷 +12 More Photos
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Title, Badges & Rating Header -->
        <div class="space-y-2">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="stamp-badge">
              🏛️ {{ place?.category || 'Heritage Site' }}
            </span>
            <span class="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-100/90 px-2.5 py-1 rounded border border-emerald-300">
              ● Open Now • Closes 5:00 PM
            </span>
          </div>

          <h2 class="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {{ place?.name || 'Mattancherry Palace (Dutch Palace)' }}
          </h2>

          <p class="text-xs text-slate-600 flex items-center gap-1.5">
            <svg class="w-4 h-4 text-amber-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span>{{ place?.address || 'Palace Road, Mattancherry, Kochi, Kerala 682002 • 1.8 km from center' }}</span>
          </p>

          <div class="flex items-center gap-4 text-xs pt-1">
            <div class="flex items-center gap-1 font-bold text-slate-900">
              <span class="text-amber-500">★</span>
              <span>{{ place?.rating || 4.7 }}</span>
              <span class="text-slate-500 font-normal">(1,420 reviews)</span>
            </div>
            <span class="text-slate-300">•</span>
            <span class="text-amber-800 font-medium bg-amber-100/80 px-2 py-0.5 rounded border border-amber-300">
              UNESCO Tentative Heritage
            </span>
          </div>
        </div>

        <!-- Quick Info Grid -->
        <div class="grid grid-cols-3 gap-3 bg-white p-3.5 rounded-xl border border-parchment-300 shadow-sm text-center">
          <div>
            <span class="text-[10px] uppercase tracking-wider font-mono text-slate-400 block mb-0.5">⏱ Est. Visit Time</span>
            <span class="text-sm font-bold text-slate-900">1.5 - 2 Hours</span>
          </div>
          <div class="border-x border-parchment-200">
            <span class="text-[10px] uppercase tracking-wider font-mono text-slate-400 block mb-0.5">☀️ Best Hours</span>
            <span class="text-sm font-bold text-slate-900">09:00 - 11:00 AM</span>
          </div>
          <div>
            <span class="text-[10px] uppercase tracking-wider font-mono text-slate-400 block mb-0.5">🎟 Entry Fee</span>
            <span class="text-sm font-bold text-amber-800">₹25 / person</span>
          </div>
        </div>

        <!-- About Description -->
        <div class="space-y-2 border-t border-parchment-300 pt-4">
          <h3 class="font-serif font-bold text-lg text-slate-900 flex items-center justify-between">
            <span>About the Heritage Site</span>
            <span class="text-xs font-mono text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">Historical Monument</span>
          </h3>
          <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
            {{ place?.description || 'Built around 1555 by the Portuguese as a goodwill gift to the Raja of Kochi, Veera Kerala Varma, this majestic palace represents an exquisite crossroads of colonial European fortification and indigenous Kerala timber temple architecture. In 1663, the Dutch East India Company extensively expanded and renovated the structure, forever lending it the popular moniker of the "Dutch Palace."' }}
          </p>
          <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
            The double-storeyed palace stands renowned worldwide for its extraordinary 16th- to 17th-century Hindu mythological tempera murals. Spanning more than 300 square feet across the King\'s bedchamber and adjoining corridors, these hand-painted works vividly narrate scenes from the Ramayana with astonishing chromatic intensity derived purely from organic plant and mineral pigments.
          </p>
        </div>

        <!-- Key Curated Highlights -->
        <div class="space-y-3 border-t border-parchment-300 pt-4">
          <h3 class="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
            <span>✨ Key Curated Highlights</span>
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div class="flex items-start gap-2.5 bg-white p-3 rounded-lg border border-parchment-300 shadow-sm text-xs">
              <span class="text-emerald-600 font-bold text-sm">✓</span>
              <div>
                <span class="font-semibold text-slate-900 block">Extensive Ramayana & Mahabharata murals</span>
                <span class="text-[11px] text-slate-500">Spanning across 300+ sq ft</span>
              </div>
            </div>
            <div class="flex items-start gap-2.5 bg-white p-3 rounded-lg border border-parchment-300 shadow-sm text-xs">
              <span class="text-emerald-600 font-bold text-sm">✓</span>
              <div>
                <span class="font-semibold text-slate-900 block">Ceremonial coronation robes</span>
                <span class="text-[11px] text-slate-500">Royal palanquins & antique weaponry</span>
              </div>
            </div>
            <div class="flex items-start gap-2.5 bg-white p-3 rounded-lg border border-parchment-300 shadow-sm text-xs">
              <span class="text-emerald-600 font-bold text-sm">✓</span>
              <div>
                <span class="font-semibold text-slate-900 block">Traditional Kerala 'Nalukettu'</span>
                <span class="text-[11px] text-slate-500">Quadrangular courtyard architecture</span>
              </div>
            </div>
            <div class="flex items-start gap-2.5 bg-white p-3 rounded-lg border border-parchment-300 shadow-sm text-xs">
              <span class="text-emerald-600 font-bold text-sm">✓</span>
              <div>
                <span class="font-semibold text-slate-900 block">Intricate Dutch timber woodwork</span>
                <span class="text-[11px] text-slate-500">Sacred temple brass lamps</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Typical Crowd Density Today -->
        <div class="space-y-3 bg-white p-4 rounded-xl border border-parchment-300 shadow-sm">
          <div class="flex items-center justify-between">
            <h4 class="font-serif font-bold text-sm text-slate-900">📊 Typical Crowd Density Today</h4>
            <span class="text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Currently: Low</span>
          </div>
          <div class="flex items-end justify-between gap-2 h-20 pt-4 px-2">
            <div class="flex-1 flex flex-col items-center gap-1">
              <div class="w-full bg-amber-200 rounded-t h-4"></div>
              <span class="text-[9px] font-mono text-slate-400">9 AM</span>
            </div>
            <div class="flex-1 flex flex-col items-center gap-1">
              <div class="w-full bg-amber-400 rounded-t h-10"></div>
              <span class="text-[9px] font-mono text-slate-400">11 AM</span>
            </div>
            <div class="flex-1 flex flex-col items-center gap-1">
              <div class="w-full bg-amber-600 rounded-t h-16"></div>
              <span class="text-[9px] font-mono font-bold text-amber-800">1 PM (Peak)</span>
            </div>
            <div class="flex-1 flex flex-col items-center gap-1">
              <div class="w-full bg-amber-300 rounded-t h-8"></div>
              <span class="text-[9px] font-mono text-slate-400">3 PM</span>
            </div>
            <div class="flex-1 flex flex-col items-center gap-1">
              <div class="w-full bg-amber-200 rounded-t h-5"></div>
              <span class="text-[9px] font-mono text-slate-400">5 PM</span>
            </div>
          </div>
        </div>

        <!-- Nearby Stays Within 2 km -->
        <div class="space-y-3 border-t border-parchment-300 pt-4">
          <div class="flex items-center justify-between">
            <h3 class="font-serif font-bold text-base text-slate-900">🏨 Nearby Stays Within 2 km</h3>
            <span class="text-xs text-amber-800 hover:underline cursor-pointer">View all 12 stays &rsaquo;</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="bg-white rounded-lg p-3 border border-parchment-300 shadow-sm space-y-2">
              <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80" alt="Old Harbour" class="w-full h-28 object-cover rounded-md" />
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="font-serif font-bold text-xs text-slate-900">Old Harbour Heritage Hotel</h4>
                  <p class="text-[10px] text-slate-500">Dutch architecture • 600m away</p>
                </div>
                <span class="text-xs font-bold text-slate-900">$55<span class="text-[10px] font-normal text-slate-500">/night</span></span>
              </div>
              <button @click="saveStay('Old Harbour Heritage Hotel')" class="w-full py-1 text-xs bg-parchment-100 hover:bg-parchment-200 text-slate-800 font-medium rounded border border-parchment-300 transition-colors">
                Save Stay
              </button>
            </div>

            <div class="bg-white rounded-lg p-3 border border-parchment-300 shadow-sm space-y-2">
              <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80" alt="Brunton Boatyard" class="w-full h-28 object-cover rounded-md" />
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="font-serif font-bold text-xs text-slate-900">Brunton Boatyard Waterfront</h4>
                  <p class="text-[10px] text-slate-500">Harbor view • 1.2km away</p>
                </div>
                <span class="text-xs font-bold text-slate-900">$92<span class="text-[10px] font-normal text-slate-500">/night</span></span>
              </div>
              <button @click="saveStay('Brunton Boatyard Waterfront')" class="w-full py-1 text-xs bg-parchment-100 hover:bg-parchment-200 text-slate-800 font-medium rounded border border-parchment-300 transition-colors">
                Save Stay
              </button>
            </div>
          </div>
        </div>

        <!-- Visitor Guidelines & Etiquette -->
        <div class="bg-amber-50/80 p-4 rounded-xl border border-amber-200 space-y-2">
          <h4 class="font-serif font-bold text-xs text-amber-900 flex items-center gap-1.5 uppercase tracking-wide">
            <span>ℹ️ Visitor Guidelines & Etiquette</span>
          </h4>
          <ul class="text-xs text-amber-900/80 space-y-1 pl-4 list-disc font-sans">
            <li>Strictly no photography or flash allowed inside the mural chambers.</li>
            <li>Footwear must be deposited at the outer portico entrance before stepping onto timber floors.</li>
            <li>Closed on Fridays and national public holidays.</li>
          </ul>
        </div>
      </div>

      <!-- Sticky Action Bar at Bottom -->
      <div class="sticky bottom-0 z-30 bg-white border-t border-parchment-300 p-4 shadow-lg flex items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
            🎒
          </div>
          <div>
            <span class="text-[10px] text-slate-400 font-mono uppercase block">Target Trip</span>
            <select v-model="selectedDay" class="text-xs font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer">
              <option value="day-1">Day 1: Fort Kochi Heritage Walk</option>
              <option value="day-2">Day 2: Alleppey Backwaters</option>
              <option value="day-3">Day 3: Marari Coastal Sunset</option>
              <option value="bucket">Bucket List (Unassigned)</option>
            </select>
          </div>
        </div>

        <button
          @click="addItinerary"
          class="bg-slate-900 hover:bg-amber-700 text-amber-300 font-semibold text-xs px-5 py-2.5 rounded-full shadow-md transition-all flex items-center gap-2"
        >
          <span>{{ isAdded ? '✓ Added to Itinerary!' : '+ Add to Day Itinerary' }}</span>
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  isOpen: boolean;
  place?: any;
}>();

const emit = defineEmits(['close', 'addToTrip']);

const isFavorite = ref(false);
const isAdded = ref(false);
const selectedDay = ref('day-1');

const close = () => {
  emit('close');
};

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
};

const addItinerary = () => {
  isAdded.value = true;
  emit('addToTrip', { place: props.place, dayId: selectedDay.value });
  setTimeout(() => {
    isAdded.value = false;
  }, 2500);
};

const saveStay = (stayName: string) => {
  alert(`Saved ${stayName} to your Stays Shortlist!`);
};
</script>
