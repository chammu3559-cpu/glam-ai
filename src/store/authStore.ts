import { create } from 'zustand';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: string;
}

interface AuthStore {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  userProfile: null,
  loading: true,
  error: null,

  signup: async (email: string, password: string, displayName: string) => {
    try {
      set({ error: null });
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email || '',
        displayName,
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(db, 'users', user.uid), userProfile);
      set({ user, userProfile });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  login: async (email: string, password: string) => {
    try {
      set({ error: null });
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      const docSnap = await getDoc(doc(db, 'users', user.uid));
      const userProfile = docSnap.data() as UserProfile;

      set({ user, userProfile });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null, userProfile: null });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  initialize: () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docSnap = await getDoc(doc(db, 'users', user.uid));
        const userProfile = docSnap.data() as UserProfile;
        set({ user, userProfile, loading: false });
      } else {
        set({ user: null, userProfile: null, loading: false });
      }
    });
  },

  clearError: () => set({ error: null }),
}));
