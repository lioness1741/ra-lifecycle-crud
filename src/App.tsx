import React, { useState, useEffect } from 'react';
import { Layout, Typography, Row, Col, Button, Space } from 'antd';
import { RedoOutlined } from '@ant-design/icons';

import { NoteList } from './components/NoteList';
import { Form } from './components/Form';

import { callToServ, NOTES_URL } from './api/callToServ';

import { TNote } from './types';
import { DATA } from './data';
import './app.scss';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

export const App: React.FC = () => {
  const [notes, setNotes] = useState<TNote[]>([]);
  const [formValue, setFormValue] = useState<string>('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const data = await callToServ<TNote[]>(NOTES_URL, 'GET');
      setNotes(data);
    } catch (e) {
      console.log(e);
    }
  };

  const sendData = async (text: string) => {
    try {
      await callToServ<TNote[]>(NOTES_URL, 'POST', { content: text });
    } catch (e) {
      console.log(e);
    }
  };

  const deleteData = async (id: number) => {
    try {
      await callToServ<TNote[]>(`${NOTES_URL}/${id}`, 'DELETE');
    } catch (e) {
      console.log(e);
    }
  };

  const refreshHandler = () => {
    getData();
  };

  const deleteHandler = async (id: number) => {
    await deleteData(id);
    await getData();
  };

  const sendHandler = async () => {
    await sendData(formValue);
    await getData();
    setFormValue('');
  };

  const changeHandler = (value: string) => {
    setFormValue(value);
  };

  return (
    <Layout>
      <Header className='app-header'>
        <Title level={4}>
          <Text type='secondary'>{DATA.task.title}</Text>
        </Title>
      </Header>
      <Content className='app-content'>
        <Row className='container mb-3'>
          <Col span={12} offset={6}>
            <Space size={12}>
              <Title level={4}>Notes</Title> <Button type='primary' shape='circle' icon={<RedoOutlined />} onClick={refreshHandler} />
            </Space>
          </Col>
        </Row>
        <Row className='container mb-3'>
          {notes.length > 0 ? (
            <NoteList notes={notes} deleteNote={deleteHandler} />
          ) : (
            <Col span={12} offset={6}>
              <Title level={4}>Not Notes</Title>
            </Col>
          )}
        </Row>
        <Row className='container'>
          <Col span={12}>
            <Title level={4}>New Note</Title>
            <Form inputValue={formValue} onSend={sendHandler} onChange={changeHandler} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};