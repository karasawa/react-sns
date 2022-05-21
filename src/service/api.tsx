import firebase from "firebase";
import { db } from "./firebase";

export const getCurrentUserName = async (email: string) => {
  const user = await db.collection("user").where("email", "==", email);
  return user.get().then((snapShot) => {
    let users: any[] = [];
    snapShot.forEach((doc) => {
      users.push({
        email: doc.data().email,
        name: doc.data().name,
      });
    });
    return users;
  });
};

export const initGet = async (currentUser?: string) => {
  const friend = await db.collection("user").where("email", "==", currentUser);
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
    .where("from", "==", friend)
    .where("to", "==", currentUser);
  const fromChat = await db
    .collection("chat")
    .where("from", "==", currentUser)
    .where("to", "==", friend);
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
    chats.sort(function (a, b) {
      return a.send_time > b.send_time ? 1 : -1;
    });
    return chats;
  });
};

export const friendSearch = async (searchResult?: string) => {
  const friend = await db.collection("user").where("email", "==", searchResult);
  return friend.get().then((snapShot) => {
    let friends: any[] = [];
    snapShot.forEach((doc) => {
      friends.push({
        friend: doc.data(),
      });
    });
    return friends;
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

interface Friend {
  friend_email: string;
  friend_name: string;
}

export const deleteFriend = async (currentUser?: string, friend?: Friend) => {
  const target = await db.collection("user").where("email", "==", currentUser);
  return target.get().then((snapShot) => {
    let dataArr: any[] = [];
    snapShot.forEach((element) => {
      dataArr.push({
        friend: element.data().friend,
      });
    });
    dataArr = dataArr[0].friend.filter(
      (data: any) => friend?.friend_email === data.friend_email
    );
    db.collection("user")
      .doc(currentUser)
      .update({
        friend: firebase.firestore.FieldValue.arrayRemove({
          friend_email: friend?.friend_email,
          friend_name: friend?.friend_name,
          chat_page_login: dataArr[0].chat_page_login,
        }),
      });
  });
};

export const updateChatPageLogin = async (
  currentUser?: string,
  friend?: string
) => {
  const user = await db.collection("user").doc(currentUser).get();
  db.collection("user")
    .doc(currentUser)
    .update({
      friend: firebase.firestore.FieldValue.arrayUnion({
        chat_page_login: firebase.firestore.FieldValue.serverTimestamp(),
      }),
    });
};
