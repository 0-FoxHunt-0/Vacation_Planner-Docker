import cors from "cors";
import express from "express";
import expressFileUpload from "express-fileupload"

import appConfig from "./utils/app-config";
import routeNotFound from "./middleware/route-not-found";
import catchAll from "./middleware/catch-all";
import vacationRoutes from "./routes/vacation-routes";
import authRoutes from "./routes/auth-routes";


const server = express();
server.use(cors()); // Enable Cross Origin Resource Sharing from any frontend.
server.use(express.json());
server.use(expressFileUpload());

server.use("/api", authRoutes)
server.use("/api", vacationRoutes)

server.use(routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => console.log(`Pegasus is listening on port http://localhost:${appConfig.port}`));