import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export const setDataFirebase = async (tripsList) => {
  const user = auth.currentUser;
  if (user) {
    const tripRef = doc(db, 'user_trips', user.uid);
    try {
      await setDoc(tripRef, { trips: tripsList }, { merge: true });
    } catch (error) {
      console.error(error);
    }
  }
};

export const getDataFirebase = async (setTripList, user) => {
  if (user) {
    const tripRef = doc(db, 'user_trips', user?.uid);
    try {
      await onSnapshot(tripRef, (trip) => {
        if (trip.exists()) {
          setTripList(trip.data().trips);
        } else {
          console.log('No Items in Watchlist');
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
};
