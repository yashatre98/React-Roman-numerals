
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


    test('should not log debug messages when environment is not development', () => {
        process.env.NODE_ENV = 'production'; 

        const log = require('../../logger').default; 
        const mockConsoleDebug = jest.spyOn(console, 'debug').mockImplementation(() => {});

        log.debug('This debug message should not appear');

        expect(mockConsoleDebug).not.toHaveBeenCalled();

        mockConsoleDebug.mockRestore();
    });
});
