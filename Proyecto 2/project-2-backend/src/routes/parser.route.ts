import { Router } from "express";
import parser from "../controller/parser.controller";
// import table from "../controller/table.controller";

const router = Router();

router.post("/parse", parser);
// router.get("/table", table);

export default router;
