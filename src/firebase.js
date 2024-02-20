import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCYJHKQJpuT4agaHR_nFwH1uNVEuewXDQw',
  authDomain: 'weather-app-414520.firebaseapp.com',
  projectId: 'weather-app-414520',
  storageBucket: 'weather-app-414520.appspot.com',
  messagingSenderId: '812223512409',
  appId: '1:812223512409:web:7c127c431ecb8e47e21648',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
