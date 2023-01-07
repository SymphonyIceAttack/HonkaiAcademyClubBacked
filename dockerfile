FROM  node:alpine


WORKDIR /usr/app


COPY package.json .

RUN pnpm i

COPY . .

CMD [ "pnpm","build","" ]