
//imagecontroller.js
const Image = require('../models/Image');
const fs = require('fs');

exports.createPhoto= (req, res, next) => {
    const ImageObject = JSON.parse(req.body.sauce);
    const sauce = new Image({
        ...ImageObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.likes = 0;
    sauce.dislikes = 0;
    sauce.save()
        .then(() => res.status(201).json({ message: 'Image postée !' }))
        .catch((error) => res.status(400).json({ error: error }));
};


exports.getOnePhoto = (req, res, next) => {
    Image.findOne({ _id: req.params.id })
        .then((sauce) => res.status(200).json(sauce))
        .catch((error) => res.status(404).json({ error: 'error' }));
};

exports.getAllPhoto = (req, res, next) => {
    Image.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch((error) => res.status(400).json({ error: error }));
};

exports.modifyPhoto = (req, res, next) => {

    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
        Image.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (sauce.userId !== req.auth.userId) {
                res.status(403).json({ error: 'Requête non authorisée' });
            }
            else {
                Image.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                    .then(() => res.status(201).json({ message: 'Image updated successfully!' }))
                    .catch((error) => res.status(400).json({ error: error }));
            }
        })
};

exports.deletePhoto = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (!sauce) {
                res.status(404).json({ error: 'Image non existante' });
            }
            if (sauce.userId !== req.auth.userId) {
                res.status(403).json({ error: 'Requête non authorisée' });
            }
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Deleted!' }))
                    .catch((error) => res.status(400).json({ error: error }));
            });
        })
        .catch(error => res.status(500).json({ error }))
};

exports.likePhoto = (req, res, next) => {
    Image.findOne({ _id: req.params.id })
        .then(sauce => {
            if (req.body.like === 1) {
                if (sauce.usersLiked.includes(req.body.userId)) {
                    res.status(401).json({ error: 'Sauce déja liké' });
                }
                else {
                    Image.updateOne({ _id: req.params.id }, { $inc: { likes: req.body.like++ }, $push: { usersLiked: req.body.userId } })
                        .then((sauce) => res.status(200).json({ message: 'Like ajouté !' }))
                        .catch(error => res.status(400).json({ error }))
                }

            }
            else if (req.body.like === -1) {
                if (sauce.usersDisliked.includes(req.body.userId)) {
                    res.status(401).json({ error: 'Image déja disliké' });
                }
                else {
                    Image.updateOne({ _id: req.params.id }, { $inc: { dislikes: (req.body.like++) * -1 }, $push: { usersDisliked: req.body.userId } })
                        .then((sauce) => res.status(200).json({ message: 'Dislike ajouté !' }))
                        .catch(error => res.status(400).json({ error }));
                }
            }
            else {
                if (sauce.usersLiked.includes(req.body.userId)) {
                    Image.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
                        .then((sauce) => { res.status(200).json({ message: 'Like supprimé !' }) })
                        .catch(error => res.status(400).json({ error }));
                }
                else if (sauce.usersDisliked.includes(req.body.userId)) {
                    Image.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
                        .then((sauce) => { res.status(200).json({ message: 'Dislike supprimé !' }) })
                        .catch(error => res.status(400).json({ error }));
                }
            }
        })
        .catch(error => res.status(400).json({ error }));
}