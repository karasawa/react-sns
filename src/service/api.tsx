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

// export const addTodo = (content, uid) => {
//     db.collection("todo").add({
//         content: content,
//         uid: uid,
//         isComplete: false,
//         createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//     })
// }

export const deletefriend = (currentUser?: string, friend?: string) => {
  db.collection("user")
    .doc(currentUser)
    .update({
      friend: firebase.firestore.FieldValue.arrayRemove(friend), // usersフィールド（配列）から要素'user1'を削除
    });
};

// export const toggleComplete = async(id) => {
//     const todo = await db.collection("todo").doc(id).get();
//     return db.collection("todo").doc(id).update({
//         isComplete: todo.data().isComplete ? false : true,
//     });
// }
