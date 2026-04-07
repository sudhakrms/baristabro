# Copilot Instructions for Windows Reviews Repository

## Project Overview

This is a Node.js application that extracts and analyzes positive sentiment mentions of Windows from Twitter. It provides both sample data mode and Twitter API integration capabilities, with built-in sentiment analysis and reporting features.

## Build, Test & Run Commands

### Quick Start (No Installation Required)
```bash
npm run windows-reviews
```
Runs with embedded sample data showing 5 positive tweets about Windows with sentiment analysis.

### Twitter API Mode
```bash
npm run windows-reviews:api
```
Attempts to fetch real data via Twitter API (requires `TWITTER_API_KEY` and `TWITTER_API_SECRET` environment variables; falls back to sample data if credentials missing).

### Setting Environment Variables
**PowerShell:**
```powershell
$env:TWITTER_API_KEY="your_key_here"
$env:TWITTER_API_SECRET="your_secret_here"
npm run windows-reviews:api
```

**Command Prompt:**
```cmd
set TWITTER_API_KEY=your_key_here
set TWITTER_API_SECRET=your_secret_here
npm run windows-reviews:api
```

### Direct Execution
```bash
node get-windows-reviews.js        # Sample data
node get-windows-reviews.js --api  # Try API (with fallback)
```

## Architecture & Key Components

### Core Logic Flow
1. **Sentiment Analysis** (`analyzeSentiment`): Classifies text as `positive`, `negative`, or `neutral` based on keyword matching
   - Positive keywords: 'love', 'great', 'amazing', 'excellent', 'perfect', 'awesome', 'fantastic', positive emojis (👍❤️🎉✨💯)
   - Negative keywords: 'hate', 'terrible', 'worst', 'bad', 'awful', 'horrible', 'broken', 'crash', 'fail', negative emojis (👎😡😞)
   - Negative sentiment takes precedence if both keyword types are present

2. **Tweet Filtering** (`getPositiveWindowsTweets`): Filters tweets where sentiment is `positive` and enriches them with sentiment metadata

3. **Data Source** (`fetchFromTwitterAPI`): 
   - Checks for API credentials; warns if missing
   - Currently returns sample data (placeholder for real Twitter API v2 integration)

4. **Main Execution** (`main`):
   - Parses CLI args (`--api` flag)
   - Fetches tweets from appropriate source
   - Displays results in console table format
   - Shows sentiment breakdown statistics

### Module Structure
- **get-windows-reviews.js**: Single entry point containing all logic
- **Exported Functions**: `getPositiveWindowsTweets`, `analyzeSentiment` (available via `require()` for integration with other modules)
- **Dependencies**: 
  - `pdfkit` (currently installed; intended for future report generation)
  - Node.js built-ins only for core functionality

### Sample Data Structure
Each tweet object contains:
```javascript
{
  id: number,
  author: string,        // e.g., '@user1'
  text: string,          // Tweet content
  timestamp: string      // ISO date format '2026-03-31'
}
```

## Key Conventions & Patterns

### Sentiment Analysis Design
- **Keyword-based approach**: No external ML models; uses simple array matching with case-insensitive comparison
- **Negative precedence**: Always check negative keywords first to avoid false positives (e.g., "not good" should be negative, not positive)
- **Emoji support**: Keywords include emojis; ensure emoji strings are preserved when editing keyword arrays

### Output Format
- **Console Table**: Displays author, truncated tweet (50 chars), date, and sentiment
- **Summary Section**: Shows total positive count and full sentiment breakdown (positive/neutral/negative)
- **Full Tweets List**: Numbered list of complete tweet text for verification

### Modular Export Pattern
The script exports functions for reusability:
```javascript
module.exports = { getPositiveWindowsTweets, analyzeSentiment };
```
This allows consumption in other modules without duplicating logic.

### Windows-Specific Context
All filters and keyword analysis are hardcoded for "Windows" mentions. The `sampleTweets` array demonstrates the expected data structure. Any customization for different platforms requires keyword list modifications (no configuration file pattern used currently).

### Future Integration Points
- **Manager IQ Plugin** (referenced in README): Sentiment reports can be generated programmatically via the exported functions
- **Twitter API v2 Integration**: `fetchFromTwitterAPI` is a placeholder; real implementation should use `twitter-api-v2` package (already documented in README)
- **Report Generation**: `pdfkit` dependency exists for future PDF export functionality

## Testing Recommendations

**Manual verification approach** (no test suite currently):
1. Run with sample data: `npm run windows-reviews` and verify output matches expected sentiment breakdown
2. Test sentiment analysis function directly: `node -e "const {analyzeSentiment} = require('./get-windows-reviews.js'); console.log(analyzeSentiment('This is amazing!'))"`
3. Verify keyword lists: Check that emoji keywords render correctly and edge cases (e.g., "not good") return expected sentiment

## Configuration & Extensibility

### Add Custom Keywords
Edit the `POSITIVE_KEYWORDS` or `NEGATIVE_KEYWORDS` arrays in `get-windows-reviews.js`. Remember to test edge cases where multiple keyword types might match.

### Filter Results Programmatically
Use the exported `getPositiveWindowsTweets` function in your code:
```javascript
const { getPositiveWindowsTweets } = require('./get-windows-reviews.js');
const tweets = [...]; // your data
const positive = getPositiveWindowsTweets(tweets)
  .filter(t => t.timestamp >= '2026-03-30')
  .filter(t => !t.author.includes('bot'));
```

### Switch Data Sources
Modify the `fetchFromTwitterAPI` function or the `if (useAPI)` branch in `main()` to integrate different data sources (database, file system, etc.).

## Recommended MCP Servers

**Brave Search** - Useful for:
- Researching current sentiment analysis techniques and best practices
- Gathering Windows-related trends and feedback
- Finding relevant Twitter/X API updates or documentation
- Validating sentiment keywords against real-world usage patterns

Configure this in your Copilot settings to enhance research and validation workflows.

