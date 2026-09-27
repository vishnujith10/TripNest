import { defineStore } from 'pinia';

export interface ChecklistItem {
  id: string;
  tripId: string;
  type: 'bucket_place' | 'stay_shortlist' | 'prep_task';
  title: string;
  isCompleted: boolean;
  linkedPlaceId?: string;
  linkedStayId?: string;
  place?: any;
  stay?: any;
}

export const useChecklistStore = defineStore('checklist', {
  state: () => ({
    tripId: null as string | null,
    bucketPlaces: [] as ChecklistItem[],
    stayShortlist: [] as ChecklistItem[],
    prepTasks: [] as ChecklistItem[],
    isLoading: false,
    error: null as string | null,
  }),

  getters: {
    prepProgress: (state) => {
      if (state.prepTasks.length === 0) return 0;
      const completed = state.prepTasks.filter((t) => t.isCompleted).length;
      return Math.round((completed / state.prepTasks.length) * 100);
    },
  },

  actions: {
    async fetchChecklists(tripId: string) {
      this.tripId = tripId;
      this.isLoading = true;
      this.error = null;
      try {
        const response: any = await $fetch(`/api/trips/${tripId}/checklists`);
        if (response.success && response.data) {
          this.bucketPlaces = response.data.bucketPlaces || [];
          this.stayShortlist = response.data.stayShortlist || [];
          this.prepTasks = response.data.prepTasks || [];
        }
      } catch (err: any) {
        this.error = err?.statusMessage || 'Failed to fetch checklists';
      } finally {
        this.isLoading = false;
      }
    },

    async addItem(type: 'bucket_place' | 'stay_shortlist' | 'prep_task', title: string, linkedPlaceId?: string, linkedStayId?: string) {
      if (!this.tripId) return;
      try {
        const response: any = await $fetch(`/api/trips/${this.tripId}/checklists`, {
          method: 'POST',
          body: { type, title, linkedPlaceId, linkedStayId },
        });

        if (response.success && response.data) {
          if (type === 'bucket_place') this.bucketPlaces.push(response.data);
          else if (type === 'stay_shortlist') this.stayShortlist.push(response.data);
          else if (type === 'prep_task') this.prepTasks.push(response.data);
        }
      } catch (err: any) {
        this.error = err?.statusMessage || 'Failed to add checklist item';
      }
    },

    async toggleItemCompletion(checklistId: string, currentStatus: boolean) {
      if (!this.tripId) return;
      const newStatus = !currentStatus;

      // Optimistic update
      const updateInArray = (arr: ChecklistItem[]) => {
        const item = arr.find((i) => i.id === checklistId);
        if (item) item.isCompleted = newStatus;
      };

      updateInArray(this.bucketPlaces);
      updateInArray(this.stayShortlist);
      updateInArray(this.prepTasks);

      try {
        await $fetch(`/api/trips/${this.tripId}/checklists`, {
          method: 'PATCH',
          body: { checklistId, isCompleted: newStatus },
        });
      } catch (err: any) {
        // Rollback on error
        updateInArray(this.bucketPlaces);
        updateInArray(this.stayShortlist);
        updateInArray(this.prepTasks);
        this.error = 'Failed to update item';
      }
    },
  },
});
