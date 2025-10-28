import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:5000');

function App() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [typingUsers, setTypingUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Connection event
    socket.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
    });

    // Disconnection event
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });

    // Receive messages
    socket.on('receiveMessage', (data) => {
      setMessages(prev => [...prev, data]);
    });

    // User joined notification
    socket.on('userJoined', (data) => {
      setMessages(prev => [...prev, {
        ...data,
        type: 'system'
      }]);
    });

    // User left notification
    socket.on('userLeft', (data) => {
      setMessages(prev => [...prev, {
        ...data,
        type: 'system'
      }]);
    });

    // User count update
    socket.on('userCount', (count) => {
      setUserCount(count);
    });

    // Typing indicator
    socket.on('userTyping', (data) => {
      if (data.isTyping) {
        setTypingUsers(prev => {
          if (!prev.includes(data.username)) {
            return [...prev, data.username];
          }
          return prev;
        });
      } else {
        setTypingUsers(prev => prev.filter(user => user !== data.username));
      }
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('receiveMessage');
      socket.off('userJoined');
      socket.off('userLeft');
      socket.off('userCount');
      socket.off('userTyping');
    };
  }, []);

  const handleJoin = () => {
    if (username.trim()) {
      socket.emit('join', username.trim());
    }
  };

  const handleSendMessage = () => {
    if (message.trim() && username.trim()) {
      socket.emit('sendMessage', { message: message.trim() });
      setMessage('');
      setIsTyping(false);
      socket.emit('typing', { isTyping: false });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    
    if (!isTyping && e.target.value.trim()) {
      setIsTyping(true);
      socket.emit('typing', { isTyping: true });
    } else if (isTyping && !e.target.value.trim()) {
      setIsTyping(false);
      socket.emit('typing', { isTyping: false });
    }
  };

  return (
    <div className="App">
      <div className="chat-container">
        <h1>Real-Time Chat</h1>
        
        <div className="connection-status">
          <span className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
            {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
          </span>
          <span className="user-count">Users online: {userCount}</span>
        </div>

        {!username ? (
          <div className="join-section">
            <input
              type="text"
              placeholder="Enter your name..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleJoin()}
              className="username-input"
            />
            <button onClick={handleJoin} className="join-button">
              Join Chat
            </button>
          </div>
        ) : (
          <>
            <div className="username-display">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="username-input"
              />
            </div>

            <div className="messages-container">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.type === 'system' ? 'system-message' : 'user-message'}`}>
                  {msg.type === 'system' ? (
                    <span className="system-text">{msg.message}</span>
                  ) : (
                    <>
                      <strong>{msg.username}</strong> [{msg.timestamp}]: {msg.message}
                    </>
                  )}
                </div>
              ))}
              
              {typingUsers.length > 0 && (
                <div className="typing-indicator">
                  {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
                </div>
              )}
            </div>

            <div className="input-section">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={handleTyping}
                onKeyPress={handleKeyPress}
                className="message-input"
              />
              <button onClick={handleSendMessage} className="send-button">
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
