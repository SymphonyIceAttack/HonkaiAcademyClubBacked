FROM  node:alpine


WORKDIR /usr/app


COPY . .
RUN npm install -g cnpm --registry=https://registry.npmmirror.com

RUN cnpm install --save  --legacy-peer-deps --


CMD [ "npm","run","build"]