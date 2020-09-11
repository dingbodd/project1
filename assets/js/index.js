$(function () {
    getUserInfo()
    $('#logOut').click(function () {
        var layer = layui.layer
        layer.confirm('确认退出？', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        });
    })
})
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            var layer = layui.layer
            if (res.status == 1) {
                return layer.msg(res.message)
            }
            renderTouxiang(res.data)
        }
    })
}
function renderTouxiang(data) {

    var name = data.nickname || data.username
    //替换欢迎用户名
    $('#welcomeFont').html('欢迎&nbsp&nbsp' + name)
    if (data.user_pic == null) {
        //显示文字
        $('.layui-nav-img').hide()
        $('.touxiang').show().html(name[0].toUpperCase())
    } else {
        $('.layui-nav-img').show().prop('src', data.user_pic)
        $('.touxiang').hide()
        //显示图片
    }
}
