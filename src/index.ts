import express, { Request, Response, NextFunction } from "express"
import { Server } from "socket.io";
import http from "http"
import { PORT } from "./config";
import cors from "cors"
const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"*"
    }
})
app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
    console.log("Connected")
    io.emit("message", { data: "Connected" })
    socket.on("message", (data) => {
        console.log(data.message)
        socket.emit("message", { event: "message", data:data.message })
        if(data.message==="close"){
            socket.disconnect();
        }
    })
    socket.on("disconnect",(data)=>{
        socket.emit("message",{event:"message",data:"good bye"})
        console.log("disconnected")
    })
})






app.get('/health', (req: Request, res: Response) => {
    res.sendStatus(200)
})

server.listen(PORT, () => {
    console.log(`********** Started listening on port: ${PORT} **********`)
})