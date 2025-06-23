#!/bin/bash
set -e

echo "Resetting the database (dropping existing data)..."
npx prisma migrate reset --force

echo "Seeding test data into DB..."
npx prisma db seed

echo "Test data seeded successfully!"