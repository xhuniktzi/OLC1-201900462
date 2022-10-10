import { Router } from "express";
import parser from "../controller/parser.controller";

const router = Router();

router.post("/parse", parser);

export default router;
