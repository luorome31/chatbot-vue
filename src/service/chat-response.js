const chatResponse = (messageContainer,question) => {
    messageContainer = "";
    const eventSource = new EventSource('http://127.0.0.1:5000/reader/answer?msg=' + question); // 建立与服务器的EventSource连接
    eventSource.onmessage = function (event) {
        const data = JSON.parse(event.data);
        console.log(data)
        const result = data.body.result.trim();
        messageContainer += result;
        if (data.body.is_end == true) {
            eventSource.close();
        }
        console.log(messageContainer)
    };
}

export {chatResponse}