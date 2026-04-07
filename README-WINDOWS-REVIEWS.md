# Windows Reviews Extractor

Extract positive Windows mentions from Twitter and analyze sentiment.

## Quick Start

### No setup required (sample data):
```bash
node get-windows-reviews.js
```

Output: Shows 5 positive tweets from sample data with sentiment analysis.

---

## Installation & Setup

### Option 1: Use with Real Twitter API

1. **Get Twitter API Credentials**
   - Go to [developer.twitter.com](https://developer.twitter.com)
   - Create a new project
   - Generate API keys and secrets

2. **Set Environment Variables**
   
   **On macOS/Linux:**
   ```bash
   export TWITTER_API_KEY="your_key_here"
   export TWITTER_API_SECRET="your_secret_here"
   node get-windows-reviews.js --api
   ```

   **On Windows (PowerShell):**
   ```powershell
   $env:TWITTER_API_KEY="your_key_here"
   $env:TWITTER_API_SECRET="your_secret_here"
   node get-windows-reviews.js --api
   ```

   **On Windows (Command Prompt):**
   ```cmd
   set TWITTER_API_KEY=your_key_here
   set TWITTER_API_SECRET=your_secret_here
   node get-windows-reviews.js --api
   ```

3. **Install Twitter API dependency** (when implementing real API)
   ```bash
   npm install twitter-api-v2
   ```

---

## Usage Examples

### 1. Run with sample data
```bash
node get-windows-reviews.js
```

### 2. Run with Twitter API
```bash
TWITTER_API_KEY=xxx TWITTER_API_SECRET=yyy node get-windows-reviews.js --api
```

### 3. Use in your code
```javascript
const { getPositiveWindowsTweets } = require('./get-windows-reviews.js');

const tweets = [
  { id: 1, author: '@user', text: 'Windows is amazing!' },
  { id: 2, author: '@user2', text: 'Windows is terrible' }
];

const positive = getPositiveWindowsTweets(tweets);
console.log(positive); // Only the first tweet
```

---

## Configuration

Customize behavior via `config.json` in the project root:

- `keywords.positive`, `keywords.negative`
- `filter.requireWindowsMention` (true/false)
- `twitterApi.enabled` (true/false)

Example:
```json
{
  "keywords": {
    "positive": ["great", "awesome"],
    "negative": ["bad", "terrible"]
  },
  "filter": {
    "requireWindowsMention": true
  },
  "twitterApi": {
    "enabled": false
  }
}
```

---

## Output Format

### Console Table
```
┌────────┬──────────┬─────────────────────┬──────────────┬────────────┐
│ Author │ Tweet    │ Date                │ Sentiment    │ (index)    │
├────────┼──────────┼─────────────────────┼──────────────┼────────────┤
│ @user1 │ Windows… │ 2026-03-31          │ positive     │ 0          │
```

### Summary Stats
```
✅ Total positive tweets: 5
📈 Sentiment breakdown:
   - Positive: 5
   - Neutral: 1
   - Negative: 2
```

---

## Customization

### Add Custom Keywords

Edit `get-windows-reviews.js`:

```javascript
const POSITIVE_KEYWORDS = [
  'love', 'great', 'amazing', // ... your keywords
];

const NEGATIVE_KEYWORDS = [
  'hate', 'terrible', 'worst', // ... your keywords
];
```

### Filter by Date or Author

```javascript
const filtered = getPositiveWindowsTweets(tweets)
  .filter(t => t.timestamp >= '2026-03-30')
  .filter(t => !t.author.includes('bot'));
```

---

## Integration with Manager IQ

Add to your reporting pipeline:

```javascript
const { getPositiveWindowsTweets } = require('./get-windows-reviews.js');

async function generateWindowsSentimentReport() {
  const tweets = await fetchWindowsTweets();
  const positive = getPositiveWindowsTweets(tweets);
  
  return {
    date: new Date().toISOString(),
    platform: 'twitter',
    total: tweets.length,
    positive: positive.length,
    sentiment_score: (positive.length / tweets.length * 100).toFixed(2) + '%'
  };
}
```

---

## Troubleshooting

**Q: "Credentials not found" warning?**  
A: Set TWITTER_API_KEY and TWITTER_API_SECRET environment variables, or just use without --api flag for sample data.

**Q: How to add real data?**  
A: Replace `sampleTweets` array with data from your API/database, or implement the Twitter API integration.

**Q: How to export results?**  
A: Pipe output or modify script to save to JSON:
```bash
node get-windows-reviews.js > results.json
```

---

## What It Does

✅ Analyzes tweet sentiment (positive/neutral/negative)  
✅ Filters for Windows-related content  
✅ Counts and displays positive mentions  
✅ Shows summary statistics  
✅ Ready for API integration  

---

## Next Steps

- [ ] Connect to real Twitter API v2
- [ ] Add date range filtering
- [ ] Generate daily reports
- [ ] Export to CSV/PDF
- [ ] Create Manager IQ plugin
