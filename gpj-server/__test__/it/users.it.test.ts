import createApp from '../../src/create-app';
import requestHelper from '../helpers/requestHelper';

let get: any;
let app: any;

beforeAll(async () => {
  app = await createApp();
  const helper = await requestHelper(app);
  get = helper.get;
});

afterAll(async () => {
  await app.close();
});

describe('[IT][GET] users', () => {
  it('GET', async () => {
    await get({ path: '/v1/user' })
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
  });
});
