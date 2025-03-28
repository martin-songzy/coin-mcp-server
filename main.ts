import { FastMCP } from "npm:fastmcp";
import { z } from "npm:zod";

const server = new FastMCP({
  name: "coin mcp server",
  version: "1.0.0",
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
  description: "Search for cryptocurrency announcements within one month .parameter anType is announcement type",
  parameters: z.object({
    anType: z.enum(["latest_news", "coin_listings", "trading_competitions_promotions","maintenance_system_updates","symbol_delisting"])
  }),
  execute: async (args) => {
    return getAnnoucements(args.anType);
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
    return lastPrice;

  } catch (error) {
    console.error('请求失败:', error);
    throw error;
  }
}

async function getAnnoucements(anType: string) {
  try {
    const baseUrl = Deno.env.get("BGURL") || "https://api.bitget.com";
    const url = `${baseUrl}/api/v2/public/annoucements?annType=${anType}`;

    // 发送 GET 请求
    const response = await fetch(url);

    // 检查响应状态
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 解析 JSON
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('请求失败:', error);
    throw error;
  }
}

server.start({
  transportType: "stdio",
});