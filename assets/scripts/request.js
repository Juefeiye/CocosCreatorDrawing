function request(method) {
    // const app = JSON.parse(kf.getHeadParams())
    let app = null
    if (typeof kf === 'object') {
        app = JSON.parse(kf.getHeadParams())
    } else {
        app = {
            imei: ''
            // imei: 'b6cd800a-8c39-3547-a752-061e7b5ac784'
        }
    }
    return function(url, headers = {}, data) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.withCredentials = true
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status === 200) {
                        var response = xhr.responseText;
                        let res = JSON.parse(response)
                        if (res.resultCode === 0) {
                            resolve(res)
                        } else {
                            reject(res.resultMsg)
                        }
                    } else {
                        reject(xhr.responseText)
                    }
                }
            };
            xhr.open(method, url, true)
            xhr.setRequestHeader('imei', app.imei)
            let keys = Object.getOwnPropertyNames(headers)
            keys.forEach(key => {
                xhr.setRequestHeader(key, headers[key])
            })
            
            if (data) {
                xhr.send(JSON.stringify(data))
            } else {
                xhr.send();
            }
        })
    }
}

export default {
    get: request('GET'),
    post: request('POST')
}