FROM  node:alpine


WORKDIR /usr/app


COPY package.json .
RUN npm i pnpm -g
RUN pnpm --registry=https://registry.npm.taobao.org
RUN pnpm i
RUN pnpm i -D @prisma/cli

COPY . .

CMD [ "pnpm","build","" ]