var T = {};
// 域名配置,接口公共域名  fh.22um.com测试服务器 fh.teauf.com正式运营服务器（慎用）
T.DOMAIN = {
  DOMAIN: 'http://fh.22um.com/index.php/',
  //DOMAIN:'https://fh.snco.cn/index.php/',
  IMG: 'https://bsoss.oss-cn-hangzhou.aliyuncs.com/',
  NAME: '福海U服'
};
// 通过ID、NAME、TAGNAME获取标签
T.$id = function (id) {
  return document.getElementById(id);
};
T.$name = function (name) {
  return document.getElementsByName(name);
};
T.$tagname = function (tagName) {
  return document.getElementsByTagName(tagName);
};
//删除左边的空格
T.ltrim = function (str) {
  return str.replace(/(^\s*)/g, '');
};
//删除右边的空格
T.rtrim = function (str) {
  return str.replace(/(\s*$)/g, '');
};
//删除左右两端的空格
T.trim = function (str) {
  return str.replace(/(^\s*)|(\s*$)/g, '');
};
/**
* 用途：正则，判断以下信息是否符合标准
* @example T.RE.mobile.test(data)
*/
T.RE = {
  number: /^\d+$/,
  mobile: /^1[3|4|5|6|7|8|9]\d{9}$/,//手机
  telephone: /^(\d3,4\d3,4|\d{3,4}-)?\d{7,8}$/,//座机
  email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  mobile_email: /^1[3|4|5|6|7|8|9]\d{9}$|^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  mobile_email_uname: /^1[3|4|5|6|7|8|9]\d{9}$|^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$|^[_a-zA-Z0-9\-]{4,16}$/,
  code: /^[0-9]{6}$/,
  qq: /^[0-9]{5,12}$/,
  pwd: /^[a-zA-Z\d_]{6,20}$/,
  url: /^[a-zA-z]+:\/\/[\w-]+\.[\w-]+\.[\w-]+\S*$/,
  date: /^((?!0000)[0-9]{4}-((0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])-(29|30)|(0[13578]|1[02])-31))|(([0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00)-02-29)$/,
  time: /sdf/,
  datetime: /asd/,
  uname: /^[a-zA-Z]\w{5,15}$/,
  name: /[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,
  nonempty: /\S/,
  size: /\d+[\d.]*[A-za-z]*\*+\d+[\d.]*[A-za-z]*|\d+[*×]\d+/i,
  emoji: /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g,
  id_card: /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/
};
/*
 * 用途：基于时间戳生成20位全局唯一标识（每一毫秒只对应一个唯一的标识，适用于生成DOM节点ID）
 */
T.UUID = function (len) {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};
/*
 * 用途：生成GUID的方法
 */
T.Guid = function () {
  var guid = "";
  for (var i = 1; i <= 32; i++) {
    var n = Math.floor(Math.random() * 16.0).toString(16);
    guid += n;
    if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) guid += "-";
  }
  return guid;
};
/*
 * 用途：解析参数
 */
T.Parse = {
  /**
  * 对目标字符串进行html编码
  * 编码字符有5个：&<>"'
  * @returns {string} html编码后的字符串
  */
  encodeHtml: function (a) {
    return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#039;").replace(/"/g, "&quot;")
  },
  /**
  * 对目标字符串进行html解码
  * @returns {string} html解码后的字符串
  */
  decodeHtml: function (a) {
    return a.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#0?39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&")
  },
  /**
 * 获取URL参数
 * @param {String} name,url 必选参数
 * Return 对应的参数值
 */
  getQueryString: function (name, url) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = url.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return '';
  },
  /**
  * 用途：时间戳转换成时间对象
  * @example T.Parse.getTimeInfo()
  */
  getTimeInfo: function () {
    var date = new Date();
    return {
      year: date.getFullYear(),
      month: (date.getMonth() >= 0 && date.getMonth() <= 9) ? "0" + (date.getMonth() + 1) : date.getMonth() + 1,
      date: date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
      hour: date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
      minute: date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
      sec: date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(),
      week: new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[date.getDay()]
    }
  },
  /**
  * 用途：时间戳转换成时间
  * @example T.Parse.changeLocalTime(1521630673)
  */
  changeLocalTime: function (time) {
    if (!time || time == '0') { return '' }
    var myDate = new Date(time * 1000);
    var y = myDate.getFullYear();
    var m = myDate.getMonth() + 1;
    var d = myDate.getDate();
    var h = myDate.getHours();
    var M = myDate.getMinutes();
    var s = myDate.getSeconds();

    d = d < 10 ? ('0' + d) : d;
    m = m < 10 ? ('0' + m) : m;
    h = h < 10 ? ('0' + h) : h;
    M = M < 10 ? ('0' + M) : M;
    s = s < 10 ? ('0' + s) : s;

    var date = y + '-' + m + '-' + d + ' ' + h + ':' + M + ':' + s;
    return date;
  },
  /**
   * 用途：短信验证码倒计时
   * @example setTimeout(T.Parse.getCountDown('box'),1000);
   */
  getCountDown: function (id) {
    //发送验证码
    var delayTime = 60;
    var ele = document.getElementById(id);
    //首先执行一遍
    countDown();
    function countDown() {
      delayTime--;
      if (delayTime < 10) {
        ele.innerHTML = '0' + delayTime + 's后获取';
      }
      else {
        ele.innerHTML = delayTime + 's后获取';
      }
      ele.classList.add("not-allowed");
      ele.disabled = true;
      if (delayTime == 0) {
        ele.classList.remove("not-allowed");
        ele.disabled = false;
        ele.innerHTML = '获取验证码';
      } else {
        setTimeout(countDown, 1000);
      }
    }
  },
  /**
  * 获取对象属性的值
  * 主要用于过滤三级联动中，可能出现的最低级的数据不存在的情况，实际开发中需要注意这一点；
  * @param {Object} obj 对象
  * @param {String} param 属性名
  */
  getParam: function (obj, param) {
    return obj[param] || '';
  },
  /**
   * 判断一个元素是否为数组
   * @example T.Parse.isArrayFn(['aaaa'])  true
   */
  isArrayFn: function (o) {
    if (typeof Array.isArray === "function") {
      return Array.isArray(o);
    } else {
      return Object.prototype.toString.call(o) === "[object Array]"
    }
  },
  /**
   * 数字用逗号隔开
   * @example T.Parse.cutNumber('25125632')  25,125,632   对25125632.12无效（有小数点无效）
   * @example 有小数点时用'25125632.12'.replace(/\B(?=(\d{3})+.\d{2,2}$)/g, ',')
   */
  cutNumber: function (n) {
    var b = parseInt(n).toString();
    var len = b.length;
    if (len <= 3) { return b; }
    var r = len % 3;
    return r > 0 ? b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : b.slice(r, len).match(/\d{3}/g).join(",");
  },
  /**
   * 数字后面加单位
   * @example T.Parse.unitNumber('4523666.236')  452.37万元
   */
  unitNumber: function (n) {
    var num = parseFloat(n);
    if (num > 99999999) {
      return Math.round((num / 100000000) * 100) / 100 + '亿元';
    }
    else if (num > 9999) {
      return Math.round((num / 10000) * 100) / 100 + '万元';
    }
    else {
      return num + '元';
    }
  }
},

module.exports = { T }
