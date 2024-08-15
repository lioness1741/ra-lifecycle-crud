import React from 'react';
import { Col } from 'antd';

import { Note } from '../Note';

import { TNote } from '../../types';

type NoteListProps = {
  notes: TNote[];
  deleteNote(id: number): void;
};
export const NoteList: React.FC<NoteListProps> = ({ notes, deleteNote }) => {
  return (
    <>
      {notes.map((note) => (
        <Col key={note.id} span={6} className='mb-3'>
          <Note id={note.id} content={note.content} onDelete={deleteNote} />
        </Col>
      ))}
    </>
  );
};