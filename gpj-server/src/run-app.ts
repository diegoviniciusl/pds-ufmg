import createApp from './create-app';

async function main() {
  const app = await createApp();

  const address = await app.listen({
    port: parseInt(process.env.PORT || '3000', 10),
    host: '0.0.0.0',
  });
  await app.ready();

  // eslint-disable-next-line no-console
  console.log(address);
}

main().catch(async (err) => {
  try {
    // eslint-disable-next-line no-console
    console.error(`Webserver crashed: ${err.stack || err.toString()}`);
  } finally {
    process.exit(1);
  }
});
