import express from 'express';
import bodyParser from 'body-parser';
import api from "./routes/routes.js";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';


const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use('/', api);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.listen(8888, () => {
    console.log("listo para usar");
});
