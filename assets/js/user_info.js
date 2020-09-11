function render() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        success: function (res) {
            var layer = layui.layer
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            form.val('formUserInfo', res.data)
        }
    })
}
render()
var form = layui.form
form.verify({
    nickname: function (value) {
        if (value.length > 6) {
            return '昵称必须为1-6个字符';
        }
    }
});
$('.reset').click(function (e) {
    e.preventDefault()
    render()
})
$('.layui-form').submit(function (e) {
    e.preventDefault()
    var a = $(this).serialize()
    $.ajax({
        type: 'POST',
        url: '/my/userinfo',
        data: a,
        success: function (res) {
            var layer = layui.layer
            if (res.status !== 0) {
                return layer.msg('修改用户信息失败')
            }
            layer.msg('修改用户信息成功')
            window.parent.getUserInfo()
        }
    })
})