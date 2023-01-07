FROM  node:alpine


WORKDIR /usr/app


COPY . .
RUN npm --registry=https://registry.npm.taobao.org
RUN npm install --legacy-peer-deps


CMD [ "npm","run","build"]