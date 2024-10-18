import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
    
});

useEffect(() => {
    if (auth_id && receiver_id) {
        window.Echo.private(`messanger.${auth_id}.${receiver_id}`)
            .listen('MessageSent', (event) => {
                console.log('New message received:', event.message);
                setMessages((prevMessages) => [...prevMessages, event.message]);
            });

        return () => {
            window.Echo.leaveChannel(`messanger.${auth_id}.${receiver_id}`);
        };
    }
}, [auth_id, receiver_id]);
