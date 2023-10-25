import { Button, useClipboard } from '@totejs/uikit';

interface CopyButtonProps {
  code: string;
}

export default function CopyButton({ code }: CopyButtonProps) {
  const { hasCopied, onCopy } = useClipboard(code);

  return (
    <Button size="sm" onClick={onCopy} position="absolute" top={10} right={10}>
      {hasCopied ? 'COPIED' : 'COPY'}
    </Button>
  );
}
