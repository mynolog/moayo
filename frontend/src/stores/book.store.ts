import { defineStore } from 'pinia';

export interface TabState {
  activeTab: 'Bestseller' | 'ItemNewAll' | 'ItemNewSpecial' | 'BlogBest';
}

export const useTabStore = defineStore('book', {
  state: (): TabState => ({
    activeTab: 'Bestseller',
  }),
  actions: {
    setTab(tab: TabState['activeTab']) {
      this.activeTab = tab;
    },
  },
  getters: {
    selectedTab: (state) => state.activeTab,
  },
});
