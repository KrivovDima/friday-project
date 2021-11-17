import React from 'react';

const MessageForMail = () => {
    return (
        <div style={{'backgroundColor': 'lime', 'padding': '15px'}}>
            password recovery link:
            <a href='http://localhost:3000/#/set-new-password/$token$'>link</a>
        </div>
    );
};

export default MessageForMail;