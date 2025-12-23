import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI assistant. How can I help you today?", isUser: false }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatHistory, setChatHistory] = useState([
    { id: 1, title: "Current Chat", date: "Today", active: true },
    { id: 2, title: "React Components Guide", date: "Yesterday", active: false },
    { id: 3, title: "CSS Styling Tips", date: "2 days ago", active: false },
    { id: 4, title: "JavaScript Arrays", date: "Dec 20", active: false },
    { id: 5, title: "API Integration Help", date: "Dec 19", active: false }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    setTimeout(() => {
      const responses = [
        "That's a great question! I'm here to help you with that.",
        "I understand what you're asking. Let me provide you with some insights.",
        "Interesting point! Here's what I think about that...",
        "I'd be happy to help you with that. Let me explain...",
        "That's exactly the kind of question I love to answer!"
      ];
      
      const aiMessage = {
        id: Date.now() + 1,
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewChat = () => {
    setMessages([
      { id: Date.now(), text: "Hello! I'm your AI assistant. How can I help you today?", isUser: false }
    ]);
    const newChat = {
      id: Date.now(),
      title: "New Chat",
      date: "Today",
      active: true
    };
    setChatHistory(prev => [
      newChat,
      ...prev.map(chat => ({ ...chat, active: false }))
    ]);
  };

  const selectChat = (chatId) => {
    setChatHistory(prev =>
      prev.map(chat => ({ ...chat, active: chat.id === chatId }))
    );
  };

  const deleteChat = (chatId, e) => {
    e.stopPropagation();
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
  };

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        {sidebarOpen && (
          <>
            {/* Sidebar Header */}
            <div className="sidebar-header">
              <button onClick={handleNewChat} className="new-chat-button">
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Chat
              </button>
            </div>

            {/* Chat History */}
            <div className="chat-history">
              <div className="history-label">Recent Chats</div>
              {chatHistory.map(chat => (
                <div
                  key={chat.id}
                  onClick={() => selectChat(chat.id)}
                  className={`chat-item ${chat.active ? 'active' : ''}`}
                >
                  <svg className="chat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <div className="chat-info">
                    <div className="chat-title">{chat.title}</div>
                    <div className="chat-date">{chat.date}</div>
                  </div>
                  <button
                    onClick={(e) => deleteChat(chat.id, e)}
                    className="delete-button"
                  >
                    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Sidebar Footer */}
            <div className="sidebar-footer">
              <div className="user-info">
                <div className="user-avatar">U</div>
                <span>User Account</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="menu-button"
            >
              <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="logo-container">
              <div className="logo-icon">⚡</div>
              <h1>AI Assistant</h1>
            </div>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="theme-toggle"
          >
            {darkMode ? (
              <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
              </svg>
            ) : (
              <svg className="icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </header>

        {/* Chat Messages */}
        <div className="chat-container">
          <div className="messages-wrapper">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message-row ${message.isUser ? 'user-row' : 'ai-row'}`}
              >
                <div className={`avatar ${message.isUser ? 'user-avatar' : 'ai-avatar'}`}>
                  {message.isUser ? 'U' : 'AI'}
                </div>
                <div className="message-content-wrapper">
                  <div className={`message-bubble ${message.isUser ? 'user-bubble' : 'ai-bubble'}`}>
                    {message.text}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="message-row ai-row">
                <div className="avatar ai-avatar">AI</div>
                <div className="message-content-wrapper">
                  <div className="message-bubble ai-bubble">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="input-area">
          <div className="input-container">
            <div className="input-wrapper">
              <textarea
                className="chat-input"
                placeholder="Message AI Assistant..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                rows={1}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isLoading}
                className={`send-btn ${inputText.trim() && !isLoading ? 'active' : ''}`}
              >
                <svg className="send-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="input-hint">Press Enter to send, Shift+Enter for new line</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;