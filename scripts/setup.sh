#!/bin/bash

# docker setup script for the project
echo "Setting up Docker environment..."
docker-compose up -d --build

# todo-app setup
echo "Setting up todo-app..."
npm install

# migration for todo-app
npx prisma migrate dev --name init

# start the todo-app
cd todo-app
npm run dev