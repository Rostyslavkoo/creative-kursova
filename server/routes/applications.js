const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const { sendApplicationToTelegram } = require('../utils/telegram');

// Отримати всі заявки
router.get('/', async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (e) {
    res.status(500).json({ message: 'Не вдалося отримати заявки' });
  }
});

// Додати заявку
router.post('/', async (req, res) => {
  try {
    const { studentName, birthDate, phone, email, parentName, message } = req.body;
    const application = new Application({ studentName, birthDate, phone, email, parentName, message });
    await application.save();
    try {
      await sendApplicationToTelegram({ studentName, birthDate, phone, email, parentName, message });
    } catch (tgErr) {
      console.error('Telegram error:', tgErr?.response?.data || tgErr.message);
    }
    res.status(201).json({ message: 'Заявка збережена' });
  } catch (e) {
    res.status(500).json({ message: 'Помилка збереження заявки' });
  }
});

// Оновити заявку
router.put('/:id', async (req, res) => {
  try {
    const { studentName, birthDate, phone,status, email, parentName } = req.body;
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { studentName, birthDate, phone, status,email, parentName },
      { new: true }
    );
    if (!application) return res.status(404).json({ message: 'Заявку не знайдено' });
    res.json({ message: 'Заявку оновлено' });
  } catch (e) {
    res.status(500).json({ message: 'Не вдалося оновити заявку' });
  }
});

// Видалити заявку
router.delete('/:id', async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) return res.status(404).json({ message: 'Заявку не знайдено' });
    res.json({ message: 'Заявку видалено' });
  } catch (e) {
    res.status(500).json({ message: 'Не вдалося видалити заявку' });
  }
});

// Оновити статус заявки
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['new', 'viewed', 'waiting', 'continued', 'rejected'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: 'Некоректний статус' });
    }
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!application) return res.status(404).json({ message: 'Заявку не знайдено' });
    res.json({ message: 'Статус оновлено', application });
  } catch (e) {
    res.status(500).json({ message: 'Не вдалося оновити статус' });
  }
});

module.exports = router; 