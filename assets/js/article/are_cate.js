initAreCate()
var form = layui.form
var indexAdd = null
$('#addCate').on('click', function () {
    var str = $('#add').html()
    indexAdd = layer.open({
        type: 1,
        title: '添加文章类别',
        content: str,
        area: ['500px', '300px']
    })
})
function initAreCate() {
    $.ajax({
        type: 'GET',
        url: '/my/article/cates',
        success: function (res) {
            var str = template('tpl-table', res)
            $('tbody').html(str)
        }
    })
}
$('body').on('submit', '#add-form', function (e) {
    e.preventDefault()
    $.ajax({
        type: 'post',
        url: '/my/article/addcates',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('添加分类失败')
            }
            initAreCate()
            layer.msg('添加分类成功')
        }
    })
    layer.close(indexAdd)
})
$('body').on('click', '.btn-edit', function () {
    var str = $('#edit').html()
    indexAdd = layer.open({
        type: 1,
        title: '修改文章分类',
        content: str,
        area: ['500px', '300px']
    })
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'get',
        url: '/my/article/cates/' + id,
        success: function (res) {
            console.log(res);
            form.val('edit-form', res.data)
        }
    })
})
$('body').on('submit', '#edit-form', function (e) {
    e.preventDefault()
    console.log($(this).serialize());

    $.ajax({
        type: 'post',
        url: '/my/article/updatecate',
        data: $(this).serialize(),
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {

                return layer.msg('更新分类信息失败！')
            }
            initAreCate()
            layer.close(indexAdd)
            layer.msg('更新分类信息成功！')
        }
    })
})
$('body').on('click', '.layui-btn-danger', function () {
    var id = $(this).attr('data-id')
    layer.confirm('确认删除？', { icon: 3, title: '提示' }, function (index) {
        $.ajax({
            type: 'GET',
            url: '/my/article/deletecate/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('删除分类信息失败！')
                }
                layer.msg('删除分类信息成功！')
                initAreCate()
            }
        })
        layer.close(index);
    });
})
