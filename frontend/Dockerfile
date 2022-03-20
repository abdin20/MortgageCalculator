FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat
RUN mkdir /frontend
WORKDIR /frontend
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile


FROM node:16-alpine AS runner
WORKDIR /frontend
COPY --from=deps /frontend/node_modules ./node_modules
COPY . .


EXPOSE 3000




