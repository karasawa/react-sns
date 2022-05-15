import { atom } from "recoil";

export const currentUserState = atom<string>({
  key: "currentUserState",
  default: "",
});

export const chatWithFriendState = atom<string>({
  key: "chatWithFriendState",
  default: "",
});
