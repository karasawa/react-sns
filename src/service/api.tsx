import firebase from "firebase";
import { db } from "./firebase";

export const initGet = async (currentUser?: string) => {
  const friend = await db.collection("user").where("name", "==", currentUser);
  return friend.get().then((snapShot) => {
    let friends: any[] = [];
    snapShot.forEach((doc) => {
      friends.push({
        friend: doc.data().friend,
      });
    });
    return friends;
  });
};

export const chatGet = async (currentUser?: string, friend?: string) => {
  const toChat = await db
    .collection("chat")
    .where("from", "==", currentUser)
    .where("to", "==", friend);
  const fromChat = await db
    .collection("chat")
    .where("from", "==", friend)
    .where("to", "==", currentUser);
  let chats: any[] = [];
  toChat.get().then((snapShot) => {
    snapShot.forEach((doc) => {
      chats.push({
        from: doc.data().from,
        to: doc.data().to,
        message: doc.data().message,
        send_time: doc.data().send_time,
      });
    });
  });
  return fromChat.get().then((snapShot) => {
    snapShot.forEach((doc) => {
      chats.push({
        from: doc.data().from,
        to: doc.data().to,
        message: doc.data().message,
        send_time: doc.data().send_time,
      });
    });
    // chats = chats.sort();
    return chats;
  });
};

export const sendMessage = (
  currentUser?: string,
  friend?: string,
  message?: string
) => {
  db.collection("chat").add({
    to: friend,
    from: currentUser,
    message: message,
    send_time: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

export const deleteFriend = (currentUser?: string, friend?: string) => {
  db.collection("user")
    .doc(currentUser)
    .update({
      friend: firebase.firestore.FieldValue.arrayRemove(friend),
    });
};

// export const toggleComplete = async(id) => {
//     const todo = await db.collection("todo").doc(id).get();
//     return db.collection("todo").doc(id).update({
//         isComplete: todo.data().isComplete ? false : true,
//     });
// }
