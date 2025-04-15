# Coin MCP 服务器 🚀💰

欢迎体验 **Coin MCP 服务器** – 你的加密货币价格查询神器，速度快到让你还没喊出“冲上月球！”就拿到数据！🌙 使用 `FastMCP` 打造，搭配 `zod` 做参数校验，这台小服务器就像你的贴身加密管家，随时从 Bitget 的 API 抓取代币价格。🧑‍💼

---

## 它能干啥？🤔

这个项目启动了一个服务器，让你随时查询任意加密货币（搭配 USDT）的最新价格。想知道你心爱的代币现在值多少钱？问一声，价格立刻到手！💸

- **工具**: `getTokenPrice`
- **任务**: 获取指定代币的实时价格（比如 `BGB`、`BTC`、`ETH`）。
- **超能力**: 快、简单、基于 `FastMCP` 的强大支持！⚡

- **工具**: `getAnnoucements`
- **任务**: 获取公告。

- **工具**: `getCoinInfo`
- **任务**: 获取指定代币的详细信息。
- **超能力**: 提供代币的转账能力、支持的链列表、链网络状态等详细信息。

---

## 特色功能 🌟

- 🎯 **超简单 API**: 输入代币符号，拿到价格，零麻烦。
- 🛡️ **Zod 校验**: 参数检查比银行金库还严。
- 📡 **Bitget 集成**: 直接从 Bitget 的市场行情 API 拉取实时数据。
- 🧠 **错误处理**: 像专业选手一样捕获问题，还会记录下来让你偷笑。

---

## 快速上手 🏁

准备好跳进加密价格的海洋了吗？跟着下面步骤开搞吧：

### 前置条件
- **Deno**: 你得装上 Deno，因为我们很潮很现代。去[这里](https://deno.land/)下载。
- **Bitget API**: 不需要 API 密钥，我们直接用公开接口耍帅！但如果你有自定义 `BGURL`，可以设成环境变量。

### 安装
1. 像抢购热门币一样克隆这个仓库：
   ```bash
   git clone https://github.com/pwh-pwh/coin-mcp-server.git
   cd coin-mcp-server
   ```
2. 依赖？Deno 会通过导入自动搞定！

### 启动服务器
用这行命令点火：
```bash
deno run --allow-net --allow-env --allow-read main.ts
```
- `--allow-net`: 让我们跟 Bitget 的 API 聊聊天。
- `--allow-env`: 读取你设定的 `BGURL` 环境变量。

或者
```bash
deno run --allow-net --allow-env --allow-read https://deno.land/x/coin_mcp_server/main.ts
```

服务器会以 `stdio` 模式启动，像个加密自动贩卖机一样随时待命！🍔

3. 支持免安装，直接部署到deno,fork本项目，登录dash.deno.com，设置环境变量StartType=sse 即可使用deno提供的域名使用sse模式连接

---

### 配置

config.json
```json
{
  "mcpServers": {
    "coin-mcp": {
      "command": "deno",
      "args": [
        "run",
        "--allow-net",
        "--allow-read",
        "--allow-env",
        "https://deno.land/x/coin_mcp_server/main.ts"
      ]
    }
  }
}
```

## 使用示例 🎮

调用 `getTokenPrice` 的方法如下：
```json
{
  "tool": "getTokenPrice",
  "parameters": {
    "token": "BGB"
  }
}
```

**返回结果**:
```
"42.069"  // BGB/USDT 的最新价格（不是真价格，只是给你点感觉！）
```

如果代币不存在或 API 打嗝，会抛出错误并留下搞笑的日志，证明它尽力了。😅

---

## 代码偷瞄 👀

幕后魔法：
- **FastMCP**: 启动服务器，带上炫酷的名字和版本。
- **Zod**: 确保你的 `token` 参数没跑偏。
- **Bitget API**: 从 `https://api.bitget.com/api/v2/spot/market/tickers` 抓取行情数据。

`getBitgetPrice` 函数是全场最佳，专门从响应中挖出 `lastPr`（最新价格）。日志里还能看到价格更新或错误笑料！😂

---

## 环境变量 🌍

- `BGURL`: 自定义 Bitget API 基础 URL（默认是 `https://api.bitget.com`）。设置方法：
  ```bash
  export BGURL="https://your-custom-bitget-url.com"
  ```

---

## 排忧解难 🛠️

- **“HTTP error! status: 404”**: 检查代币符号，`BGBUSDT` 和 `BGB` 可不一样！
- **“网络错误”**: 确认网络畅通，Deno 的 `--allow-net` 旗帜插好了吗？
- **还是卡住了？**: 对着虚空大喊（或者开个 issue），我们一起解决！🙌

---

## 为什么要做这个？🎉

谁不想实时掌握自己加密资产的价格呢？不管你是交易员、长期持有者，还是单纯好奇，这服务器都罩得住你。顺便还能秀一把 Deno 技能，顺手玩玩 API，何乐而不为？😎

---

## 贡献一把 🤝

有想法？发现 Bug？想加个根据月相预测价格的功能？Fork 它，改它，PR 它！一起把这打造成银河系最酷的 MCP 服务器吧！🌌

---

## 许可证 📜

MIT – 随便你怎么用，别怪我如果你的代币暴涨或暴跌哦！🌑📉

---

祝你加密狩猎愉快，愿你的钱包永远绿油油！💚
