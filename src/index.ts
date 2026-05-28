import express from "express";

const PORT = 8000;
const app = express();

app.get("/", (req, res) => {
    res.send("HELLO FROM EXPRESS + TS!!!!!")
})

app.get("/hi", (req, res) => {
    res.send("HIII")
})

app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`)
})