let Express = require("express");
let router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");

const { JournalModel } = require("../models");

router.get('/practice', validateJWT, (req, res) => {
    res.send('Hey!! This is a practice route!')
});

/*
====================================
JOURNAL CREATE
====================================
*/
router.post("/create", validateJWT, async (req, res) => {
    const { title, date, entry } = req.body.journal;
    const { id } = req.user;
    const journalEntry = {
        title,
        date,
        entry,
        owner: id
    }
    try {
        const newJournal = await JournalModel.create(journalEntry);
        res.status(200).json(newJournal);
    } catch (err) {
        res.status(500).json({ error: err });
    }
    JournalModel.create(journalEntry)

})

/*
===========================================
GET ALL JOURNALS
===========================================
*/
router.get("/", async (req, res) => {
    try {
        const entries = await JournalModel.findAll();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

/*
===========================================
GET JOURNALS BY USER
===========================================
*/
router.get("/mine", validateJWT, async (req, res) => {
    const { id } = req.user;
    try {
        const userJournals = await JournalModel.findAll({
            where: {
             owner: id   
            }
        });
        res.status(200).json(userJournals);
    } catch (err) {
        res.status(500).json({ error: err});
    }
})

router.get('/about', (req, res) => {
    res.send('This is the about route!')
});

module.exports = router;