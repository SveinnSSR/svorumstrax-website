import React from 'react';
import { createRoot } from 'react-dom/client';
import ChatWidget from './ChatWidget.jsx';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Create container for the widget
    const widgetContainer = document.createElement('div');
    widgetContainer.id = 'svorum-chat-widget-root';
    document.body.appendChild(widgetContainer);

    // Mount React component
    const root = createRoot(widgetContainer);
    root.render(React.createElement(ChatWidget));
});
