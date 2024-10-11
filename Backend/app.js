import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./routes/messageRouter.js";
import userRouter from "./routes/userRouter.js";
import uepRouter from "./routes/uepRouter.js";
import kubeRouter from "./routes/kubeRouter.js";
import manfaatRouter from "./routes/manfaatRouter.js";
import ppksRouter from './routes/ppksRouter.js';
import psksRouter from './routes/psksRouter.js';
import verifikasiUEPRouter from './routes/verifikasiUEPRouter.js'; 
import verifikasiKUBERouter from './routes/verifikasiKUBERouter.js'; 
import verifikasiMANFAATRouter from './routes/verifikasiMANFAATRouter.js'; 
import evaluasiUEPRouter from './routes/evaluasiUEPRouter.js';
import evaluasiKUBERouter from './routes/evaluasiKUBERouter.js';
import evaluasiMANFAATRouter from './routes/evaluasiMANFAATRouter.js';
import recapPPKSRouter from './routes/recapPPKSRouter.js';
import recapPSKSRouter from './routes/recapPSKSRouter.js';
import socialWelfareRouterPPKS from './routes/socialWelfareRouterPPKS.js'; 
import socialWelfareRouterPSKS from './routes/socialWelfareRouterPSKS.js'; 

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Endpoint untuk berbagai entitas
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/uep", uepRouter);
app.use("/api/v1/kube", kubeRouter);
app.use("/api/v1/manfaat", manfaatRouter);
app.use('/api/v1/ppks', ppksRouter);
app.use('/api/v1/psks', psksRouter);
app.use('/api/v1/verifikasi/Uep', verifikasiUEPRouter); 
app.use('/api/v1/verifikasi/Kube', verifikasiKUBERouter); 
app.use('/api/v1/verifikasi/Manfaat', verifikasiMANFAATRouter);
app.use('/api/v1/evaluasi/Uep', evaluasiUEPRouter);
app.use('/api/v1/evaluasi/Kube', evaluasiKUBERouter);
app.use('/api/v1/evaluasi/Manfaat', evaluasiMANFAATRouter); 
app.use('/api/v1/recap/ppks', recapPPKSRouter);
app.use('/api/v1/recap/psks', recapPSKSRouter);
app.use('/api/v1/ppks/social-welfare', socialWelfareRouterPPKS); 
app.use('/api/v1/psks/social-welfare', socialWelfareRouterPSKS); 

dbConnection(); // Inisiasi koneksi database
app.use(errorMiddleware); // Middleware untuk menangani error

export default app;