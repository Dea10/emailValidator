const { verifyEmail } = require('../../controllers/email.controller');
const mysql = require('mysql2');

jest.mock('mysql2', () => ({
    createPool: jest.fn(),
}));

jest.mock('../../models/db', () => {
    const mockDbConnection = {
        execute: jest.fn(),
    };

    return jest.fn().mockImplementation(() => ({
        setConnection: jest.fn().mockReturnValue(mockDbConnection),
    }));
});

test('verifyEmail updates email verification status', async () => {
    const req = { query: { email: 'test@example.com' } };
    const res = {
        json: jest.fn(),
    };

    await verifyEmail(req, res);

    expect(res.json).toHaveBeenCalledWith({
        msg: 'email verified',
        email: 'test@example.com',
    });
});
