<template>
  <div class="min-h-screen bg-parchment-100 flex flex-col font-sans">
    <!-- Main Top Navbar -->
    <Navbar />

    <!-- Sub Header Bar -->
    <div class="bg-parchment-50 border-b border-parchment-300 px-4 lg:px-8 py-3">
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 class="font-serif text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Historic Discoveries</span>
            <span class="text-xs font-mono font-normal text-slate-500 bg-parchment-200 px-2 py-0.5 rounded-full">42 spots</span>
          </h1>
          <p class="text-xs text-slate-600 font-mono">Fort Kochi Cartographic Search & Destination Engine</p>
        </div>

        <!-- Filter Category Pills -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="activeCategory = cat.id"
            class="px-3 py-1.5 text-xs font-semibold rounded-full transition-all whitespace-nowrap"
            :class="activeCategory === cat.id ? 'bg-slate-900 text-amber-300 shadow-xs' : 'bg-white text-slate-700 hover:bg-parchment-200 border border-parchment-300'"
          >
            {{ cat.label }} <span v-if="cat.count" class="text-[10px] opacity-75">({{ cat.count }})</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Split-Screen Container -->
    <div class="flex-1 flex flex-col lg:flex-row overflow-hidden">
      <!-- Left Places List Side -->
      <div class="w-full lg:w-1/2 p-4 lg:p-6 overflow-y-auto max-h-[calc(100vh-140px)] space-y-4">
        <!-- Sort & View Controls -->
        <div class="flex items-center justify-between pb-2 border-b border-parchment-300 text-xs">
          <span class="font-mono text-slate-500 uppercase tracking-wider">Showing {{ filteredPlaces.length }} curated spots</span>
          <div class="flex items-center gap-2">
            <span class="text-slate-500">Sort by:</span>
            <select v-model="sortBy" class="bg-white border border-parchment-300 rounded px-2 py-1 font-semibold text-slate-800 focus:outline-none">
              <option value="rating">Highest Rated</option>
              <option value="distance">Distance (Nearest)</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        <!-- Places Card Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            v-for="place in filteredPlaces"
            :key="place.id"
            @click="openPlaceDetails(place)"
            class="polaroid-card group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <!-- Image with Heart & Rating Badges -->
              <div class="relative rounded-md overflow-hidden mb-2.5 h-44 border border-parchment-200">
                <img :src="place.coverImage" :alt="place.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                
                <button
                  @click.stop="toggleBookmark(place.id)"
                  class="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-700 hover:text-rose-600 shadow-sm transition-colors"
                >
                  <svg class="w-4 h-4" :fill="bookmarkedIds.has(place.id) ? '#E11D48' : 'none'" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                  </svg>
                </button>

                <div class="absolute bottom-2 left-2 bg-slate-900/85 backdrop-blur-xs text-amber-300 px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                  <span>★ {{ place.rating }}</span>
                  <span class="text-[10px] text-slate-300 font-normal">({{ place.reviewsCount }})</span>
                </div>
              </div>

              <!-- Location & Category -->
              <div class="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-1">
                <span class="uppercase font-semibold text-amber-800 tracking-wider">{{ place.neighborhood }}</span>
                <span class="flex items-center gap-1 text-slate-600">
                  <svg class="w-3 h-3 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  {{ place.distanceKm }} KM
                </span>
              </div>

              <!-- Title & Description -->
              <h3 class="font-serif font-bold text-base text-slate-900 group-hover:text-amber-800 transition-colors leading-snug mb-1">
                {{ place.name }}
              </h3>
              <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed font-sans mb-3">
                {{ place.description }}
              </p>
            </div>

            <!-- Footer Tag & Action Button -->
            <div class="flex items-center justify-between pt-2 border-t border-parchment-200 mt-2">
              <span class="text-[10px] font-mono bg-parchment-200 text-slate-700 px-2 py-0.5 rounded border border-parchment-300">
                {{ place.category }}
              </span>

              <button
                @click.stop="toggleAddTrip(place)"
                class="text-xs font-semibold px-3 py-1 rounded-full transition-all flex items-center gap-1 shadow-xs"
                :class="addedTripIds.has(place.id) ? 'bg-emerald-800 text-white' : 'bg-slate-900 text-amber-300 hover:bg-amber-700'"
              >
                <span>{{ addedTripIds.has(place.id) ? '✓ In Trip' : '+ Add to Trip' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Interactive Map Side -->
      <div class="w-full lg:w-1/2 h-[450px] lg:h-auto p-4 lg:p-6 lg:pl-0">
        <InteractiveMap
          :markers="mapMarkers"
          :selectedId="selectedPlaceId"
          :selectedCategory="activeCategory"
          @select="handleMarkerSelect"
          @inspect="handleMarkerInspect"
        />
      </div>
    </div>

    <!-- Reusable Place Details Slide-Over -->
    <PlaceDetailsSlideOver
      :isOpen="isSlideOverOpen"
      :place="selectedPlace"
      @close="isSlideOverOpen = false"
      @addToTrip="handleAddToTripFromSlideover"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Navbar from '~/components/Navbar.vue';
import InteractiveMap from '~/components/InteractiveMap.vue';
import PlaceDetailsSlideOver from '~/components/PlaceDetailsSlideOver.vue';

const activeCategory = ref('all');
const sortBy = ref('rating');
const selectedPlaceId = ref<string | null>(null);
const selectedPlace = ref<any>(null);
const isSlideOverOpen = ref(false);
const bookmarkedIds = ref<Set<string>>(new Set());
const addedTripIds = ref<Set<string>>(new Set());

const categories = [
  { id: 'all', label: 'All Places', count: 42 },
  { id: 'heritage', label: 'Heritage', count: 14 },
  { id: 'waterfront', label: 'Waterfront', count: 9 },
  { id: 'cafes', label: 'Cafes & Dining', count: 12 },
  { id: 'art', label: 'Art Galleries', count: 7 },
];

const mockPlaces = [
  {
    id: 'p1',
    name: 'Mattancherry Palace (Dutch Palace)',
    category: 'Heritage Museum',
    neighborhood: 'JEW TOWN',
    distanceKm: 1.8,
    rating: 4.8,
    reviewsCount: 342,
    coverImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    description: '16th-century Portuguese palace famous for vibrant Hindu temple murals & royal coronation robes.',
    location: { lat: 9.958, lng: 76.259 },
    address: 'Palace Road, Mattancherry, Kochi 682002',
  },
  {
    id: 'p2',
    name: 'Chinese Fishing Nets & Promenade',
    category: 'Waterfront Sight',
    neighborhood: 'FORT KOCHI BEACH',
    distanceKm: 0.6,
    rating: 4.9,
    reviewsCount: 890,
    coverImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
    description: 'Historic 14th-century sea nets operated by bamboo counterweights right at sunset shoreline.',
    location: { lat: 9.967, lng: 76.241 },
    address: 'Tower Road, Fort Kochi Promenade',
  },
  {
    id: 'p3',
    name: 'St. Francis CSI Church',
    category: 'Colonial Church',
    neighborhood: 'PARADE GROUND',
    distanceKm: 0.4,
    rating: 4.7,
    reviewsCount: 215,
    coverImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    description: 'One of the oldest European churches in India; original burial place of Portuguese explorer Vasco da Gama.',
    location: { lat: 9.966, lng: 76.243 },
    address: 'Headquarter Road, Fort Kochi',
  },
  {
    id: 'p4',
    name: 'Kashi Art Cafe & Courtyard',
    category: 'Art Cafe',
    neighborhood: 'BURGHER STREET',
    distanceKm: 0.8,
    rating: 4.8,
    reviewsCount: 412,
    coverImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    description: 'Art gallery cafe with specialty cold brew, artisanal pies, and rotating contemporary sculptures.',
    location: { lat: 9.964, lng: 76.244 },
    address: '268 Burgher St, Fort Kochi',
  },
  {
    id: 'p5',
    name: 'Paradesi Synagogue & Jew Town',
    category: 'Heritage Site',
    neighborhood: 'JEW TOWN',
    distanceKm: 1.9,
    rating: 4.8,
    reviewsCount: 520,
    coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    description: 'Oldest active synagogue in Commonwealth with hand-painted 18th-century Cantonese porcelain tiles.',
    location: { lat: 9.957, lng: 76.259 },
    address: 'Jew Town, Mattancherry',
  },
];

const filteredPlaces = computed(() => {
  let list = mockPlaces;
  if (activeCategory.value !== 'all') {
    list = list.filter((p) => p.category.toLowerCase().includes(activeCategory.value));
  }
  return list.sort((a, b) => b.rating - a.rating);
});

const mapMarkers = computed(() => {
  return filteredPlaces.value.map((p, idx) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    location: p.location,
    rating: p.rating,
    coverImage: p.coverImage,
    numberLabel: idx + 1,
    address: p.address,
  }));
});

const openPlaceDetails = (place: any) => {
  selectedPlace.value = place;
  selectedPlaceId.value = place.id;
  isSlideOverOpen.value = true;
};

const handleMarkerSelect = (id: string) => {
  selectedPlaceId.value = id;
};

const handleMarkerInspect = (id: string) => {
  const target = mockPlaces.find((p) => p.id === id);
  if (target) {
    openPlaceDetails(target);
  }
};

const toggleBookmark = (id: string) => {
  if (bookmarkedIds.value.has(id)) {
    bookmarkedIds.value.delete(id);
  } else {
    bookmarkedIds.value.add(id);
  }
};

const toggleAddTrip = (place: any) => {
  if (addedTripIds.value.has(place.id)) {
    addedTripIds.value.delete(place.id);
  } else {
    addedTripIds.value.add(place.id);
  }
};

const handleAddToTripFromSlideover = (payload: any) => {
  if (payload.place) {
    addedTripIds.value.add(payload.place.id);
  }
};
</script>
