export const EditorStyles = {
  position: 'relative' as any,
  marginTop: 12,
  marginBottom: 12,
  borderRadius: 8,
  padding: 10,
  background: '#011627',
  sx: {
    '> pre': {
      w: '100%',
      overflowX: 'auto',
      '.token-line:first-of-type:last-of-type': {
        lineHeight: '24px',
      },
    },
  },
};

export const PreviewStyles = {
  marginTop: 12,
  marginBottom: 12,
  borderRadius: 8,
  padding: 10,
  borderWidth: 1,
};
