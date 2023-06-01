#!/bin/bash

echo "Creating frontend build..."

cd frontend
npm install
rm -rf build
npm run build

cd ..

echo "Creating backend build..."

cd backend
npm install
rm -rf build
cp -r ../frontend/build .

echo "Build successfully."