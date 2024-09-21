// src/components/DataDisplay.tsx

import React from 'react';
import { useFetch } from '../hooks/useFetch';

const GET_MESSAGE_ENDPOINT =
  'https://us-central1-randaway-web-97767.cloudfunctions.net/api/hello';

interface Message {
  message: string;
}

const MessageComponent: React.FC = () => {
  const { data, loading, error } = useFetch<Message>(GET_MESSAGE_ENDPOINT); // Replace with your API URL

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Data</h1>
      {data && <ul>{data.message}</ul>}
    </div>
  );
};

export default MessageComponent;
