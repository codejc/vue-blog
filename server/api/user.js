
import express from "express";
import {
    login,
    register,
    getUserInfo
} from "../controllers/user";

const router = express.Router();

router.post("*/login", login)
.post("*/register", register)
.post("*/getUserInfo", getUserInfo);

export default router;
