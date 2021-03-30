Component({
  properties: {
    // success | yiqianshou | yidaohuo | yixiadan | saoyisao1 | saoyisao2 | tubiao- | guanbi1 | dianhua | dui | right | xiugai | gougou | remen | jiantou-2 | jiantou-1 | tishi | guanbi | weixin | gouwuche-jia | wode-tuijianyoujiang | kabao | touxiang-logo | jinbi-3 | jinbi-1 | jinbi-2 | gengduo | yijianfankui | wodedingdan | paixu1 | dizhi | peisong | paixu | tongzhi | gou | test1 | test2 | test4 | test3 | guanliyuan | book | growth | vip | service | explain
    name: {
      type: String,
    },
    // string | string[]
    color: {
      type: null,
      observer: function(color) {
        this.setData({
          colors: this.fixColor(),
          isStr: typeof color === 'string',
        });
      },
    },
    size: {
      type: Number,
      value: 18,
      observer: function(size) {
        this.setData({
          svgSize: (size / 750) * wx.getSystemInfoSync().windowWidth,
        });
      },
    },
  },
  data: {
    colors: '',
    svgSize: (18 / 750) * wx.getSystemInfoSync().windowWidth,
    quot: '"',
    isStr: true,
  },
  methods: {
    fixColor: function() {
      var color = this.data.color;
      var hex2rgb = this.hex2rgb;

      if (typeof color === 'string') {
        return color.indexOf('#') === 0 ? hex2rgb(color) : color;
      }

      return color.map(function(item) {
        return item.indexOf('#') === 0 ? hex2rgb(item) : item;
      });
    },
    hex2rgb: function(hex) {
      var rgb = [];

      hex = hex.substr(1);

      if (hex.length === 3) {
        hex = hex.replace(/(.)/g, '$1$1');
      }

      hex.replace(/../g, function(color) {
        rgb.push(parseInt(color, 0x10));
        return color;
      });

      return 'rgb(' + rgb.join(',') + ')';
    },
  },
});
