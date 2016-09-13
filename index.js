/* global hexo */
'use strict';

// https://hexo.io/zh-cn/api/filter.html#new-post-path

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

        itemArray[0] = tr.slugify(itemArray[0]);
        lastComponent = itemArray.join(".");

        componentArray[lastObjIndex] = lastComponent;

        return componentArray.join("/");
    }

    return data;
});
