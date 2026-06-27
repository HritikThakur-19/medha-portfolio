const Contact = require("../models/Contact");

// Save Contact Message
const saveContact = async (req, res) => {

    try {

        const contact = new Contact(req.body);

        await contact.save();

        res.json({

            success: true,

            message: "Message Sent Successfully!"

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// Get All Messages
const getContacts = async (req, res) => {

    try {

        const contacts = await Contact.find().sort({ createdAt: -1 });

        res.json(contacts);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// Delete Message
const deleteContact = async (req, res) => {

    try {

        await Contact.findByIdAndDelete(req.params.id);

        res.json({

            success: true,

            message: "Message Deleted"

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    saveContact,

    getContacts,

    deleteContact

};