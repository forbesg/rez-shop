type Notification = {
  title: string;
  message: string;
  type?: "success" | "error" | "info";
};

type NotificationState = {
  notification: Notification | null;
};

import { defineStore } from "pinia";

const testNotif = {
  title: "The Test Title",
  message: "This is the message that wil be used in the test notification",
};

export const useNotification = defineStore("notification", {
  state: (): NotificationState => ({
    notification: null,
  }),
  getters: {
    getCart: (state) => state.notification,
  },
  actions: {
    setNotification(payload: Notification | null) {
      this.notification = payload;
    },
  },
});
