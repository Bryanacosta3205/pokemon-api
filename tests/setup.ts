jest.setTimeout(10000);

process.env.NODE_ENV = 'test';
process.env.PORT = '3001';
process.env.CORS_ORIGIN = 'http://localhost:3000';

global.beforeAll(() => {
  console.log('Starting test suite...');
});

global.afterAll(() => {
  console.log('Test suite completed!');
});
