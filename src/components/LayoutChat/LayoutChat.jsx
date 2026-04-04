import { useState, useRef } from 'react';
import './LayoutChat.css';

function LayoutChat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatWindowRef = useRef(null);

  // Автоматическая прокрутка вниз при новых сообщениях
  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  };

  const sendMessage = async () => {
    const userMessage = inputValue.trim();
    if (!userMessage || isLoading) return;

    // Добавляем сообщение пользователя
    const userMsgObj = { role: 'user', content: userMessage };
    setMessages(prev => [...prev, userMsgObj]);
    setInputValue('');
    setIsLoading(true);

    // Временно добавляем пустое сообщение ассистента, которое будем заполнять чанками
    const assistantMsgObj = { role: 'assistant', content: '' };
    setMessages(prev => [...prev, assistantMsgObj]);
    scrollToBottom();

    try {
      const encodedMessage = encodeURIComponent(userMessage);
      const url = `https://api.kapiteam.ru/api/v1/career/chatWithAI/?message=${encodedMessage}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      if (!response.body) throw new Error('ReadableStream not supported');

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let accumulatedContent = '';
      let buffer = ''; // для неполных чанков

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop(); // последний фрагмент может быть неполным

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const jsonString = line.slice(6); // убираем "data: "
            try {
              const parsed = JSON.parse(jsonString);
              const chunkText = parsed.data;
              if (chunkText) {
                accumulatedContent += chunkText;
                // Обновляем последнее сообщение (ассистента)
                setMessages(prev => {
                  const newMessages = [...prev];
                  const lastIndex = newMessages.length - 1;
                  if (newMessages[lastIndex]?.role === 'assistant') {
                    newMessages[lastIndex] = { ...newMessages[lastIndex], content: accumulatedContent };
                  }
                  return newMessages;
                });
                scrollToBottom();
              }
            } catch (e) {
              console.warn('Ошибка парсинга JSON чанка:', e, line);
            }
          }
        }
      }
    } catch (error) {
      console.error('Ошибка при запросе:', error);
      // Заменяем последнее сообщение ассистента на сообщение об ошибке
      setMessages(prev => {
        const newMessages = [...prev];
        const lastIndex = newMessages.length - 1;
        if (newMessages[lastIndex]?.role === 'assistant') {
          newMessages[lastIndex] = { role: 'assistant', content: '❌ Ошибка получения ответа. Попробуйте позже.' };
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="layout-chat layout-any">
      <h1>AI Ассистент</h1>
      <div className="chat-window" ref={chatWindowRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role === 'user' ? 'user-message' : 'assistant-message'}`}>
            <div className="message-bubble">
              {msg.content || (msg.role === 'assistant' && isLoading && idx === messages.length-1 ? '...' : '')}
            </div>
          </div>
        ))}
      </div>
      <div className="send-message-row">
        <textarea
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Напишите сообщение..."
          disabled={isLoading}
        />
        <button onClick={sendMessage} disabled={isLoading}>
          {isLoading ? 'Отправка...' : 'Отправить'}
        </button>
      </div>
    </div>
  );
}

export default LayoutChat;