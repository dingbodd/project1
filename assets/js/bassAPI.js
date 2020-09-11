$.ajaxPrefilter(function (option) {
    option.url = 'http://ajax.frontend.itheima.net' + option.url;
    if (option.url.indexOf(/my/) !== -1)
        option.headers = { Authorization: localStorage.getItem('token') };
    option.complete = function (res) {
        data = res.responseJSON
        if (data.status == 1 && data.message == '身份认证失败！') {
            localStorage.removeItem('token')
            return location.href = '/login.html'
        }
    }

})