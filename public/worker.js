self.isActive = false;
self.interval = 500; // msec
self.queue = [];
self.intervalId = 0;
self.isSending = false;

onmessage = function(e){
    // console.debug('------- sent from parent ------ ');
    // console.debug(e);
    switch (e.data.type) {
        case 'start':
            start();
            break;

        case 'send':
            self.queue.unshift(e.data);
            break;

        case 'terminate':
            terminate();
            break;

        default:
            break;
    }
}

/**
 * 
 */
function start() {
    console.debug('initializing and start....');
    startRoutine();
}

function terminate() {
    clearInterval(self.intervalId);
}

/**
 * 
 */
function post() {

    if (self.queue.length <= 0) {
        return;
    }

    const postData = {data: encodeURI('a')};

    if (self.isSending) {
        return;
    }

    const val = self.queue.pop();

    self.isSending = true;
    fetch('http://10.11.24.146/be/index.php/keyboard/input', {
        method: 'post',
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        body: JSON.stringify(postData)
    })
        .then ((response) => {
            self.isSending = false;
            console.debug(response)
            postMessage(val.val);
        })
        .catch((error) => {
            self.isSending = false;
            console.debug(error);
        });
}

function startRoutine() {
    self.intervalId = setInterval(() => {
        post();
    }, self.interval);
}