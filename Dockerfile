# 使用官方 Deno 镜像作为基础镜像
FROM denoland/deno:1.42.0

# 设置工作目录
WORKDIR /app

# 复制项目文件到容器中
COPY . .

# 缓存依赖（提高构建速度）
RUN deno cache main.ts


# 运行脚本
CMD ["deno", "run", "--allow-net", "--allow-env","--allow-read", "main.ts"]