#!/bin/bash
rm -rf .git
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/zoynulabedin/Drawing-competition-app
git branch -M main
git push -u --force origin main
