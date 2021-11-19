import React from 'react';

const MessageForMail = () => {
    return (
        <div style={{'backgroundColor': 'lime', 'padding': '15px'}}>
            password recovery link:
            <a href='https://neko-back.herokuapp.com/2.0/#/set-new-password/$token$'>link</a>
        </div>
    );
};

export default MessageForMail;