/* eslint-disable import/no-extraneous-dependencies */
import { launch } from 'puppeteer';
import LocalWebServer from 'local-web-server';

let localWebServer;
let browser;

async function expectConsoleMessages(messages, aPluginCount, bPluginCount, aExtensionCount, bExtensionCount) {

    await new Promise((resolve) => {

        const checkMessages = () => {
            setTimeout(() => {
                if (messages.length >= 4) {
                    resolve();

                    return;
                }
                checkMessages();
            }, 500);
        };

        checkMessages();
    });

    expect(messages[0].includes(`${aPluginCount} new plugins providing extensions for Extension Point A`)).toBeTruthy();
    expect(messages[1].includes(`${bPluginCount} new plugins providing extensions for Extension Point B`)).toBeTruthy();
    expect(messages[2].includes(`${aExtensionCount} extensions for Extension Point A`)).toBeTruthy();
    expect(messages[3].includes(`${bExtensionCount} extensions for Extension Point B`)).toBeTruthy();
}

describe('Browser test', () => {

    beforeAll(async () => {

        localWebServer = LocalWebServer.create({
            https: false,
            directory: 'dist',
            modulePrefix: ''
        });

        browser = await launch();

        const page = await browser.newPage();

        await page.goto('http://127.0.0.1:8000/index.html');
        await page.evaluate(() => localStorage.setItem('debug', '*,-NodeModulesPluginRepository'));
    });

    afterAll(() => {
        localWebServer.server.close();
        browser.close();
    });

    test('no plugins selected', async () => {
        const page = await browser.newPage();

        const messages = [];
        page.on('console', (msg) => {
            messages.push(msg.text());
        });

        await page.goto('http://127.0.0.1:8000/index.html');

        await expect(page).toMatch('ts-example-host-app');
        await expect(page).toClick('#loadButton');
        await expectConsoleMessages(messages, 0, 0, 0, 0);
    });

    test('one plugin selected with one extension point', async () => {
        const page = await browser.newPage();

        const messages = [];
        page.on('console', (msg) => {
            messages.push(msg.text());
        });

        await page.goto('http://127.0.0.1:8000/index.html');

        await expect(page).toMatch('ts-example-host-app');
        await expect(page).toClick('#pluginACheckbox');
        await expect(page).toClick('#loadButton');
        await expectConsoleMessages(messages, 1, 0, 1, 0);
    }, 30000);

    test('one plugin selected with two extension points', async () => {
        const page = await browser.newPage();

        const messages = [];
        page.on('console', (msg) => {
            messages.push(msg.text());
        });

        await page.goto('http://127.0.0.1:8000/index.html');

        await expect(page).toMatch('ts-example-host-app');
        await expect(page).toClick('#pluginBCheckbox');
        await expect(page).toClick('#loadButton');

        await expectConsoleMessages(messages, 1, 0, 1, 1);
    }, 30000);

    test('two plugins selected', async () => {
        const page = await browser.newPage();

        const messages = [];
        page.on('console', (msg) => {
            messages.push(msg.text());
        });

        await page.goto('http://127.0.0.1:8000/index.html');

        await expect(page).toMatch('ts-example-host-app');
        await expect(page).toClick('#pluginACheckbox');
        await expect(page).toClick('#pluginBCheckbox');
        await expect(page).toClick('#loadButton');

        await expectConsoleMessages(messages, 2, 0, 2, 1);
    }, 30000);
});
