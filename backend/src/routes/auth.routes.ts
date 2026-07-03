import { Router } from "express";

const router = Router();

router.post("/register", (req, res) => {
    res.json({
        message: "Register route working 🚀",
    });
});

export default router;