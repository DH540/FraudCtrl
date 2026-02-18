function validateReviewText(text) {
  if (!text) {
    return {
      valid: false,
      error: 'Review text is required'
    };
  }

  if (typeof text !== 'string') {
    return {
      valid: false,
      error: 'Review text must be a string'
    };
  }

  const trimmedText = text.trim();

  if (trimmedText.length < 5) {
    return {
      valid: false,
      error: 'Review text must be at least 5 characters long'
    };
  }

  if (trimmedText.length > 5000) {
    return {
      valid: false,
      error: 'Review text must not exceed 5000 characters'
    };
  }

  return {
    valid: true,
    error: null
  };
}

module.exports = {
  validateReviewText
};
