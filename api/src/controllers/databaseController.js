export const getHello = (req, res) => {
  res.json({ message: 'Hello from database controller!' });
};

export const getSentences = (req, res) => {
  // For now, return a mock response
  res.status(200).json([
    { id: 1, text: 'Ich lerne Deutsch' },
    { id: 2, text: 'Wie geht es dir?' }
  ]);
}; 