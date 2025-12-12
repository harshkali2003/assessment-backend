require("./config/dbConfig")

const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express();

app.use(express.json())

app.use(cors({
    origin : "*",
    credentials : true,
    methods : ["GET" , "POST" , "PUT" , "PATCH" , "DELETE"]
}))

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
  next();
});

const user = require("./routes/user")
const product = require("./routes/product")

app.use("/user" , user)
app.use("/product" , product)

app.listen(process.env.PORT , ()=>{
    console.log(`Server is running on ${process.env.PORT}`);
})