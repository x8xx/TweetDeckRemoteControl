import { Denops } from "https://deno.land/x/denops_std@v3.8.2/mod.ts";
import { execute, input, InputOptions } from "https://deno.land/x/denops_std@v3.8.2/helper/mod.ts";
import { ensureString } from "https://deno.land/x/unknownutil@v1.0.0/mod.ts";
import {
  StandardWebSocketClient,
  WebSocketClient,
} from "https://deno.land/x/websocket@v0.1.4/mod.ts";


const endpoint = "ws://127.0.0.1:8080";
let ws: WebSocketClient = new StandardWebSocketClient(endpoint);
let isAliveTweetDeck = false;

ws.on("message", function (message: string) {
  // console.log(message);
  const cmd = message.data.split(":");
  if (cmd[0] == "isAliveTweetDeck") {
    isAliveTweetDeck = Number(cmd[1]) == 1 ? true : false;
  }
});


export async function main(denops: Denops): Promise<void> {
  denops.dispatcher = {
    async checkTweetDeckConnection(): Promise<unknown> {
      if (ws.isClosed) {
        return await Promise.resolve("failed connection vim to ws");
      }
      ws.send("isAliveTweetDeck")
      const result = isAliveTweetDeck ? "ok!" : "failed...";
      return await Promise.resolve(result);
    },
    async reconnect(): Promise<unknown> {
      if (ws.isClosed) {
        ws = new StandardWebSocketClient(endpoint);
      }
      const result = ws.isClosed ? "failed..." : "ok!";
      return await Promise.resolve(result);
    },
    async lscroll(): Promise<unknown> {
      ws.send("lscroll:40");
      return await Promise.resolve();
    },
    async rscroll(): Promise<unknown> {
      ws.send("rscroll:40");
      return await Promise.resolve();
    },
  };

};
