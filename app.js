import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public", "views"));
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket) {
    socket.on("send-location", function(data) {

        console.log(data)
        io.emit("receive-location", { id: socket.id, ...data })


    })
    socket.on("disconnect", function() {
        io.emit("user-disconnected", socket.id)
    })
    console.log("connection works sucsessfully")
});
app.get('/', (req, res) => {
    res.render("index");
});
server.listen(3000, () => console.log("server running on port 3000"));