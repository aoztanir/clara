import { create } from 'zustand';
import { navbarLinks } from '@/Constants';

const activeLinkStore = (set, get) => ({
  activeLink: navbarLinks[0],
  setActiveLink: (link) => set({ activeLink: link }),
});

export const useActiveLinkStore = create(activeLinkStore);

export default activeLinkStore;
