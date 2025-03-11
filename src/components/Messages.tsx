import React, { useState } from 'react';

interface Message {
  id: number;
  text: string;
  sent: boolean;
  timestamp: string;
}

interface Chat {
  id: number;
  person: {
    name: string;
    avatar: string;
    title: string;
  };
  messages: Message[];
  lastActive: string;
}

interface MessagesProps {
  onClose: () => void;
}

const initialChats: Chat[] = [
  {
    id: 1,
    person: {
      name: "Sarah Chen",
      avatar: "https://i.pravatar.cc/150?img=1",
      title: "Tech Lead at TechCorp"
    },
    messages: [
      { id: 1, text: "Hi! I saw your profile and I think you'd be a great fit for our team.", sent: false, timestamp: "2:30 PM" },
      { id: 2, text: "Would love to discuss the opportunity with you.", sent: false, timestamp: "2:31 PM" }
    ],
    lastActive: "2:31 PM"
  },
  {
    id: 2,
    person: {
      name: "Mike Johnson",
      avatar: "https://i.pravatar.cc/150?img=2",
      title: "Design Director at DesignHub"
    },
    messages: [
      { id: 1, text: "Thanks for connecting! I'd love to learn more about your experience.", sent: false, timestamp: "Yesterday" }
    ],
    lastActive: "Yesterday"
  }
];

const Messages: React.FC<MessagesProps> = ({ onClose }) => {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const newMsg: Message = {
      id: selectedChat.messages.length + 1,
      text: newMessage,
      sent: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChats(chats.map(chat => 
      chat.id === selectedChat.id 
        ? { ...chat, messages: [...chat.messages, newMsg] }
        : chat
    ));

    setNewMessage("");
  };

  return (
    <div className="messages-overlay">
      <div className="messages-container">
        <div className="messages-header">
          <h2>Messages</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="messages-content">
          <div className="chats-list">
            {chats.map(chat => (
              <div 
                key={chat.id}
                className={`chat-item ${selectedChat?.id === chat.id ? 'selected' : ''}`}
                onClick={() => setSelectedChat(chat)}
              >
                <img src={chat.person.avatar} alt={chat.person.name} className="chat-avatar" />
                <div className="chat-info">
                  <div className="chat-header">
                    <h3>{chat.person.name}</h3>
                    <span className="timestamp">{chat.lastActive}</span>
                  </div>
                  <p className="chat-title">{chat.person.title}</p>
                  <p className="last-message">
                    {chat.messages[chat.messages.length - 1]?.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {selectedChat ? (
            <div className="chat-window">
              <div className="chat-header">
                <img src={selectedChat.person.avatar} alt={selectedChat.person.name} className="chat-avatar" />
                <div>
                  <h3>{selectedChat.person.name}</h3>
                  <p className="chat-title">{selectedChat.person.title}</p>
                </div>
              </div>
              <div className="messages-list">
                {selectedChat.messages.map(message => (
                  <div key={message.id} className={`message ${message.sent ? 'sent' : 'received'}`}>
                    <div className="message-content">
                      {message.text}
                      <span className="message-time">{message.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="message-input">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button 
                  className="send-button"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  Send
                </button>
              </div>
            </div>
          ) : (
            <div className="no-chat-selected">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages; 