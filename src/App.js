function App() {
  return (
    <div className="app-container">
      <div className="chat-card">
        <div className="chat-header">
          <h2>React Chatbot</h2>
          <span className="status">Online</span>
        </div>

        <div className="chat-body">
          <div className="message bot">
            Hello! How can I help you today?
          </div>

          <div className="message user">
            I need help with my project.
          </div>
        </div>

        <div className="chat-footer">
          <input
            type="text"
            placeholder="Type your message..."
          />
          <button>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
