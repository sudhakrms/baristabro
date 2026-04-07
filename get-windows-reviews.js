#!/usr/bin/env node

/**
 * Extract positive Twitter mentions about Windows
 * Filters tweets based on:
 * - Keyword: Windows
 * - Sentiment: Positive (positive keywords/emojis)
 * 
 * Usage: node get-windows-reviews.js [--api] [--sample]
 * --api: Use Twitter API (requires credentials)
 * --sample: Use sample data (default)
 */

const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'config.json');
let config = {
  keywords: {
    positive: [],
    negative: []
  },
  filter: {
    requireWindowsMention: true
  },
  twitterApi: {
    enabled: false,
    useEnvVars: true,
    apiKeyEnv: 'TWITTER_API_KEY',
    apiSecretEnv: 'TWITTER_API_SECRET'
  }
};

try {
  const loadedConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  config = {
    ...config,
    ...loadedConfig,
    keywords: {
      ...config.keywords,
      ...((loadedConfig && loadedConfig.keywords) || {})
    },
    filter: {
      ...config.filter,
      ...((loadedConfig && loadedConfig.filter) || {})
    },
    twitterApi: {
      ...config.twitterApi,
      ...((loadedConfig && loadedConfig.twitterApi) || {})
    }
  };
} catch (err) {
  console.warn('⚠️  Could not load config.json, using built-in defaults.', err.message);
}

const POSITIVE_KEYWORDS = config.keywords.positive.length ? config.keywords.positive : [
  'love', 'great', 'amazing', 'excellent', 'perfect', 'awesome', 'fantastic',
  'good', 'best', 'recommend', 'brilliant', 'outstanding', 'superb', 'wonderful',
  'impressive', 'kudos', '👍', '❤️', '🎉', '✨', '💯',
];

const NEGATIVE_KEYWORDS = config.keywords.negative.length ? config.keywords.negative : [
  'hate', 'terrible', 'worst', 'bad', 'awful', 'horrible', 'disappointing',
  'broken', 'crash', 'fail', '👎', '😡', '😞',
];

// Sample Twitter data about Windows
const sampleTweets = [
  { id: 1, author: '@user1', text: 'Windows 11 is absolutely amazing! Performance is incredible 💯', timestamp: '2026-03-31' },
  { id: 2, author: '@user2', text: 'Just switched to Windows, loving it so far! 👍', timestamp: '2026-03-31' },
  { id: 3, author: '@user3', text: 'Windows update broke everything again 😞', timestamp: '2026-03-31' },
  { id: 4, author: '@user4', text: 'Best decision ever - Windows is fantastic for development', timestamp: '2026-03-30' },
  { id: 5, author: '@user5', text: 'Windows is terrible, switching to Mac', timestamp: '2026-03-30' },
  { id: 6, author: '@user6', text: 'Windows 11 is outstanding! Highly recommend ❤️', timestamp: '2026-03-30' },
  { id: 7, author: '@user7', text: 'The Windows ecosystem is excellent for productivity', timestamp: '2026-03-29' },
  { id: 8, author: '@user8', text: 'Windows gets the job done well', timestamp: '2026-03-29' },
];

function analyzeSentiment(text) {
  const lowerText = text.toLowerCase();
  
  // Check for negative keywords first
  if (NEGATIVE_KEYWORDS.some(keyword => lowerText.includes(keyword))) {
    return 'negative';
  }
  
  // Check for positive keywords
  if (POSITIVE_KEYWORDS.some(keyword => lowerText.includes(keyword))) {
    return 'positive';
  }
  
  return 'neutral';
}

function getPositiveWindowsTweets(tweets) {
  return tweets
    .filter(tweet => {
      const sentiment = analyzeSentiment(tweet.text);
      if (sentiment !== 'positive') {
        return false;
      }

      if (config.filter.requireWindowsMention) {
        return tweet.text.toLowerCase().includes('windows');
      }

      return true;
    })
    .map(tweet => ({
      ...tweet,
      sentiment: analyzeSentiment(tweet.text),
    }));
}

async function fetchFromTwitterAPI() {
  const twitterKey = process.env.TWITTER_API_KEY;
  const twitterSecret = process.env.TWITTER_API_SECRET;
  
  if (!twitterKey || !twitterSecret) {
    console.warn('⚠️  Twitter API credentials not found. Using sample data instead.');
    console.warn('   Set TWITTER_API_KEY and TWITTER_API_SECRET environment variables to use the API.\n');
    return sampleTweets;
  }
  
  console.log('🔄 Fetching from Twitter API...');
  // TODO: Implement actual Twitter API integration using twitter-api-v2 or similar
  // For now, return sample data
  return sampleTweets;
}

async function main() {
  const useAPI = process.argv.includes('--api') || config.twitterApi.enabled;

  let tweets;
  if (useAPI) {
    tweets = await fetchFromTwitterAPI();
  } else {
    tweets = sampleTweets;
  }
  
  const positiveWindowsTweets = getPositiveWindowsTweets(tweets);
  
  console.log('✓ Positive Windows Tweets on Twitter:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.table(positiveWindowsTweets.map(t => ({
    Author: t.author,
    Tweet: t.text.substring(0, 50) + (t.text.length > 50 ? '...' : ''),
    Date: t.timestamp,
    Sentiment: t.sentiment,
  })));
  
  console.log('\n📊 Summary:');
  console.log(`✅ Total positive tweets: ${positiveWindowsTweets.length}`);
  console.log(`📈 Sentiment breakdown:`);
  console.log(`   - Positive: ${positiveWindowsTweets.length}`);
  console.log(`   - Neutral: ${tweets.filter(t => analyzeSentiment(t.text) === 'neutral').length}`);
  console.log(`   - Negative: ${tweets.filter(t => analyzeSentiment(t.text) === 'negative').length}`);
  
  console.log('\n🔗 Full positive tweets:');
  positiveWindowsTweets.forEach((tweet, idx) => {
    console.log(`\n${idx + 1}. ${tweet.author} (${tweet.timestamp})`);
    console.log(`   ${tweet.text}`);
  });
}

main().catch(console.error);

module.exports = { getPositiveWindowsTweets, analyzeSentiment };
