const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const fs = require('fs');
var fs_Extra = require('fs-extra');
const path = require('path');
const html_report_path = require('path');
const { WebClient } = require('@slack/web-api');
require('dotenv').config();
// // Initialize a single instance for the whole app
const app = express();
//
// Read a token from the environment variables
const token = process.env.TOKEN;

// Initialize
const web = new WebClient(token);

const path2='';

const conversationId = 'C05E3UJQX2B'; // Slack channel Id

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/test', (req, res) => {
    res.send("Just a test route");
});


app.post('/compare', (req, res) => {
    const { tempId,referenceUrl, url } = req.body;
    let { relativePaths } = req.body;
    let scenarios;

    if (!fs.existsSync(`${tempId}`)){
        fs.mkdirSync(`${tempId}`, { recursive: true });
    }
    if (!fs.existsSync(`${tempId}/bitmaps_reference`)){
        fs.mkdirSync(`${tempId}/bitmaps_reference`, { recursive: true });
    }
    if (!fs.existsSync(`${tempId}/bitmaps_test`)){
        fs.mkdirSync(`${tempId}/bitmaps_test`, { recursive: true });
    }
    if (!fs.existsSync(`${tempId}/html_report`)){
        fs.mkdirSync(`${tempId}/html_report`, { recursive: true });
    }


    var sourceDir = html_report_path.join(__dirname, "html_report");
    var destinationDir = html_report_path.join(__dirname, `${tempId}/html_report`);

    fs_Extra.copy(sourceDir, destinationDir, function(error) {
        if (error) {
            throw error;
        } else {
          console.log("success!");
        }
    });

    app.use(`/${tempId}`, express.static(path.join(__dirname, `/${tempId}`)));

    //app.use('/backstop-data', express.static(path.join(__dirname, '/backstop_data')));
  

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
        id: `${tempId}`,
        viewports: [
            {
                label: 'desktop',
                width: 1920,
                height: 1080,
            },
        ],
        scenarios: scenarios,
        paths: {
            bitmaps_reference: `${tempId}/bitmaps_reference`,
            bitmaps_test: `${tempId}/bitmaps_test`,
            engine_scripts: 'engine_scripts',
            html_report: `${tempId}/html_report`,
            ci_report: `${tempId}/ci_report`,
        },
        report: ['browser'],
        engine: 'playwright',
        engineOptions: {
            args: ['--no-sandbox'],
        },
        asyncCaptureLimit: 5,
        asyncCompareLimit: 50,
        debug: false,
        debugWindow: false,
    };

    fs.writeFileSync(path.join(__dirname, `${tempId}.json`), JSON.stringify(config, null, 2));

    exec(`backstop reference --configPath=${tempId}.json`, () => {
        exec(`backstop test --configPath=${tempId}.json`, () => {
            return res.redirect('/');
        });
    });

});

app.get('/', (req, res) => {
   // console.log(path);
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3006, () => console.log('Server running on http://test.kbsan.com:3000'));
