export function commonErrorHandler(props: { log: any; handler: any; error: any }) {
  const { log, handler, error } = props;

  if (error) {
    const description = error.message || error.name;

    log('[wallet error]', error);
    handler?.(error, description);
  }
}

export async function sleep(duration = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, duration);
  });
}
