import { WebSocketServer } from "ws";

export const initWebSocket = (server: any) => {

  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.send(JSON.stringify({ type: "WELCOME" }));

    ws.on("message", (msg) => { console.log("Received:", msg.toString()); });
  });
};