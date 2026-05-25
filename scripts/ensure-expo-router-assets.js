const fs = require("fs");
const path = require("path");

const pngBase64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAFgwJ/lJ1x9wAAAABJRU5ErkJggg==";

const root = path.resolve(__dirname, "..");
const source = path.join(root, "assets", "images", "icon.png");
const target = path.join(root, "node_modules", "expo-router", "assets", "unmatched.png");

fs.mkdirSync(path.dirname(source), { recursive: true });
fs.mkdirSync(path.dirname(target), { recursive: true });

if (!fs.existsSync(source)) {
  fs.writeFileSync(source, Buffer.from(pngBase64, "base64"));
}

fs.copyFileSync(source, target);
