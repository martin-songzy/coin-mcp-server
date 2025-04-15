import { FastMCP } from "npm:fastmcp";
import { z } from "npm:zod";
import {number} from "npm:zod@3.24.2";

const server = new FastMCP({
  name: "coin mcp server",
  version: "1.0.5",
});

server.addTool({
  name: "getTokenPrice",
  description: "get the current price of cryptocurrency",
  parameters: z.object({
    token: z.string()
  }),
  execute: async (args) => {
    return getBitgetPrice(args.token);
  },
});

server.addTool({
  name: "getAnnoucements",
  description: "Search for cryptocurrency announcements within one month .parameter anType is announcement type\nAnnouncement type\n" +
      "latest_news: Latest events\n" +
      "coin_listings: New coin listings\n" +
      "trading_competitions_promotions: Trading competitions and promotions\n" +
      "maintenance_system_updates: maintenance/system upgrades\n" +
      "symbol_delisting: Delisting information\n" +
      "empty string for all announcements",
  parameters: z.object({
    anType: z.enum(["latest_news", "coin_listings", "trading_competitions_promotions","maintenance_system_updates","symbol_delisting",""])
  }),
  execute: async (args,{log}) => {
    return getAnnoucements(args.anType,log);
  },
});

server.addTool({
  name: "getCoinInfo",
  description: "Get spot coin information。Parameter：coin - Coin name\nResponse Parameters \n" +
      "- coin: Token name  \n" +
      "- transfer: Transferability  \n" +
      "- chains: Support chain list  \n" +
      "  - chain: Chain name  \n" +
      "  - needTag: Need tag  \n" +
      "  - withdrawable: Withdrawal supported  \n" +
      "  - rechargeable: Deposit supported  \n" +
      "  - withdrawFee: Withdrawal transaction fee  \n" +
      "  - extraWithdrawFee: Extra charge (e.g., 0.1 means 10% on-chain destruction)  \n" +
      "  - browserUrl: Blockchain explorer address  \n" +
      "  - contractAddress: Coin contract address  \n" +
      "  - withdrawStep: Withdrawal count step (if not 0, withdrawal size must be a multiple of this value; if 0, no such limit)  \n" +
      "  - withdrawMinScale: Decimal places of withdrawal amount  \n" +
      "  - congestion: Chain network status (normal: normal, congested: congestion)",
  parameters: z.object({
    coin: z.string()
  }),
  execute: async (args) => {
    return getCoinInfo(args.coin);
  },
});

async function getBitgetPrice(token: string) {
  try {
    const baseUrl = Deno.env.get("BGURL") || "https://api.bitget.com";
    const url = `${baseUrl}/api/v2/spot/market/tickers?symbol=${token}USDT`;
    console.log(url);
    // 发送 GET 请求
    const response = await fetch(url);

    // 检查响应状态
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 解析 JSON
    const data = await response.json();

    // 获取 data[0].lastPr
    const lastPrice = data.data[0].lastPr;
    return String(lastPrice);

  } catch (error) {
    console.error('请求失败:', error);
    throw error;
  }
}

async function getAnnoucements(anType: string,log: any) {
  try {
    const baseUrl = Deno.env.get("BGURL") || "https://api.bitget.com";
    const url = `${baseUrl}/api/v2/public/annoucements?language=zh_CN&annType=${anType}`;
    log.info("info"+String(url));
    // 发送 GET 请求
    const response = await fetch(url);
    console.log(url)
    // 检查响应状态
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 解析 JSON
    const data = await response.json();
    log.info("getData",data);
    return JSON.stringify(data);

  } catch (error) {
    console.error('请求失败:', error);
    throw error;
  }
}

async function getCoinInfo(token: string) {
  try {
    const baseUrl = Deno.env.get("BGURL") || "https://api.bitget.com";
    const url = `${baseUrl}/api/v2/spot/public/coins?coin=${token}`;
    console.log(url);
    // 发送 GET 请求
    const response = await fetch(url);

    // 检查响应状态
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 解析 JSON
    const data = await response.json();

    return JSON.stringify(data);

  } catch (error) {
    console.error('请求失败:', error);
    throw error;
  }
}
const startType = Deno.env.get("StartType") || "stdio";
const PORT = Deno.env.get("PORT") || "3001";
console.log("PORT:",PORT)
if(startType == "stdio") {
  server.start({
  transportType: "stdio",
});
} else if(startType == "sse") {
  server.start({
  transportType: "sse",
  sse: {
    endpoint: "/sse",
    port: parseInt(PORT),
  },
});
} else if(startType == "all") 
{
  server.start({
  transportType: "sse",
  sse: {
    endpoint: "/sse",
    port: parseInt(PORT),
  },
});
  server.start({
  transportType: "stdio",
});
}

