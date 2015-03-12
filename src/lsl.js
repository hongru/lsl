var chalk = require('chalk');
var fs = require('fs');
var path = require('path');

/*
<repo>
    ├── <build> : 打包之后的待发布文件
    ├── <demo> : 视觉还原页、代码示例、用法展示等。合并类似用法: <samples>
    ├─┬ <src> : 项目产生的文件。合并类似用法：assets
    │ ├─┬ <css> : CSS文件，包括Less/Sass也可以放在这里，并结合.gitignore和Grunt watch/Gulp watch使用
    | | └── *.css
    │ ├─┬ <js> : CSS文件，包括Coffee也可以放在这里，并结合.gitignore和Grunt watch/Gulp watch使用
    | | └── *.js
    │ ├─┬ <images> : 图片文件
    | | └── *.jpg, *.png, ...
    │ └── *.html : HTML 文件
    ├── <test> : 测试用例，lib库推荐使用
    ├──!<tmp> : 存放各种没有合适存放位置的临时文件。合并类似用法: <dist>
    ├──!<node_modules> : npm包，不随git提交
    ├──!<bower_components> : bower包，不随git提交
    ├── .gitignore : 待确定一个规范化的范围
    ├── bower.json : 前端静态资源包依赖
    ├── Gruntfile.js/Gulpfile.js : 自动化打包/编译/监视工具
    ├── package.json : node包依赖
    └── README.md : 项目信息简介，格式待敲定


├ ─ ─   ├── 

┬       ├─┬


└ ─ ─   └──

repo
  ├── build
  ├── dem
  ├─┬ src
  | ├─┬ css
  | | └── main.css
  | ├─┬ js
  | | └── main.js
  | | 


*/

var COLLAPSE_DIR = [];
var noChalk = false;

var lsl = function (root, config) {
    if (config && config.collapseDirs) COLLAPSE_DIR = COLLAPSE_DIR.concat(config.collapseDirs);
    if (config && config.noChalk) noChalk = config.noChalk;
    var arr = _do(root);
    var str = _pin(arr);
    // console.log(str);
    return str;
}

function _do (root) {
    var ret = [];

    function _r (dir, _i, parent) {
        var stat = fs.statSync(dir);
        var o = {};
        ret.push(o);

        if (_i == undefined) _i = 0;
        o._i = _i;
        o.parent = parent;
        o.name = path.basename(dir);
        o.ind = parent ? parent.ind + 1 : 0;
        if (stat.isDirectory()) {
            o.isdir = true;
            o.name += '/';
            o.children = [];
            if (!_isInCollapse(o.name)) {
                o.children = fs.readdirSync(dir);
                o.children.forEach(function (sd, i) {
                    _r(path.join(dir, sd), i, o);
                });    
            }
            
        } else {
            o.children = [];
        }
        o.hasNextBrother = (o.parent && o.parent.children.length > 1 && o._i < o.parent.children.length-1);
        
    }

    _r(root, 0, null);
    return ret;
}

function _pin (arr) {
    var ret = [];
    var c = ['  ', '| ', '├── ', '├─┬ ', '└── '];
    arr.forEach(function (o) {
        var pf = '';
        var name = (o.isdir && !noChalk) ? chalk.bold.cyan(o.name) : o.name;

        if (o.ind >= 1) {
            pf += c[0];
            for (var i = 0; i < o.ind - 1; i ++) {
                pf += c[1];
            }
            if (o.hasNextBrother) {
                pf += !!o.children.length ? c[3] : c[2];
            } else {
                pf += c[4];
            }
            pf += name;
        } else {
            pf += name;
        }
        ret.push(pf);
    });

    return ret.join('\n');
}

function _isInCollapse (s) {
    for (var i = 0; i < COLLAPSE_DIR.length; i ++) {
        if (s === COLLAPSE_DIR[i]) {
            return true;
        }
    }
    return false;
}

module.exports = lsl;

