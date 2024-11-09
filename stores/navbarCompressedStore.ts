import { create } from 'zustand';

const navbarCompressedStore = (set: any, get: any) => ({
  compressed: true,
  setCompressed: (compressed: boolean) => set({ compressed }),
});

export const useNavbarCompressedStore = create(navbarCompressedStore);
