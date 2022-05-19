import { atom } from "recoil";

interface CurrentUser {
  currentUserEmail: string;
  currentUserName: string;
}

export const currentUserState = atom<CurrentUser>({
  key: "currentUserState",
  default: {
    currentUserEmail: "",
    currentUserName: "",
  },
});

interface ChatWithFriend {
  chatWithFriendEmail: string;
  chatWithFriendName: string;
}

export const chatWithFriendState = atom<ChatWithFriend>({
  key: "chatWithFriendState",
  default: {
    chatWithFriendEmail: "",
    chatWithFriendName: "",
  },
});
