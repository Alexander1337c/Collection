const express = require('express');
const router = express.Router();
const fs = require('fs')
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')

const Profile = require('../../models/Profile')
const User = require('../../models/User')


router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.user.id
        });

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        // only populate from user document if profile exists
        res.json(profile.populate('user', ['name', 'avatar']));
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/', [auth, [
    check('title', 'Название обязательно').not().isEmpty(),
    check('descr', 'Описание обязательно').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    if (req.files === null) {
        return res.status(400).json({ msg: 'Добавьте фото для отправки' });
    }

    const { title, descr } = req.body

    const file = req.files.file

    const profileFields = {};
    profileFields.user = req.user.id;
    if (title) profileFields.title = title;
    if (descr) profileFields.descr = descr;
    if (file) profileFields.file = file;

    try {
        let profile = await Profile.findOne({ user: req.user.id })
        if (profile) {
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true })
        }

        profile = new Profile(profileFields);
        await profile.save()
        return res.json(profile)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }

})

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({
            _id: req.params.user_id
        }).populate('user', ['name', 'avatar']);

        if (!profile) return res.status(400).json({ msg: 'Profile not found' });

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
});

router.delete('/', auth, async (req, res) => {
    try {
        await Profile.findOneAndRemove({ user: req.user.id })
        await User.findOneAndRemove({ _id: req.user.id })
        res.json({ msg: 'User removed' })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

router.put(
    '/item',
    [
        auth,
        [
            check('title', 'Title is required')
                .not()
                .isEmpty(),

        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, tags } = req.body
        const file = req.files.file
        const user = await User.findById(req.user.id).select('-password')
        const newItem = {
            author: user.name,
            title,
            file,
            tags: Array.isArray(tags)
                ? tags
                : tags.split(',').map(tags => ' ' + tags.trim())
        }

        try {
            const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name']);
            profile.item.unshift(newItem);
            await profile.save()
            res.json(profile)
        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server Error')
        }
    })

router.delete('/item/:item_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })

        const removeIndex = profile.item.map(i => i.id).indexOf(req.params.item_id)
        profile.item.splice(removeIndex, 1)
        await profile.save();
        res.json(profile)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

router.put('/like/:id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ _id: req.params.id })

        if (profile.likes.filter(like => like._id.toString() === req.params.id).length > 0) {
            return res.status(400).json({ msg: 'Post already like' })
        }
        profile.likes.unshift({ _id: req.params.id })

        await profile.save()
        res.json(profile.likes)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ _id: req.params.id })

        if (profile.likes.filter(like => like._id.toString() === req.params.id).length === 0) {
            return res.status(400).json({ msg: 'Post has not yet been like' })
        }
        const removeIndex = profile.likes.map(like => like._id.toString().indexOf(req.params.id))

        profile.likes.splice(removeIndex, 1)

        await profile.save()
        res.json(profile.likes)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

router.post(
    '/comment/:id',
    [
        auth,
        [
            check('text', 'Text is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');
            const profile = await Profile.findById(req.params.id);

            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            };

            profile.comments.unshift(newComment);

            await profile.save();

            res.json(profile.comments);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);


router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);

        // Pull out comment
        const comment = profile.comments.find(
            comment => comment.id === req.params.comment_id
        );
        // Make sure comment exists
        if (!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' });
        }
        // Check user
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        profile.comments = profile.comments.filter(
            ({ id }) => id !== req.params.comment_id
        );

        await profile.save();

        return res.json(profile.comments);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

module.exports = router;