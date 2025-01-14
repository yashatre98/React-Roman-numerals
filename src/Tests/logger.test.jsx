
/*
    This test file is used to test the logger utility.
    The logger utility is used to log messages to the console.
    The logger utility should not log debug messages when the environment is not development.
*/


describe('Logger Utility', () => {
    let originalEnv;

    beforeAll(() => {
        originalEnv = { ...process.env }; 
    });

    afterAll(() => {
        process.env = originalEnv; 
    });

    beforeEach(() => {
        jest.resetModules(); 
    });

    // test that debug messages are logged when environment is development
    test('should not log debug messages when environment is not development', () => {
        process.env.NODE_ENV = 'production'; 

        const log = require('../../logger').default; 
        const mockConsoleDebug = jest.spyOn(console, 'debug').mockImplementation(() => {});

        log.debug('This debug message should not appear');

        expect(mockConsoleDebug).not.toHaveBeenCalled();

        mockConsoleDebug.mockRestore();
    });
});
