<template>
  <div class="min-h-screen bg-parchment-100 flex flex-col font-sans">
    <Navbar />
    <TripHeader />

    <!-- Top Progress Summary Bar -->
    <div class="bg-parchment-50 border-b border-parchment-300 px-4 lg:px-8 py-3">
      <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="relative w-10 h-10 rounded-full bg-slate-900 text-amber-300 flex items-center justify-center font-bold text-xs shadow-inner">
            <span>{{ prepProgress }}%</span>
          </div>
          <div>
            <h3 class="font-serif font-bold text-sm text-slate-900">12/18 Items Completed</h3>
            <p class="text-xs text-slate-500 font-mono">Trip logistics & bucket list ready for Kerala</p>
          </div>
        </div>

        <button @click="openAddItemModal" class="px-4 py-2 text-xs font-semibold text-amber-300 bg-slate-900 hover:bg-amber-700 rounded-full shadow-sm transition-colors flex items-center gap-1.5">
          <span>+ New List Item</span>
        </button>
      </div>
    </div>

    <!-- 3-Column Kanban Board Layout -->
    <div class="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-6 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
      <!-- Column 1: Places Bucket List -->
      <div class="bg-parchment-50 p-4 rounded-xl border border-parchment-300 shadow-sm flex flex-col space-y-4">
        <div class="flex items-center justify-between pb-2 border-b border-parchment-300">
          <div>
            <h2 class="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
              <span>📍 Places Bucket List</span>
              <span class="text-xs font-mono bg-parchment-200 px-2 py-0.5 rounded text-slate-700">{{ bucketPlaces.length }} spots</span>
            </h2>
            <p class="text-[11px] text-slate-500 font-mono">Unassigned places to fit into Day 1 - Day 5</p>
          </div>
          <button @click="openAddPlaceModal" class="text-xs text-amber-800 font-semibold hover:underline">+ Place</button>
        </div>

        <!-- Bucket List Cards -->
        <div class="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
          <div
            v-for="item in bucketPlaces"
            :key="item.id"
            class="bg-white p-3 rounded-lg border border-parchment-300 shadow-xs space-y-2 hover:border-amber-400 transition-colors"
          >
            <div class="flex gap-2.5 items-start">
              <img :src="item.image" :alt="item.title" class="w-12 h-12 rounded object-cover border border-parchment-300 shrink-0" />
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-1">
                  <h4 class="font-serif font-bold text-xs text-slate-900 truncate">{{ item.title }}</h4>
                  <span v-if="item.badge" class="text-[9px] font-mono font-bold uppercase text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded shrink-0">
                    {{ item.badge }}
                  </span>
                </div>
                <p class="text-[10px] text-slate-500 font-mono truncate">📍 {{ item.location }}</p>
              </div>
            </div>

            <div class="flex items-center justify-between pt-1 border-t border-parchment-200 text-xs">
              <select @change="assignToDay(item.id, ($event.target as HTMLSelectElement).value)" class="text-[11px] font-semibold bg-parchment-100 border border-parchment-300 rounded px-2 py-1 text-slate-800 focus:outline-none cursor-pointer">
                <option value="">Schedule to Day...</option>
                <option value="d1">Day 1 (Fort Kochi)</option>
                <option value="d2">Day 2 (Alleppey)</option>
                <option value="d3">Day 3 (Marari Beach)</option>
              </select>
              <button class="text-slate-400 hover:text-amber-800">🔖</button>
            </div>
          </div>
        </div>

        <!-- Add Input Bar -->
        <div class="pt-2 border-t border-parchment-300">
          <input
            type="text"
            v-model="newBucketInput"
            @keyup.enter="addBucketItem"
            placeholder="🔍 Search & add to bucket list..."
            class="w-full text-xs p-2.5 rounded-lg bg-white border border-parchment-300 placeholder-slate-400 focus:outline-none focus:border-amber-600"
          />
        </div>
      </div>

      <!-- Column 2: Saved Stays & Lodging -->
      <div class="bg-parchment-50 p-4 rounded-xl border border-parchment-300 shadow-sm flex flex-col space-y-4">
        <div class="flex items-center justify-between pb-2 border-b border-parchment-300">
          <div>
            <h2 class="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
              <span>🏨 Saved Stays & Lodging</span>
              <span class="text-xs font-mono bg-parchment-200 px-2 py-0.5 rounded text-slate-700">{{ stays.length }} options</span>
            </h2>
            <p class="text-[11px] text-slate-500 font-mono">Selected hotels & heritage homestays</p>
          </div>
          <NuxtLink to="/search" class="text-xs text-amber-800 font-semibold hover:underline">Find Stays &rsaquo;</NuxtLink>
        </div>

        <!-- Stays List -->
        <div class="space-y-4 flex-1 overflow-y-auto max-h-[600px] pr-1">
          <div
            v-for="stay in stays"
            :key="stay.id"
            class="bg-white p-3.5 rounded-xl border border-parchment-300 shadow-sm space-y-3 relative group"
          >
            <div class="relative rounded-lg overflow-hidden h-36 border border-parchment-200">
              <img :src="stay.image" :alt="stay.title" class="w-full h-full object-cover" />
              <span class="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
                {{ stay.typeBadge }}
              </span>
              <span class="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-xs text-rose-600 shadow-sm">♥</span>
            </div>

            <div class="flex justify-between items-start">
              <div>
                <h4 class="font-serif font-bold text-sm text-slate-900">{{ stay.title }}</h4>
                <p class="text-[11px] text-slate-500 font-mono">★ {{ stay.rating }} ({{ stay.reviews }} reviews) • {{ stay.neighborhood }}</p>
              </div>
              <div class="text-right">
                <span class="font-serif font-bold text-base text-slate-900">${{ stay.price }}</span>
                <span class="text-[10px] text-slate-400 block font-mono">/ night</span>
              </div>
            </div>

            <div class="flex items-center gap-2 text-[10px] font-mono text-slate-600 flex-wrap">
              <span v-for="tag in stay.tags" :key="tag" class="bg-parchment-100 px-2 py-0.5 rounded border border-parchment-200">
                {{ tag }}
              </span>
            </div>

            <!-- Status Banner -->
            <div
              class="p-2 rounded-lg text-xs font-semibold flex items-center justify-between"
              :class="stay.status === 'confirmed' ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-parchment-100 text-slate-700 border border-parchment-300'"
            >
              <span>{{ stay.statusLabel }}</span>
              <span v-if="stay.status === 'confirmed'" class="text-emerald-600">✓</span>
            </div>
          </div>
        </div>

        <button @click="addManualReservation" class="w-full py-2.5 bg-white hover:bg-parchment-200 text-slate-800 text-xs font-semibold rounded-lg border border-dashed border-parchment-400 transition-colors">
          + Add manual hotel or stay reservation
        </button>
      </div>

      <!-- Column 3: Packing & Prep Checklist -->
      <div class="bg-parchment-50 p-4 rounded-xl border border-parchment-300 shadow-sm flex flex-col space-y-4">
        <div class="flex items-center justify-between pb-2 border-b border-parchment-300">
          <div>
            <h2 class="font-serif font-bold text-base text-slate-900 flex items-center gap-2">
              <span>📋 Packing & Prep Checklist</span>
            </h2>
            <p class="text-[11px] text-slate-500 font-mono">Grouped by preparation categories</p>
          </div>
          <span class="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
            {{ completedPrepCount }}/{{ prepTasks.length }} done
          </span>
        </div>

        <!-- Task Groups -->
        <div class="space-y-4 flex-1 overflow-y-auto max-h-[550px] pr-1">
          <div v-for="group in taskGroups" :key="group.category" class="space-y-2">
            <div class="flex items-center justify-between text-xs font-bold text-slate-700 font-mono uppercase tracking-wider">
              <span>{{ group.category }}</span>
              <span class="text-[10px] text-slate-400 font-normal">{{ group.completedCount }}/{{ group.items.length }} done</span>
            </div>

            <div
              v-for="task in group.items"
              :key="task.id"
              @click="toggleTask(task)"
              class="bg-white p-3 rounded-lg border border-parchment-300 shadow-xs flex items-center justify-between gap-3 cursor-pointer hover:border-amber-400 transition-all"
            >
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 rounded border border-parchment-400 flex items-center justify-center shrink-0" :class="task.isCompleted ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white'">
                  <span v-if="task.isCompleted" class="text-xs font-bold">✓</span>
                </div>
                <span class="text-xs text-slate-800 font-sans" :class="task.isCompleted ? 'line-through text-slate-400' : ''">
                  {{ task.title }}
                </span>
              </div>

              <div class="flex items-center gap-1.5 shrink-0">
                <span v-if="task.urgent" class="text-[9px] font-mono font-bold text-rose-800 bg-rose-100 px-1.5 py-0.5 rounded">Urgent</span>
                <span class="text-[9px] font-mono bg-parchment-100 text-slate-600 px-1.5 py-0.5 rounded border border-parchment-200">
                  {{ task.tag }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Export PDF Footer -->
        <div class="pt-2 border-t border-parchment-300 flex items-center justify-between">
          <span class="text-[11px] text-slate-500 font-mono">✓ All essential tickets synced</span>
          <button @click="exportPdf" class="text-xs font-semibold text-amber-800 hover:underline">
            Export PDF
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Navbar from '~/components/Navbar.vue';
import TripHeader from '~/components/TripHeader.vue';

const newBucketInput = ref('');

const bucketPlaces = ref([
  { id: 'bp1', title: 'Cherai Beach & Dunes', badge: 'Must Visit', location: 'Vypin Island • 22 km', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=80' },
  { id: 'bp2', title: 'St. Francis CSI Church', badge: 'Colonial', location: 'Parade Ground • 0.4 km', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=200&q=80' },
  { id: 'bp3', title: 'Jew Town Spice Market', badge: 'Shopping', location: 'Mattancherry • 1.9 km', image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=200&q=80' },
  { id: 'bp4', title: 'Marari Beach Sunset Point', badge: 'Sunset', location: 'Alappuzha Coast • 42 km', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&q=80' },
  { id: 'bp5', title: 'Kashi Art Cafe & Gallery', badge: 'Cafe', location: 'Burgher St • 0.8 km', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=200&q=80' },
]);

const stays = ref([
  {
    id: 's1',
    title: 'Old Harbour Heritage Hotel',
    typeBadge: 'Heritage 300+ yrs',
    rating: 4.9,
    reviews: 340,
    neighborhood: 'Fort Kochi',
    price: 85,
    tags: ['High-speed WiFi', 'Garden Pool', 'Breakfast Incl.'],
    status: 'confirmed',
    statusLabel: '✓ Booked & Confirmed (Room 104)',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 's2',
    title: 'Brunton Boatyard Waterfront',
    typeBadge: 'Harbor View',
    rating: 4.8,
    reviews: 210,
    neighborhood: 'Harbor Road',
    price: 115,
    tags: ['Waterfront Dining', 'Ayurveda Spa'],
    status: 'shortlisted',
    statusLabel: 'Shortlisted (Backup Option)',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 's3',
    title: 'Kumarakom Lake Heritage Retreat',
    typeBadge: 'Backwater Villa',
    rating: 4.9,
    reviews: 480,
    neighborhood: 'Alleppey Canal',
    price: 140,
    tags: ['Private Plunge Pool', 'Houseboat Dock'],
    status: 'planning',
    statusLabel: 'Planning for Day 4',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
  },
]);

const prepTasks = ref([
  { id: 't1', category: 'Pre-trip Logistics & Bookings', title: 'Download offline Google Maps for Kochi', isCompleted: true, tag: 'Tech' },
  { id: 't2', category: 'Pre-trip Logistics & Bookings', title: 'Confirm Kochi airport cab pickup service', isCompleted: true, tag: 'Transit' },
  { id: 't3', category: 'Pre-trip Logistics & Bookings', title: 'Exchange cash (₹ INR) for street antique shopping', isCompleted: false, tag: 'Finance', urgent: true },
  { id: 't4', category: 'Clothing & Gear', title: 'Pack lightweight linen clothes & raincoat', isCompleted: true, tag: 'Apparel' },
  { id: 't5', category: 'Clothing & Gear', title: 'Comfortable walking slip-on shoes for temple floors', isCompleted: true, tag: 'Gear' },
  { id: 't6', category: 'Clothing & Gear', title: 'Check Sony mirrorless camera battery charger & 64GB SD cards', isCompleted: false, tag: 'Electronics' },
  { id: 't7', category: 'Clothing & Gear', title: 'Pack organic mosquito repellent & sunscreen SPF 50', isCompleted: false, tag: 'Health' },
  { id: 't8', category: 'Documents', title: 'Save Mattancherry Palace & Kathakali show e-tickets', isCompleted: true, tag: 'Tickets' },
]);

const completedPrepCount = computed(() => prepTasks.value.filter((t) => t.isCompleted).length);
const prepProgress = computed(() => Math.round((completedPrepCount.value / prepTasks.value.length) * 100));

const taskGroups = computed(() => {
  const categories = Array.from(new Set(prepTasks.value.map((t) => t.category)));
  return categories.map((cat) => {
    const items = prepTasks.value.filter((t) => t.category === cat);
    return {
      category: cat,
      items,
      completedCount: items.filter((i) => i.isCompleted).length,
    };
  });
});

const toggleTask = (task: any) => {
  task.isCompleted = !task.isCompleted;
};

const assignToDay = (id: string, dayValue: string) => {
  if (!dayValue) return;
  bucketPlaces.value = bucketPlaces.value.filter((b) => b.id !== id);
  alert(`Assigned spot to ${dayValue}!`);
};

const addBucketItem = () => {
  if (!newBucketInput.value) return;
  bucketPlaces.value.push({
    id: `bp-${Date.now()}`,
    title: newBucketInput.value,
    badge: 'Custom',
    location: 'Fort Kochi • 1.0 km',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=200&q=80',
  });
  newBucketInput.value = '';
};

const openAddPlaceModal = () => {
  const name = prompt('Enter place name to add to bucket list:');
  if (name) {
    newBucketInput.value = name;
    addBucketItem();
  }
};

const openAddItemModal = () => {
  openAddPlaceModal();
};

const addManualReservation = () => {
  alert('Opened Manual Hotel Reservation Form');
};

const exportPdf = () => {
  alert('Exporting PDF Packing & Tickets Summary...');
};
</script>
