const express = require('express');
const router = express.Router();
const fraudDetectionService = require('../services/fraudDetection');
const { validateReviewText } = require('../utils/validators');

// POST /api/analyze - Analyze a review text for fraud indicators
router.post('/analyze', async (req, res) => {
  try {
    const { text } = req.body;

    // Validate input
    const validation = validateReviewText(text);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: validation.error
      });
    }

    // Call fraud detection service
    const result = await fraudDetectionService.analyzeReview(text);

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Analyze error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to analyze review'
    });
  }
});

module.exports = router;
