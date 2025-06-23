#!/bin/bash

# Docker 環境のセットアップ
echo "Setting up Docker environment..."
docker-compose up -d --build

# ルートで全体のパッケージをインストール（workspaces 含む）
echo "Installing dependencies..."
npm install

# Prisma のマイグレーション実行
echo "Running Prisma migrations..."
npx prisma migrate dev --name init

# 並列で todo-api と todo-app を起動（バックグラウンドジョブで実行）
echo "Starting todo-api and todo-app..."
npm run dev:todo-api &
npm run dev:todo-app &
wait