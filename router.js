const express = require("express");

const posts = require("./data/db");

const router = express.Router();

router.get("/", (req, res) => {
    posts.find(req.query)
    .then((posts) => {
        res.status(200).json({ queryString: req.query, posts });
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({
            error: "The posts information could not be retrieved.",
        })
    })
})

router.post("/", (req, res) => {
    posts.add(req.body)
    .then((post) => {
        res.status(201).json(post);
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({
            error: "There was an error while saving the post to the database"
        })
    })
})

router.post("/:id/comments", (req, res) => {
    posts.insertComment(req.body)
    .then((comment) => {
        res.status(201).json(comment);
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "There was an error while saving the comment to the database" })
    })
})

router.get("/:id", (req, res) => {
    posts.findById(req.params.id)
    .then((post) => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({
            error: "The post information could not be retrieved."
        })
    })
})

router.get("/:id/comments", (req, res) => {
    posts.findPostComments(req.params.id)
    .then((comment) => {
        if (comment) {
            res.status(200).json(comment);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({
            error: "The comments information could not be retrieved."
        })
    })
})

router.delete("/:id", (req, res) => {
    const id = req.params.id;

    posts.remove(id)
    .then((count) => {
        if (count) {
            res.status(200).json({ message: 'post deleted'});
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch((error) => {
        console.log(error);

        res.status(500).json({ error: "The post could not be removed" })
    })
})

router.put("/:id", (req, res) => {
    const changes = req.body;

    console.log("changes:", changes);

    posts.update(req.params.id, changes)
    .then((count) => {
        if (req.body == undefined) {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        } else if (count) {
            posts.findById(req.params.id)
            .then((post) => {
                res.status(200).json(post);
            })
            .catch((err) => {
                res.status(500).json({ error: "The post information could not be modified." })
            })
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "The post information could not be modified." })
    })
})

module.exports = router;





// res.status(404).json({ message: "The post with the specified ID does not exist." })





// .then((count) => {
//     if (count) {
//         posts.findById(req.params.id)
//         .then((post) => {
//             res.status(200).json(hub);
//         })
//         .catch((error) => {
//             res.status(500).json({ error: "error reading updated post" })
//         })
//     } else {
//         res.status(404).json({ message: "The post with the specified ID does not exist." })
//     }
// })
// })