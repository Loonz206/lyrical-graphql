const app = require("./server/server");
const { port } = require("./config/config");

app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});
