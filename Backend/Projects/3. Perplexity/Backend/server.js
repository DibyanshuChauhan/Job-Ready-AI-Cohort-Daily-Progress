import "dotenv/config";
import app from "./src/app.js";
import connectToDb from "./src/config/db.js";

connectToDb();

app.listen(process.env.PORT || 3000, () => {
    console.log("server is running on port " + process.env.PORT);
});