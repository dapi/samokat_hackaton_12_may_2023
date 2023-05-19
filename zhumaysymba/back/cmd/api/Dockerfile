# syntax=docker/dockerfile:1

# Stage 1: build
FROM golang:1.20-alpine as builder

RUN mkdir /build
WORKDIR /build

COPY . .

RUN cd ./cmd/api && CGO_ENABLED=0 GOOS=linux go build -v -o /build/api .

# Stage 2: run binary
FROM docker:dind
RUN apk --no-cache add bash

COPY --from=builder /build/api /usr/local/bin/api
WORKDIR /usr/local/bin

CMD ["/usr/local/bin/api"]
