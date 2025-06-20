import express, { Application, Request, Response } from "express";

const app: Application = express();
const port = process.env.port || 8000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})