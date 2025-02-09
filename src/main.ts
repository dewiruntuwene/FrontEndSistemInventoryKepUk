import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { io } from "socket.io-client";

const app = createApp(App);
app.use(router);
app.mount("#app");



const socket = io("https://localhost:5173", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("Connected to WebSocket:", socket.id);
});

socket.on("message", (msg) => {
  console.log("Received message:", msg);
});

socket.on("disconnect", () => {
  console.log("Disconnected from WebSocket");
});
