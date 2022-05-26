async function sendData(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        if (response.status === 200) {
            return await response.json();
        } else {
            return {status: 'error', message: 'Something went wrong.'};
        }
    } catch(err) {
        console.error(err);
    }
}

export default sendData;