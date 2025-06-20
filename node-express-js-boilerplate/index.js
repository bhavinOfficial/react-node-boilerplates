import express from "express";

const app = express();
const port = process.env.port || 8000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})