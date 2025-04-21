FROM node:lts-jod AS build
WORKDIR /app

ENV IS_BUILD=true

RUN corepack enable

COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm build

RUN pnpm install --prod

FROM node:lts-jod
WORKDIR /app

ENV IS_BUILD=true
ENV NODE_ENV=production

RUN corepack enable

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

EXPOSE 3002 3002

ENTRYPOINT ["node", "."]
