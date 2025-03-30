const net = require("net");
const dgram = require("dgram");
const vm = require("vm");
const v8 = require("v8");
const http = require("http");
const https = require("https");
const crypto = require("crypto");
const fs = require("fs");
const cluster = require("cluster");
const child_process = require("child_process");

console.log(process.argv);
console.log(process.env);
