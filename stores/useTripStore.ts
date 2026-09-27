import { defineStore } from 'pinia';

export interface ItineraryItem {
  id: string;
  tripDayId: string;
  placeId?: string;
  customTitle?: string;
  orderIndex: number;
  startTime?: string;
  durationMinutes?: number;
  notes?: string;
  isCompleted: boolean;
  place?: any;
}

export interface TripDay {
  id: string;
  tripId: string;
  dayNumber: number;
  date: string;
  title?: string;
  items: ItineraryItem[];
  routeCoordinates: { lng: number; lat: number }[];
}

export interface Trip {
  id: string;
  title: string;
  destinationName: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'active' | 'completed';
  coverImage?: string;
  days: TripDay[];
}

export const useTripStore = defineStore('trip', {
  state: () => ({
    activeTrip: null as Trip | null,
    activeDayId: null as string | null,
    isLoading: false,
    error: null as string | null,
  }),

  getters: {
    activeDay: (state) => {
      if (!state.activeTrip || !state.activeDayId) return null;
      return state.activeTrip.days.find((d) => d.id === state.activeDayId) || null;
    },
    activeDayItems: (state) => {
      if (!state.activeTrip || !state.activeDayId) return [];
      const day = state.activeTrip.days.find((d) => d.id === state.activeDayId);
      return day ? day.items : [];
    },
  },

  actions: {
    async fetchTripDetails(tripId: string) {
      this.isLoading = true;
      this.error = null;
      try {
        const response: any = await $fetch(`/api/trips/${tripId}`);
        if (response.success && response.data) {
          this.activeTrip = response.data;
          if (response.data.days && response.data.days.length > 0) {
            this.activeDayId = response.data.days[0].id;
          }
        }
      } catch (err: any) {
        this.error = err?.statusMessage || 'Failed to fetch trip details';
      } finally {
        this.isLoading = false;
      }
    },

    setActiveDay(dayId: string) {
      this.activeDayId = dayId;
    },

    async addItineraryItem(item: {
      tripDayId: string;
      placeId?: string;
      customTitle?: string;
      orderIndex: number;
      startTime?: string;
      durationMinutes?: number;
      notes?: string;
    }) {
      if (!this.activeTrip) return;
      try {
        const response: any = await $fetch(`/api/trips/${this.activeTrip.id}/items`, {
          method: 'POST',
          body: item,
        });

        if (response.success && response.data) {
          const day = this.activeTrip.days.find((d) => d.id === item.tripDayId);
          if (day) {
            day.items.push(response.data);
            day.items.sort((a, b) => a.orderIndex - b.orderIndex);
          }
        }
      } catch (err: any) {
        this.error = err?.statusMessage || 'Failed to add itinerary item';
      }
    },

    reorderItems(dayId: string, items: ItineraryItem[]) {
      if (!this.activeTrip) return;
      const day = this.activeTrip.days.find((d) => d.id === dayId);
      if (day) {
        day.items = items.map((item, idx) => ({ ...item, orderIndex: idx }));
      }
    },
  },
});
