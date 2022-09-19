import {
  WebSocketClient,
  WebSocketServer,
} from "https://deno.land/x/websocket@v0.1.4/mod.ts";

const wss = new WebSocketServer(8080);
let tweetdeckClient: WebSocketClient;

wss.on("connection", function (wsc: WebSocketClient) {
  wsc.on("message", function (message: string) {
    const cmd = message.split(":");
    if (cmd[0] == "regist") {
      registClient(wsc);
    } else if (cmd[0] == "isAliveTweetDeck") {
      if (tweetdeckClient.isClosed) {
        wsc.send("isAliveTweetDeck:0");
      } else {
        wsc.send("isAliveTweetDeck:1");
      }
    }

    tweetdeckClient.send(message);
  });
});

const registClient = (wsc: WebSocketClient) => {
  tweetdeckClient = wsc;
  wsc.send("message:succsess regist client");
};
