FROM golang:alpine AS backend-builder

ENV GO111MODULE=on \
    GOPROXY=https://goproxy.cn,direct \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

WORKDIR /build

COPY go.mod go.sum ./
RUN go mod tidy

COPY . .

RUN go build -o app .

FROM alpine:latest

WORKDIR /dist

COPY --from=backend-builder /build/app .
COPY --from=backend-builder /build/configuration-backend.yaml .

COPY --from=backend-builder /build/abi/power-voting.json ./
COPY --from=backend-builder /build/abi/power-voting-fip.json ./
# Copy oracle abi to instance
COPY --from=backend-builder /build/abi/oracle-powers.json ./
COPY --from=backend-builder /build/abi/oracle.json ./
COPY --from=backend-builder /build/.env ./
CMD ["/dist/app"]
