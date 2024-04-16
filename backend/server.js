const app = require("./app");
const http = require("http");
const server = http.createServer(app);
const config = require("./config/config");

const port = process.env.PORT || 3000;

console.log("Database: ", config.MONGO_URI);
console.log("NODE_ENV: ", config.NODE_ENV);
console.log("PORT: ", config.PORT);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
