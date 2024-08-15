import React from 'react';
import { Card, Button } from 'antd';

type NoteProps = {
  id: number;
  content: string;
  onDelete(id: number): void;
};

export const Note: React.FC<NoteProps> = ({ id, content, onDelete }) => {
  return (
    <Card extra={<Button onClick={() => onDelete(id)}>Delete</Button>}>
      <p>{content}</p>
    </Card>
  );
};