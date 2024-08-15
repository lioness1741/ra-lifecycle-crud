import React from 'react';
import { Button, Input } from 'antd';

const { TextArea } = Input;

type FormProps = {
  inputValue: string;
  onSend(): void;
  onChange(value: string): void;
};
export const Form: React.FC<FormProps> = ({ inputValue, onChange, onSend }) => {
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSend();
  };
  const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };
  return (
    <form onSubmit={submitHandler}>
      <TextArea rows={4} placeholder='new Note' value={inputValue} onChange={changeHandler} />
      <Button type='primary' htmlType='submit'>
        Send
      </Button>
    </form>
  );
};