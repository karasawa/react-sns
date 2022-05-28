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

// export const initGet = async (currentUser: string | undefined) => {
//   if (currentUser === undefined) {
//     return [];
//   }
//   const friend = await db.collection("user").where("email", "==", currentUser);
//   return friend.get().then((snapShot) => {
//     let friends: any[] = [];
//     let sample: any[] = [];
//     snapShot.forEach((doc) => {
//       sample.push({ friend: doc.data().friend });
//       friends.push({
//         friend: doc.data().friend,
//       });
//     });
//     return friends;
//   });
// };

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

// export const chatGet = async (
//   currentUser: string | undefined,
//   friend: string | undefined
// ) => {
//   if (currentUser !== undefined) {
//     const toChat = await db
//       .collection("chat")
//       .where("from", "==", friend)
//       .where("to", "==", currentUser);
//     const fromChat = await db
//       .collection("chat")
//       .where("from", "==", currentUser)
//       .where("to", "==", friend);
//     let chats: any[] = [];
//     toChat.get().then((snapShot) => {
//       snapShot.forEach((doc) => {
//         chats.push({
//           from: doc.data().from,
//           to: doc.data().to,
//           message: doc.data().message,
//           send_time: doc.data().send_time,
//         });
//       });
//     });
//     return fromChat.get().then((snapShot) => {
//       snapShot.forEach((doc) => {
//         chats.push({
//           from: doc.data().from,
//           to: doc.data().to,
//           message: doc.data().message,
//           send_time: doc.data().send_time,
//         });
//       });
//       chats.sort((a, b) => compare(a.send_time, b.send_time, false));
//       return chats;
//     });
//   }
// };

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

var compare = (a: any, b: any, desc = true) => {
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

export const addFriend = async (
  currentUserEmail?: string,
  currentUserName?: string,
  friendEmail?: string,
  friendName?: string
) => {
  await db
    .collection("user")
    .doc(currentUserEmail)
    .update({
      friend: firebase.firestore.FieldValue.arrayUnion({
        friend_email: friendEmail,
        friend_name: friendName,
        chat_page_login: null,
        exist_flag: true,
      }),
    });
  await db
    .collection("user")
    .doc(friendEmail)
    .update({
      friend: firebase.firestore.FieldValue.arrayUnion({
        friend_email: currentUserEmail,
        friend_name: currentUserName,
        chat_page_login: null,
        exist_flag: true,
      }),
    });
};

export const sendMessage = (
  currentUser?: string,
  friend?: string,
  message?: string
) => {
  db.collection("chat").add({
    send_time: firebase.firestore.FieldValue.serverTimestamp(),
    to: friend,
    from: currentUser,
    message: message,
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
          exist_flag: dataArr[0].exist_flag,
        }),
      });
  });
};

export const updateAccountInfo = async (
  currentUserEmail?: string,
  currentUserName?: string
) => {
  return db
    .collection("user")
    .doc(currentUserEmail)
    .update({ name: currentUserName })
    .then(() => {
      return currentUserName;
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
