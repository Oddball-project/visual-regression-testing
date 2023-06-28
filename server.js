const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { WebClient } = require('@slack/web-api');
// // Initialize a single instance for the whole app
const app = express();
//
// Read a token from the environment variables
const token = 'xoxb-5507137915921-5487870130582-pngv30mRLNmzPugyuozZHNCL';

// Initialize
const web = new WebClient(token);

const conversationId = 'C05E3UJQX2B';

app.use(bodyParser.urlencoded({ extended: true }));

// Serve the BackstopJS report directory
app.use('/backstop-data', express.static(path.join(__dirname, '/backstop_data')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/compare', (req, res) => {
    const { referenceUrl, url } = req.body;
    let { relativePaths } = req.body;
    let scenarios;
    if (relativePaths !== '') {
        relativePaths = '/,' + relativePaths;
        scenarios = relativePaths.split(',').map((relativePath) => ({
            label: relativePath === '/' ? 'Homepage' : relativePath.toUpperCase(),
            referenceUrl: relativePath === '/' ? referenceUrl : `${referenceUrl}/${relativePath}`,
            url: `${url}/${relativePath}`,
            hideSelectors: [],
            removeSelectors: [],
            selectors: ['document'],
            delay: 500,
            misMatchThreshold: 0.1,
        }));
    } else {
        scenarios = [
            {
                label: 'Homepage',
                referenceUrl,
                url,
                hideSelectors: [],
                removeSelectors: [],
                selectors: ['document'],
                delay: 500,
                misMatchThreshold: 0.1,
            },
        ]
    }

    const config = {
        id: 'backstop_default',
        viewports: [
            {
                label: 'desktop',
                width: 1920,
                height: 1080,
            },
        ],
        scenarios: scenarios,
        paths: {
            bitmaps_reference: 'backstop_data/bitmaps_reference',
            bitmaps_test: 'backstop_data/bitmaps_test',
            engine_scripts: 'backstop_data/engine_scripts',
            html_report: 'backstop_data/html_report',
            ci_report: 'backstop_data/ci_report',
        },
        report: ['browser'],
        engine: 'puppeteer',
        engineOptions: {
            args: ['--no-sandbox'],
        },
        asyncCaptureLimit: 5,
        asyncCompareLimit: 50,
        debug: false,
        debugWindow: false,
    };

    fs.writeFileSync(path.join(__dirname, 'backstop.json'), JSON.stringify(config, null, 2));

    exec(`backstop reference`, () => {
        exec(`backstop test`, () => {

            (async () => {

                // Post a message to the channel, and await the result.
                // Find more arguments and details of the response: https://api.slack.com/methods/chat.postMessage
                const result = await web.chat.postMessage({
                    text: 'https://vrt.kbsan.com/backstop-data/html_report/',
                    channel: conversationId,
                });

                // The result contains an identifier for the message, `ts`.
                console.log(`Successfully send message ${result.ts} in conversation ${conversationId}`);
            })();

            return res.redirect('/');
        });
    });
});

app.listen(5000, () => console.log('Server running on https://vrt.kbsan.com:5000'));
