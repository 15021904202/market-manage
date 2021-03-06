/**
 * 工厂管理相关前端脚本
 * Created by CJ on 29/06/2017.
 */
$(function () {
    "use strict";

    var _body = $('body');

    var dataUrl = _body.attr('data-url');
    var table = $('#factoryTable').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": dataUrl,
            "data": function (d) {
                // return $.extend({}, d, extendData());
                return d;
            }
        },
        "ordering": true,
        "lengthChange": false,
        "searching": false,
        "colReorder": true,
        "columns": [
            {
                "title": "名称", "data": "name", "name": "name"
            },
            {
                "title": "负责人", "data": "chargePeopleName", "name": "chargePeopleName"
            },
            {
                "title": "电话", "data": "chargePeopleMobile", "name": "chargePeopleMobile"
            },
            {
                "title": "地址", "data": "address", "name": "address"
            },
            {
                "title": "创建时间", "data": "createTime", "name": "createTime"
            },
            {
                "title": "启用", "data": "enable", "name": "enable"
            },
            {
                title: "操作",
                className: 'table-action',
                data: function (item) {
                    if (item.enable)
                        return '<a href="javascript:;" class="js-disableFactory" data-id="' + item.id + '"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>&nbsp;禁用</a>';
                    return '<a href="javascript:;" class="js-enableFactory" data-id="' + item.id + '"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>&nbsp;启用</a>';
                }
            }
        ],
        "displayLength": 15,
        "drawCallback": function () {
            // clearSearchValue();
        },
        "dom": "<'row'<'col-sm-12'B>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-5'i><'col-sm-7'p>>",
        "buttons": [{
            "extend": "excel",
            "text": "导出 Excel",
            "className": "btn-xs",
            "exportOptions": {
                "columns": ":not(.table-action)"
            }
        }, {
            "extend": 'colvis',
            "text": "筛选列",
            "className": "btn-xs"
        }]
    });

    $(document).on('click', '.js-disableFactory', function () {
        $.ajax(dataUrl + '/' + $(this).attr('data-id') + "/disable", {
            method: 'put',
            success: function () {
                table.ajax.reload();
            }
        });
    }).on('click', '.js-enableFactory', function () {
        $.ajax(dataUrl + '/' + $(this).attr('data-id') + "/enable", {
            method: 'put',
            success: function () {
                table.ajax.reload();
            }
        });
    });
});