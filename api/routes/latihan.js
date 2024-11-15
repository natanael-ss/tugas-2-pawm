const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');

router.get('/check-latihan1-status', auth, async (req, res) => {
    try {
        // console.log('User ID from token:', req.user.userId);
        const status = await User.getLatihan1Status(req.user.userId);
        if (!status) {
            return res.status(404).json({ message: 'User tidak ditemukan' });
        }
        res.json({
            completed: status.latihan1,
            score: status.nilai1,
            message: 'Status latihan ditemukan'
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/save-latihan1', auth, async (req, res) => {
    try {
        const { score } = req.body;
        const updatedUser = await User.updateLatihan1(req.user.userId, score);
        
        if (!updatedUser) {
            return res.status(404).json({ message: 'User tidak ditemukan' });
        }
        res.json({ 
            message: 'Hasil latihan berhasil disimpan',
            status: {
                completed: updatedUser.latihan1,
                score: updatedUser.nilai1
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/check-latihan2-status', auth, async (req, res) => {
    try {
        //console.log('User ID from token:', req.user.userId);
        const status = await User.getLatihan2Status(req.user.userId);
        if (!status) {
            return res.status(404).json({ message: 'User tidak ditemukan' });
        }
        res.json({
            completed: status.latihan2,
            score: status.nilai2,
            message: 'Status latihan ditemukan'
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/save-latihan2', auth, async (req, res) => {
    try {
        const { score } = req.body;
        const updatedUser = await User.updateLatihan2(req.user.userId, score);
        
        if (!updatedUser) {
            return res.status(404).json({ message: 'User tidak ditemukan' });
        }
        res.json({ 
            message: 'Hasil latihan berhasil disimpan',
            status: {
                completed: updatedUser.latihan2,
                score: updatedUser.nilai2
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/check-latihan3-status', auth, async (req, res) => {
    try {
        //console.log('User ID from token:', req.user.userId);
        const status = await User.getLatihan3Status(req.user.userId);
        if (!status) {
            return res.status(404).json({ message: 'User tidak ditemukan' });
        }
        res.json({
            completed: status.latihan3,
            score: status.nilai3,
            message: 'Status latihan ditemukan'
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/save-latihan3', auth, async (req, res) => {
    try {
        const { score } = req.body;
        const updatedUser = await User.updateLatihan3(req.user.userId, score);
        
        if (!updatedUser) {
            return res.status(404).json({ message: 'User tidak ditemukan' });
        }
        res.json({ 
            message: 'Hasil latihan berhasil disimpan',
            status: {
                completed: updatedUser.latihan3,
                score: updatedUser.nilai3
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;