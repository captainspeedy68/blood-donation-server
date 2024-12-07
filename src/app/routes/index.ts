import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { DonorRoutes } from "../modules/donor/donor.router";
import { ClientRoutes } from "../modules/client/client.routes";

const router = Router();

const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes
    },
    {
        path: "/donors",
        route: DonorRoutes
    },
    {
        path:"/clients",
        route: ClientRoutes
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;