import { Button, Input } from 'antd';
import Pusher from 'pusher-js';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { useForm } from 'react-hook-form';

// 初始化 Pusher 客戶端，指向本地 WebSocket 服務器
const pusher = new Pusher('local', {
    wsHost: '127.0.0.1',  // WebSocket 服務器地址
    wsPort: 6001,         // WebSocket 端口
    forceTLS: false,      // 不使用 TLS
    disableStats: true,   // 禁用 Pusher 統計
    cluster: 'mt1',       // 集群
});

function Index() {
    const { handleSubmit } = useForm();
    const [Message, setMessage] = useState([]);

    // 當表單提交時，發送消息到後端
    function onSubmit() {
        let data = new FormData();
        data.append('message', document.getElementById('message').value);
        sendData(data);
    }

    // 發送消息到後端
    function sendData(file) {
        fetch('/api/message.create', { method: 'POST', body: file })
            .then(response => response.json())
            .then(res => {
                console.log(res.message);
            });
    }

    // 獲取歷史消息
    function getData() {
        fetch('/api/message.get', { method: 'GET' })
            .then(response => response.json())
            .then(res => {
                setMessage(res.message);
            });
    }

    useEffect(() => {
        // 第一次渲染時獲取歷史消息
        getData();

        // 訂閱 WebSocket 頻道並綁定事件
        const channel = pusher.subscribe('message');
        channel.bind('MessageSent', function(data) {
            console.log(data.message);
            setMessage(prevMessages => [...prevMessages, data.message]);
        });

        // 清除 WebSocket 連接
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, []);  // 空依賴數組，保證只在組件掛載時執行一次

    return (
        <div className="container p-3">
            <div>
                {Message.map((msg, index) => (
                    <div key={index} className='p-3 border rounded my-3 ms-3'>
                        <p className='my-1'>{msg.message_description}</p>
                        <small className='my-1 text-end text-muted'>{msg.created_at}</small>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input.TextArea id="message" name="message" placeholder="Message" rows={5} />
                <Button type="primary" htmlType="submit" className='mt-3'>Send</Button>
            </form>
        </div>
    );
}

export default Index;

if (document.getElementById('index')) {
    ReactDOM.createRoot(document.getElementById("index")).render(<Index />)
}
