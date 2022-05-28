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
  exist_flag: boolean;
  chat_page_login: EpochTimeStamp;
  chat: any[];
}

export const chatWithFriendState = atom<ChatWithFriend>({
  key: "chatWithFriendState",
  default: {
    chatWithFriendEmail: "",
    chatWithFriendName: "",
    exist_flag: true,
    chat_page_login: 0,
    chat: [],
  },
});
