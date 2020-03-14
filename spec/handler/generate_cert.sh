#!/usr/bin bash

openssl genrsa -out key.pem 4096
openssl req -new -key key.pem -out csr.pem
openssl x509 -in csr.pem -out cert.pem -req -signkey key.pem -days 365
