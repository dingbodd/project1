$('#link_login').click(function() {
    $('.reg-box').hide()
    $('.login-box').show()
})
$('#link_reg').click(function() {
    $('.reg-box').show()
    $('.login-box').hide()
})
var form = layui.form;
form.verify({
    username: function(value, item) { //value：表单的值、item：表单的DOM对象
        if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
            return '用户名不能有特殊字符';
        }
        if (/(^\_)|(\__)|(\_+$)/.test(value)) {
            return '用户名首尾不能出现下划线\'_\'';
        }
        if (/^\d+\d+\d$/.test(value)) {
            return '用户名不能全为数字';
        }
    },
    password: function(value, item) {
        if (!/^[\S]{6,12}$/.test(value)) {
            return '密码必须6到12位，且不能出现空格';
        }
    },
    repassword: function(value) {
        var pwd = $('#iptpwd').val()
        if (value != pwd) {
            return '两次密码输入不一致'
        }
    }
});

$('.reg-box button').click(function(e) {
    e.preventDefault()
    $.post(
        '/api/reguser', {
            username: $('#iptname').val(),
            password: $('#iptpwd').val()
        },
        function(res) {
            var layer = layui.layer
            if (res.status != 0) {
                return layer.msg(res.message);
            }
            $('#username').val($('#iptname').val())
            $('#userpwd').val($('#iptpwd').val())
            $('.reg-box input').val('')
            console.log($('.reg-box input'));
            $('#link_login').click()
        })
})
$('.login-box button').click(function(e) {
    e.preventDefault()
    $.post(
        '/api/login', {
            username: $('#username').val(),
            password: $('#userpwd').val()
        },
        function(res) {
            var layer = layui.layer
            if (res.status != 0) {
                return layer.msg(res.message)
            }
            console.log(res);

            layer.msg('登录成功！')
            localStorage.setItem('token', res.token)
            location.href = '/index.html'
        }
    )
})