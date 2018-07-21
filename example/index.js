(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(this, (function () { 'use strict';

    /**
     * options = {
     *  width,
     *  height,
     *  this.RIBBON_WIDE
     *  alpha
     * }
     */
    const {random, cos, PI} = Math;
    const PI_2 = PI * 2;
    /**
     * Ribbon
     * 
     * @export
     * @class Ribbon
     */
    class Ribbon {
        /**
         * Creates an instance of Ribbon.
         * @param {String} id canvasId
         * @param {*} [options={}]
         * @memberof Ribbon
         */
        constructor(dom, options = {}) {
            if(typeof dom === 'string') {
                this.canvas = document.querySelector(dom);
            } else if(dom instanceof HTMLElement) {
                this.canvas = dom;
            } else {
                console.error('constructor need a querySelector or dom');
                return
            }
            // 上下文
            this.ctx = this.canvas.getContext('2d'),
            // 绘制路径
            this.path = [],
            // 自定义选项
            this.options = options;
            // 用来生成Math.cos(r), 决定丝带颜色的渐进程度
            this.r = 0,
            // 屏幕dpr
            this.dpr = window.devicePixelRatio || 1;
            this.init();
            this.initEvenListeners();
        }
        /**
         * canvas resize
         * @param {Object=} opt
         * @param {Number, String} opt.width 宽度
         * @param {Number, String} opt.height 高度
         * @param {Number} opt.ribbonWidth 丝带宽度
         * @param {Number} opt.alpha 丝带透明度
         * 
         * @returns this
         * @memberof Ribbon
         */
        resize(opt) {
            const { canvas, dpr, ctx, options } = this;
            Object.assign(options, opt);
            const {width = canvas.offsetWidth, height = canvas.offsetHeight, ribbonWidth = 90, alpha = 0.3, xChance = -0.25, yChance = -1.2} = options;
            this.width = width,
            this.height = height;
            // x坐标的偏移量
            this.xChance = xChance <= -1 ? xChance = -0.9 : xChance;
            this.yChance = yChance;
            // 根据给定的ribbonWidth, 或者根据实际canvas宽度设定丝带宽度
            // this.RIBBON_WIDE = ribbonWidth || width / 10.5 * 0.75,
            this.RIBBON_WIDE = ribbonWidth,
            canvas.width = width * dpr;     // 返回实际宽高
            canvas.height = height * dpr;
            ctx.globalAlpha = alpha;  // 图形透明度
            return this
        }
        render() {
            const { ctx, width, height, RIBBON_WIDE } = this;
            ctx.clearRect(0, 0, width, height);     // 擦除之前绘制内容
            // 先在屏幕最左侧, 高度的70%, RIBBON_WIDE为偏移量做起始点
            this.path = [{x: 0, y: height * 0.7 + RIBBON_WIDE}, {x: 0, y: height * 0.7 - RIBBON_WIDE}];
            const { path } = this;
            // 路径没有填满屏幕宽度时，绘制路径
            while(path[1].x < width + RIBBON_WIDE) {
                this.drawTriangle(path[0], path[1]);     // 调用绘制方法
            }
            return this
        }
        // 绘制彩带每一段路径
        /**
         * 绘制三角形
         *
         * @param {Path} start 坐标1
         * @param {Path} end 坐标2
         * @memberof Ribbon
         */
        drawTriangle(start, end) {
            const { ctx, path, RIBBON_WIDE, xChance } = this;
            ctx.beginPath();    // 创建一个新的路径
            ctx.moveTo(start.x, start.y);   // path[0]起点
            ctx.lineTo(end.x, end.y);   // path[1]终点
            // 获取下个点坐标
            var nextX = this.geneX(end.x),
                nextY = this.geneY(end.y);
            ctx.lineTo(nextX, nextY);
            ctx.closePath();
            this.r -= PI_2 / -50;
            const { r } = this;
            var color = '#' + (cos(r) * 127 + 128 << 16 | cos(r + PI_2 / 3) * 127 + 128 << 8 | cos(r + PI_2 / 3 * 2) * 127 + 128).toString(16);
            // 随机生成并设置canvas路径16进制颜色
            ctx.fillStyle = color;
            ctx.fill();     // 根据当前样式填充路径
            path[0] = path[1];    // 起点更新为当前终点
            path[1] = {x: nextX, y: nextY};     // 更新终点
        }
        /**
         * TODO: 研究xChance的范围
         * 获取下个坐标的x
         * 根据xChance的值
         * 如果xChance < 0, 会有一定概率会偏左
         * @param {Number} x 原坐标
         * @returns
         * @memberof Ribbon
         */
        geneX(x) {
            return x + (random() * 2 + this.xChance) * this.RIBBON_WIDE
        }
        /**
         * TODO: 研究yChance的范围
         * 随机生成y坐标
         * @param {Number} y 源来的y坐标
         * @returns
         * @memberof Ribbon
         */
        geneY(y) {
            const { height, yChance } = this;
            var temp = y + (random() * 2 + yChance) * this.RIBBON_WIDE;
            return (temp > height || temp < 0) ? this.geneY(y) : temp
        }
        init() {
            this.resize().render();
            return this
        }
        /**
         * TODO: 考虑需要绑定哪些事件
         * 绑定事件
         *
         * @memberof Ribbon
         */
        initEvenListeners() {
            document.addEventListener('click', (e) => {
                var target = e.target;
                if(target.tagName !== 'A') {
                    this.render();
                }
            })
            ;(function() {
                var timer = null;
                window.addEventListener('resize', () => {
                    if(timer) {
                        window.clearTimeout(timer);
                        timer = null;
                    }
                    timer = setTimeout(() => {
                        this.init();
                    }, 500);
                });
            })();
        }
    }

    new Ribbon('#canvas');

})));
