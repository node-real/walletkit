export function solanaCommonErrorHandler(props: { log: any; handler: any; error: any }) {
  const { log, handler, error } = props;

  if (error) {
    const description = error.message || error.name;

    log('[wallet error]', error);
    handler?.(error, description);
  }
}
