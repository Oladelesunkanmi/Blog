#!/bin/sh

nv .env.prod .env
rm .env.prod

chmod +x ./server
nginx -g "daemon on;" & ./server