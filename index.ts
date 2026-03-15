import app from "./server/server";
import { port } from "./config/config";

app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});
