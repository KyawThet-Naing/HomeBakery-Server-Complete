require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const path = require("path");
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
server.listen(process.env.PORT, () => console.log(`Server is running at port ${process.env.PORT}.`));

const migration = require("./utils/migration");
const Chat = require("./routes/chat");
const ApiRoute = require("./routes/api");
const UserRoute = require("./routes/user");
const CategoryRoute = require("./routes/category");
const ProductRoute = require("./routes/product");
const GalleryRoute = require("./routes/gallery");
const AdsRoute = require("./routes/ads");
const helper = require("./utils/helper");
// 192.168.111.76
app.use("/api", ApiRoute);
app.use("/user", UserRoute);
app.use("/category", CategoryRoute);
app.use("/product", ProductRoute);
app.use("/gallery", GalleryRoute);
app.use("/ads", AdsRoute);
//static file export
app.use('/uploads', express.static(path.join(__dirname, "uploads")));

app.use((req, res, next) => {
    const error = new Error('Rout not found!');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    const error = app.get('env') == 'development' ? err : {};

    error.status = error.status || 500;
    res.status(error.status).json(helper.msgFormatter(0, error.message, { name: error.name, message: error.message }))



});

//owner migration
let ownerMigrate = async () => await migration.ownerMigration();
// ownerMigrate();
let adsMigrate = async () => await migration.adsMigration();

//adsMigrate();


//chatting
io.of('/chat').use((socket, next) => {
    let token = socket.handshake.query.token;
    let user = jwt.verify(token, process.env.SECRET_KEY);
    socket['userData'] = user;
    if (user) next();
}).on('connect', async (socket) => {
    Chat.initialize(io, socket);
})





