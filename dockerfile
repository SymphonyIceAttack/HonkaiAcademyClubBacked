FROM  node:alpine


WORKDIR /usr/app


COPY package.json .
RUN npm i pnpm -g
RUN pnpm i

COPY . .

CMD [ "pnpm","build","" ]