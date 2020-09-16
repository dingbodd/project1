var layer = layui.layer
var form = layui.form
var val = location.search//id=id值
var arr = val.split("=");//[id,id值]
var id = arr[1]
//将当前元素值按=切割，保存在arr中
var $image = null
var options = null
initCate()
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
            get()
        }
    })
}
function get() {
    $.ajax({
        type: 'get',
        url: '/my/article/' + id,
        success: function (res) {
            if (res.status != 0) {
                return layer.msg('获取文章失败！')
            }
            form.val('form-edit', res.data)
            $('#image').prop('src', 'http://ajax.frontend.itheima.net' + res.data.cover_img)
            // 初始化富文本编辑器
            initEditor()
            // 1. 初始化图片裁剪器
            $image = $('#image')
            // 2. 裁剪选项
            options = {
                aspectRatio: 400 / 280,
                preview: '.img-preview'
            }
            // 3. 初始化裁剪区域
            $image.cropper(options)

        }
    })
}
$('.layui-btn-danger').on('click', function () {
    $('#file').click()
})
$('#file').change(function (e) {
    var file = e.target.files[0]
    var newImgURL = URL.createObjectURL(file)
    $image
        .cropper('destroy')      // 销毁旧的裁剪区域
        .attr('src', newImgURL)  // 重新设置图片路径
        .cropper(options)        // 重新初始化裁剪区域
})
var state = '已发布'
$('.layui-btn-primary').on('click', function (e) {
    state = '草稿'
})
$('.layui-form').on('submit', function (e) {
    e.preventDefault()
    var fd = new FormData(this)
    fd.append('Id', id)
    var content = tinymce.activeEditor.getContent()
    fd.append('content', content)
    fd.append('state', state)
    $image.cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280
    }).toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        fd.append('cover_img', blob)
        publishArtixle(fd)
    });
})
function publishArtixle(f) {
    $.ajax({
        type: 'post',
        url: '/my/article/edit',
        contentType: false,
        processData: false,
        data: f,
        success: function (res) {
            console.log(res);

            if (res.status !== 0) {
                return layer.msg('修改数据失败！')
            }
            layer.msg('修改数据成功！')
            location.href = 'http://127.0.0.1:5500/article/art_list.html'
        }
    })
}
