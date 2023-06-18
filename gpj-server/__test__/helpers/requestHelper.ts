import supertest from 'supertest';

const requestHelper = async (app: any) => {
  await app.listen({
    port: parseInt(process.env.PORT || '3000', 10),
    host: '0.0.0.0',
  });
  await app.ready();

  return {
    post: ({
      path = '/',
      params = {},
      headers = {},
      auth = '',
    }) => supertest(app.server)
      .post(path)
      .set(headers || {})
      .set('Authorization', auth || '')
      .send(params || {}),

    put: ({
      path = '/',
      params = {},
      auth = '',
      headers = {},
    }) => supertest(app.server)
      .put(path)
      .set(headers || {})
      .set('Authorization', auth || '')
      .send(params || {}),

    patch: ({
      path = '/',
      params = {},
      auth = '',
      headers = {},
    }) => supertest(app.server)
      .patch(path)
      .set(headers || {})
      .set('Authorization', auth || '')
      .send(params || {}),

    get: ({
      path = '/',
      auth = '',
      headers = {},
      query = {},
    }) => supertest(app.server)
      .get(path)
      .set(headers || {})
      .set('Authorization', auth || '')
      .query(query || ''),

    del: ({
      path = '/',
      auth = '',
      headers = {},
    }) => supertest(app.server)
      .delete(path)
      .set(headers || {})
      .set('Authorization', auth || ''),
  };
};

export default requestHelper;
