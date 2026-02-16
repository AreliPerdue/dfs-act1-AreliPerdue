export default {
    testEnvironment: 'node',
    transform: {}
};
Files: ['dotenv/config']

module.exports = {
projects: [
    {
        displayName: 'backend',
        testMatch: ['<rootDir>/backend/tests/**/*.test.js'],
        testEnvironment: 'node',
        transform: {}
    },
    {
        displayName: 'frontend',
        testMatch: ['<rootDir>/tests/**/*.test.js'],
        testEnvironment: 'jsdom',
        transform: {}
    }
    ]
};