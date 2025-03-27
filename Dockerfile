FROM denoland/deno:latest


WORKDIR /app


COPY . .

RUN deno cache main.ts


# 运行脚本
CMD ["deno", "run", "--allow-net", "--allow-env","--allow-read", "main.ts"]