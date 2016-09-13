/* global hexo */
'use strict';

// https://hexo.io/zh-cn/api/filter.html#new-post-path

var fs = require('hexo-fs');
var tr = require('transliteration');

hexo.extend.filter.register('new_post_path', function(data, replace){
    data = data || "";

    var componentArray = data.split("/");
    var lastObjIndex = componentArray.length-1;

    if (lastObjIndex > 0) {
        var lastComponent = componentArray[lastObjIndex];

        var itemArray = lastComponent.split(".");
        var pathExtension = "";
        if (itemArray.length > 1) {
            pathExtension = itemArray[itemArray.length-1];
        }

        // 把中文标题转换成拼音
        itemArray[0] = tr.slugify(itemArray[0]);
        lastComponent = itemArray.join(".");

        componentArray[lastObjIndex] = lastComponent;

        // 检查文章链接是否已存在
        return fs.ensurePath(componentArray.join("/"));
    }

    return data;
});
