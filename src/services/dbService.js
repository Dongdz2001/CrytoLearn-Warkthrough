import { db } from '../firebase';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';
import { encryptData, decryptData } from '../utils/cryptoUtils';

/**
 * Saves current user stats (score, total, streak) to Firestore.
 * Data is encrypted before saving.
 */
export const saveUserStats = async (uid, stats) => {
  try {
    const encryptedStats = encryptData(stats);
    await setDoc(doc(db, 'users', uid), {
      data: encryptedStats,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error('Error saving user stats:', error);
  }
};

/**
 * Retrieves user stats from Firestore and decrypts them.
 */
export const getUserStats = async (uid) => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const encryptedData = docSnap.data().data;
      return decryptData(encryptedData);
    }
    return null;
  } catch (error) {
    console.error('Error getting user stats:', error);
    return null;
  }
};

/**
 * Saves a single game history record (question attempt).
 * Data is encrypted before saving.
 */
export const addGameHistory = async (uid, historyItem) => {
  try {
    const encryptedItem = encryptData(historyItem);
    await addDoc(collection(db, 'users', uid, 'history'), {
      data: encryptedItem,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error('Error adding game history:', error);
  }
};

/**
 * Retrieves recent game history for a user.
 */
export const getGameHistory = async (uid, limitCount = 10) => {
  try {
    const q = query(
      collection(db, 'users', uid, 'history'),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const encryptedData = doc.data().data;
      return {
        id: doc.id,
        ...decryptData(encryptedData),
        timestamp: doc.data().timestamp?.toDate()
      };
    });
  } catch (error) {
    console.error('Error getting game history:', error);
    return [];
  }
};

/**
 * Saves a complete game round (10 questions) to Firestore.

 * Data is encrypted before saving.
 */
export const saveGameRound = async (uid, roundData) => {
  try {
    const encryptedData = encryptData(roundData);
    await addDoc(collection(db, 'users', uid, 'rounds'), {
      data: encryptedData,
      timestamp: serverTimestamp(),
      level: roundData.level,
      score: roundData.score
    });
  } catch (error) {
    console.error('Error saving game round:', error);
  }
};

/**
 * Retrieves game rounds for a user.
 */
export const getRoundHistory = async (uid, limitCount = 10) => {
  try {
    const q = query(
      collection(db, 'users', uid, 'rounds'),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const encryptedData = doc.data().data;
      return {
        id: doc.id,
        ...decryptData(encryptedData),
        timestamp: doc.data().timestamp?.toDate()
      };
    });
  } catch (error) {
    console.error('Error getting round history:', error);
    return [];
  }
};

