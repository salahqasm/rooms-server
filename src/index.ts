import express, { Request, Response, NextFunction } from "express"
import { PORT } from "./config";

const app = express();

app.use(express.json());












app.get('/health', (req: Request, res: Response) => {
    res.sendStatus(200)
})

app.listen(PORT,()=>{
    console.log(`********** Started listening on port: ${PORT} **********`)
})