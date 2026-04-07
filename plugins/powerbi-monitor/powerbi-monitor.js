const cron = require('node-cron');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { ConfidentialClientApplication } = require('@azure/msal-node');
const moment = require('moment-timezone');

// Load configuration
let config;
try {
  const configPath = path.join(__dirname, 'config.json');
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (err) {
  console.error('Failed to load config:', err.message);
  process.exit(1);
}

// PowerBI API base URL
const POWERBI_BASE_URL = 'https://api.powerbi.com/v1.0/myorg';

// MSAL configuration
const msalConfig = {
  auth: {
    clientId: config.powerbi.clientId,
    authority: `https://login.microsoftonline.com/${config.powerbi.tenantId}`,
    clientSecret: process.env.POWERBI_CLIENT_SECRET,
  },
};

const pca = new ConfidentialClientApplication(msalConfig);

// Authenticate and get access token
async function getAccessToken() {
  try {
    const tokenRequest = {
      scopes: [config.powerbi.scope],
    };
    const response = await pca.acquireTokenByClientCredential(tokenRequest);
    return response.accessToken;
  } catch (error) {
    console.error('Authentication failed:', error.message);
    throw error;
  }
}

// Fetch PowerBI report data
async function fetchReportData(reportId, accessToken) {
  try {
    const url = `${POWERBI_BASE_URL}/reports/${reportId}/pages`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch report data:', error.message);
    throw error;
  }
}

// Analyze insights (placeholder)
function analyzeInsights(data) {
  // TODO: Implement actual analysis
  return {
    summary: 'Daily insights summary',
    metrics: [
      { name: 'Revenue', value: 10000, change: 5.2 },
      { name: 'Users', value: 1500, change: -2.1 },
    ],
    anomalies: [],
  };
}

// Send to Teams
async function sendToTeams(insights) {
  try {
    const message = {
      text: `**PowerBI Daily Insights**\n\n${insights.summary}\n\nMetrics:\n${insights.metrics.map(m => `- ${m.name}: ${m.value} (${m.change > 0 ? '+' : ''}${m.change}%)`).join('\n')}`,
    };
    await axios.post(config.teams.webhookUrl, message);
    console.log('Sent insights to Teams');
  } catch (error) {
    console.error('Failed to send to Teams:', error.message);
  }
}

// Main monitoring function
async function monitorDashboard() {
  try {
    console.log('Starting PowerBI monitoring...');
    const accessToken = await getAccessToken();
    const data = await fetchReportData(config.powerbi.reportId, accessToken);
    const insights = analyzeInsights(data);
    await sendToTeams(insights);
    console.log('Monitoring complete');
  } catch (error) {
    console.error('Monitoring failed:', error.message);
  }
}

// Schedule daily
if (config.schedule.cron) {
  cron.schedule(config.schedule.cron, () => {
    console.log('Running scheduled monitoring');
    monitorDashboard();
  }, {
    timezone: config.schedule.timezone,
  });
  console.log(`Scheduled daily monitoring at ${config.schedule.cron} in ${config.schedule.timezone}`);
}

// For manual run
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.includes('--test')) {
    console.log('Testing authentication...');
    getAccessToken().then(() => console.log('Auth successful')).catch(console.error);
  } else if (args.includes('--dry-run')) {
    console.log('Dry run...');
    monitorDashboard();
  } else {
    monitorDashboard();
  }
}

module.exports = { monitorDashboard, analyzeInsights };