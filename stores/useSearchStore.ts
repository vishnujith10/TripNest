import { defineStore } from 'pinia';

export interface PlaceResult {
  id: string;
  name: string;
  slug: string;
  description?: string;
  category: string;
  address?: string;
  location: { lng: number; lat: number };
  rating?: number;
  priceTier?: number;
  coverImage?: string;
  distanceKm?: number;
}

export const useSearchStore = defineStore('search', {
  state: () => ({
    query: '',
    category: '',
    radiusKm: 10,
    mapCenter: { lat: 48.8566, lng: 2.3522 }, // Default Paris
    selectedPlaceId: null as string | null,
    searchResults: [] as PlaceResult[],
    isLoading: false,
    error: null as string | null,
  }),

  getters: {
    selectedPlace: (state) => {
      return state.searchResults.find((p) => p.id === state.selectedPlaceId) || null;
    },
  },

  actions: {
    setMapCenter(lat: number, lng: number) {
      this.mapCenter = { lat, lng };
    },

    selectPlace(placeId: string | null) {
      this.selectedPlaceId = placeId;
    },

    async performSearch() {
      this.isLoading = true;
      this.error = null;
      try {
        const params: any = {
          radiusKm: this.radiusKm,
        };
        if (this.mapCenter.lat && this.mapCenter.lng) {
          params.lat = this.mapCenter.lat;
          params.lng = this.mapCenter.lng;
        }
        if (this.category) params.category = this.category;
        if (this.query) params.q = this.query;

        const response: any = await $fetch('/api/places/search', { params });
        if (response.success) {
          this.searchResults = response.data;
        }
      } catch (err: any) {
        this.error = err?.statusMessage || 'Search failed';
      } finally {
        this.isLoading = false;
      }
    },
  },
});
