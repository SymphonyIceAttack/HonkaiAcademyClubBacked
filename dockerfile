FROM  node:alpine


WORKDIR /usr/app


COPY . .
RUN npm i pnpm -g
RUN pnpm --registry=https://registry.npm.taobao.org
RUN pnpm install --legacy-peer-deps


CMD [ "pnpm","build"]