const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    saveContact,
    getContacts,
    deleteContact
} = require("../controllers/contactController");

// ======================
// PUBLIC ROUTE
// ======================

// Anyone can send a contact message
router.post("/", saveContact);

// ======================
// PROTECTED ROUTES
// ======================

// Only admin can view messages
router.get("/", verifyToken, getContacts);

// Only admin can delete messages
router.delete("/:id", verifyToken, deleteContact);

module.exports = router;