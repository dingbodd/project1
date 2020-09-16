$(function () {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage;
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    initTable()
    initCate()
    function initTable() {
        $.ajax({
            type: 'get',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                var str = template('tpl-table', res)
                $('tbody').html(str)
                renderPage(res.total)
            }
        })
    }
    function initCate() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类列表失败！')
                }
                var str = template('tpl-cate', res)
                $('#cate_id').html(str)
                form.render()
            }
        })
    }
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox' //注意，这里的 test1 是 ID，不用加 # 号
            , count: total,//数据总数，从服务端得到
            limit: q.pagesize,
            layout: ['prev', 'page', 'next', 'limit', 'skip'],
            limits: [2, 3, 5, 10],
            curr: q.pagenum,
            jump: function (obj, first) {
                q.pagesize = obj.limit
                q.pagenum = obj.curr
                if (!first) {
                    initTable()
                }
            }
        });
    }
    $('#form-cate').on('submit', function (e) {
        e.preventDefault()
        q.cate_id = $('#cate_id').val()
        q.state = $('#state').val()
        initTable()
    })
    $('body').on('click', '.layui-btn-danger', function () {
        var len = $('.layui-btn-danger').length
        var id = $(this).attr('data-id')
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类信息失败！')
                    }
                    layer.msg('删除分类信息成功！')
                    if (len === 1) {
                        q.pagenum > 1 ? q.pagenum = q.pagenum - 1 : q.pagenum = 1
                    }
                    initTable()
                }
            })
            layer.close(index);
        });
    })
    $('body').on('click', '#bj', function () {
        var id = $(this).attr('data-id');
        location.href = '/article/article_BJ.html?id=' + id
    })
})
template.defaults.imports.time = function (data) {
    var date = new Date(data)
    var y = date.getFullYear()        // 年
    var m = addzero(date.getMonth() + 1)    // 月
    var d = addzero(date.getDate())           // 日
    var H = addzero(date.getHours())          // 时
    var M = addzero(date.getMinutes())       // 分
    var S = addzero(date.getSeconds())
    return y + '-' + m + '-' + d + ' ' + H + ':' + M + ':' + S
}
function addzero(n) {
    if (n < 9) {
        return '0' + n
    }
    return n
}
