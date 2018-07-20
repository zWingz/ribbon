/**
 * options = {
 *  width,
 *  height,
 *  RIBBON_WIDE
 *  alpha
 * }
 */
class Ribbon {
    constructor(id, options) {
        this.canvasRibbon = document.getElementById(id),
        this.ctx = canvasRibbon.getContext('2d'),    // 获取canvas 2d上下文
        this.path = [],
        this.math = Math,
        this.r = 0,
        this.PI_2 = Math.PI * 2,    // 圆周率*2
        this.cos = Math.cos,   // cos函数返回一个数值的余弦值（-1~1）
        this.random = Math.random   // 返回0-1随机数
        this.dpr = window.devicePixelRatio || 1 // the size of one CSS pixel to the size of one physical pixel.
    }
    resize(options = {}) {
        const {width, height, ribbonWidth, alpha} = options
        this.width = width,     // 返回窗口的文档显示区的宽高
        this.height = height
        // RIBBON_WIDE = 90,
        RIBBON_WIDE = ribbonWidth || width / 10.5 * 0.75,
        this.canvasRibbon.width = width * this.dpr     // 返回实际宽高
        this.canvasRibbon.height = height * this.dpr
        ctx.globalAlpha = alpha  // 图形透明度
    }
    render() {
        ctx.clearRect(0, 0, width, height)     // 擦除之前绘制内容
        path = [{x: 0, y: height * 0.7 + RIBBON_WIDE}, {x: 0, y: height * 0.7 - RIBBON_WIDE}]
        // 路径没有填满屏幕宽度时，绘制路径
        while(path[1].x < width + RIBBON_WIDE) {
            drawTriangle(path[0], path[1])     // 调用绘制方法
        }
    }
    // 绘制彩带每一段路径
    drawTriangle(start, end) {
        ctx.beginPath()    // 创建一个新的路径
        ctx.moveTo(start.x, start.y)   // path起点
        ctx.lineTo(end.x, end.y)   // path终点
        var nextX = end.x + (random() * 2 - 0.25) * RIBBON_WIDE,
            nextY = geneY(end.y)
        ctx.lineTo(nextX, nextY)
        ctx.closePath()
        r -= PI_2 / -50
        var color = '#' + (cos(r) * 127 + 128 << 16 | cos(r + PI_2 / 3) * 127 + 128 << 8 | cos(r + PI_2 / 3 * 2) * 127 + 128).toString(16)
        // 随机生成并设置canvas路径16进制颜色
        ctx.fillStyle = color
        ctx.fill()     // 根据当前样式填充路径
        path[0] = path[1]    // 起点更新为当前终点
        path[1] = {x: nextX, y: nextY}     // 更新终点
    }
    // 获取下一路径终点的y坐标值
    geneY(y) {
        var temp = y + (random() * 2 - 1.2) * 90
        return (temp > height || temp < 0) ? geneY(y) : temp
    }
    init() {
        resize()
        render()
    }
    initEvenListeners() {
        document.addEventListener('click', function(e) {
            var target = e.target
            if(target.tagName !== 'A') {
                run()
            }
        })
        ;(function() {
            var timer = null
            window.addEventListener('resize', function() {
                if(timer) {
                    window.clearTimeout(timer)
                    timer = null
                }
                timer = setTimeout(init, 500)
            })
        })()
    }
}


function ribbon(id, options = {}) {
    var canvasRibbon = document.getElementById(id),
        ctx = canvasRibbon.getContext('2d'),    // 获取canvas 2d上下文
        path,
        width,     // 返回窗口的文档显示区的宽高
        height,
        RIBBON_WIDE,
        math = Math,
        r = 0,
        PI_2 = math.PI * 2,    // 圆周率*2
        cos = math.cos,   // cos函数返回一个数值的余弦值（-1~1）
        random = math.random   // 返回0-1随机数
    function resize() {
        var dpr = window.devicePixelRatio || 1 // the size of one CSS pixel to the size of one physical pixel.
        width = window.innerWidth,     // 返回窗口的文档显示区的宽高
        height = window.innerHeight
        // RIBBON_WIDE = 90,
        RIBBON_WIDE = width / 10.5 * 0.75,
        canvasRibbon.width = width * dpr     // 返回实际宽高
        canvasRibbon.height = height * dpr
        ctx.globalAlpha = 0.3  // 图形透明度
    }
    function run() {
        ctx.clearRect(0, 0, width, height)     // 擦除之前绘制内容
        path = [{x: 0, y: height * 0.7 + RIBBON_WIDE}, {x: 0, y: height * 0.7 - RIBBON_WIDE}]
        // 路径没有填满屏幕宽度时，绘制路径
        while(path[1].x < width + RIBBON_WIDE) {
            drawTriangle(path[0], path[1])     // 调用绘制方法
        }
    }
    // 绘制彩带每一段路径
    function drawTriangle(start, end) {
        ctx.beginPath()    // 创建一个新的路径
        ctx.moveTo(start.x, start.y)   // path起点
        ctx.lineTo(end.x, end.y)   // path终点
        var nextX = end.x + (random() * 2 - 0.25) * RIBBON_WIDE,
            nextY = geneY(end.y)
        ctx.lineTo(nextX, nextY)
        ctx.closePath()
        r -= PI_2 / -50
        var color = '#' + (cos(r) * 127 + 128 << 16 | cos(r + PI_2 / 3) * 127 + 128 << 8 | cos(r + PI_2 / 3 * 2) * 127 + 128).toString(16)
        // 随机生成并设置canvas路径16进制颜色
        ctx.fillStyle = color
        ctx.fill()     // 根据当前样式填充路径
        path[0] = path[1]    // 起点更新为当前终点
        path[1] = {x: nextX, y: nextY}     // 更新终点
    }
    // 获取下一路径终点的y坐标值
    function geneY(y) {
        var temp = y + (random() * 2 - 1.2) * 90
        return (temp > height || temp < 0) ? geneY(y) : temp
    }
    function init() {
        resize()
        run()
    }
    document.addEventListener('click', function(e) {
        var target = e.target
        if(target.tagName !== 'A') {
            run()
        }
    })
    ;(function() {
        var timer = null
        window.addEventListener('resize', function() {
            if(timer) {
                window.clearTimeout(timer)
                timer = null
            }
            timer = setTimeout(init, 500)
        })
    })()
    init()
}
document.addEventListener('touchmove', function (e) {
    e.preventDefault()
})
ribbon()