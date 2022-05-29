import firebase from "firebase";
import { db } from "./firebase";

export const createUserInfo = async (email: string, username: string) => {
  db.collection("user")
    .doc(email)
    .set({
      email: email,
      name: username,
    })
    .then(() => {
      console.log("create success");
    })
    .catch((err) => {
      console.log(err);
    });
};

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

export const initGet = async (currentUser: string | undefined) => {
  if (currentUser === undefined) {
    return [];
  }
  const friendDoc = await db
    .collection("user")
    .doc(currentUser)
    .collection("friend");
  return friendDoc.get().then((snapShot) => {
    let friends: any = [];
    snapShot.forEach((doc) => {
      friends.push(doc.data());
    });
    return friends;
  });
};

export const chatGet = async (
  currentUser: string | undefined,
  friend: string | undefined
) => {
  if (currentUser !== undefined) {
    const toChat = await db
      .collection("user")
      .doc(currentUser)
      .collection("friend")
      .where("email", "==", friend);
    const fromChat = await db
      .collection("user")
      .doc(friend)
      .collection("friend")
      .where("email", "==", currentUser);
    let chats: any = [];
    let allChats: any = [];
    toChat.get().then((snapShot) => {
      snapShot.forEach((doc) => {
        chats.push(doc.data().chat);
      });
    });
    return fromChat.get().then((snapShot) => {
      snapShot.forEach((doc) => {
        chats.push(doc.data().chat);
      });
      chats[0].forEach((data: any) => {
        allChats.push({ data });
      });
      chats[1].forEach((data: any) => {
        allChats.push({ data });
      });
      allChats.sort((a: any, b: any) =>
        compare(a.data.send_time, b.data.send_time, false)
      );
      return allChats;
    });
  }
};

export const compare = (a: any, b: any, desc = true) => {
  if (a !== a && b !== b) return 0;
  if (a !== a) return 1;
  if (b !== b) return -1;

  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;

  if (a === "" && b === "") return 0;
  if (a === "") return 1;
  if (b === "") return -1;

  var sig = desc ? 1 : -1;
  return a < b ? sig : a > b ? -sig : 0;
};

export const friendSearch = async (searchResult: string | undefined) => {
  if (searchResult !== undefined) {
    const friend = await db
      .collection("user")
      .where("email", "==", searchResult);
    return friend.get().then((snapShot) => {
      let friends: any = [];
      snapShot.forEach((doc) => {
        friends.push({
          friend: doc.data(),
        });
      });
      return friends;
    });
  }
};

export const addFriend = async (
  currentUserEmail: string | undefined,
  currentUserName: string | undefined,
  friendEmail: string | undefined,
  friendName: string | undefined
) => {
  if (currentUserEmail !== undefined && friendEmail !== undefined) {
    await db
      .collection("user")
      .doc(currentUserEmail)
      .collection("friend")
      .doc(friendEmail)
      .set({
        chat: [],
        chat_page_login: null,
        email: friendEmail,
        exist_flag: true,
        name: friendName,
      });
    await db
      .collection("user")
      .doc(friendEmail)
      .collection("friend")
      .doc(currentUserEmail)
      .set({
        chat: [],
        chat_page_login: null,
        email: currentUserEmail,
        exist_flag: true,
        name: currentUserName,
      });
  }
};

export const sendMessage = (
  currentUser: string | undefined,
  friend: string | undefined,
  message: string | undefined
) => {
  if (message !== undefined && message !== "") {
    db.collection("user")
      .doc(currentUser)
      .collection("friend")
      .doc(friend)
      .update({
        chat: firebase.firestore.FieldValue.arrayUnion({
          from: currentUser,
          message: message,
          send_time: firebase.firestore.Timestamp.now(),
        }),
      });
  }
};

export const deleteFriend = async (
  currentUser: string | undefined,
  friend: string | undefined
) => {
  if (currentUser !== undefined && friend !== undefined) {
    await db
      .collection("user")
      .doc(currentUser)
      .collection("friend")
      .doc(friend)
      .delete()
      .then(() => console.log("delete success"))
      .catch((err) => console.log(err));
  }
};

export const updateAccountInfo = async (
  currentUserEmail: string | undefined,
  currentUserName: string | undefined
) => {
  if (currentUserEmail !== undefined && currentUserName !== undefined) {
    db.collection("user")
      .doc(currentUserEmail)
      .collection("friend")
      .get()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          db.collection("user")
            .doc(doc.data().email)
            .collection("friend")
            .doc(currentUserEmail)
            .update({ name: currentUserName });
        });
      });
    return db
      .collection("user")
      .doc(currentUserEmail)
      .update({ name: currentUserName })
      .then(() => {
        return currentUserName;
      });
  }
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
