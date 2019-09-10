module.exports = {
    projects: [
        {
            displayName: 'cli',
            moduleFileExtensions: [
                'js',
                'json'
            ],
            testEnvironment: 'node',
            testMatch: [
                '**/e2e/cli/**/?(*.)test.js'
            ]
        },
        {
            displayName: 'browser',
            preset: 'jest-puppeteer',
            moduleFileExtensions: [
                'js'
            ],
            testMatch: [
                '**/e2e/browser/**/?(*.)test.js'
            ]
        }
    ]
};
