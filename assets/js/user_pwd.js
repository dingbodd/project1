
var form = layui.form
var pwd = null;
form.verify({
    password: function (value, item) {
        if (!/^[\S]{6,12}$/.test(value)) {
            return '密码必须6到12位，且不能出现空格';
        }
    },
    same: function (value) {
        if ($('#newpwd').val() == $('#oldpwd').val()) {
            return '新密码不能和旧密码相同'
        }
    },
    repassword: function (value) {
        var pwd = $('#newpwd').val()
        if (value != pwd) {
            return '两次密码输入不一致'
        }
    }
});
$('.layui-form').submit(function (e) {
    e.preventDefault()
    var a = $(this).serialize()
    $.ajax({
        type: 'POST',
        url: '/my/updatepwd',
        data: a,
        success: function (res) {
            var layer = layui.layer
            if (res.status !== 0) {
                $('.layui-form')[0].reset()
                return layer.msg(res.message)
            }
            layer.msg('修改密码成功')
            $('.layui-form')[0].reset()
        }
    })
})
