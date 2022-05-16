import { Dialog, Title, Text } from '@mantine/core';
import { useState, useEffect } from 'react';

export default function ErrorDialog({ error }) {
  const [open, setOpen] = useState(error !== null);

  useEffect(() => {
    if (error !== null) {
      setOpen(true);
    }
  }, [error]);

  return (
    <Dialog
      opened={open}
      withCloseButton
      onClose={() => setOpen(null)}
      size="lg"
      color="red"
    >
      <Title order={3}>Error</Title>
      <Text>{error}</Text>
    </Dialog>
  );
}
