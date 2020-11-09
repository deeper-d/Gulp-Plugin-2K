const { Transform } = require('stream')

const log = console.log.bind(console)

const contentForFile = (file) => {
    let content = file.contents.toString() // buffer 转 string
    let extension = file.extname.slice(1)
    let s = ''
    if (extension === 'js') {
        s = content + '\n' + '// 2k'
    } else if (extension === 'css' || extension === 'scss') {
        s = content + '\n' + '/* 2k */'
    } else {
        s = content + '\n' + '# 2k'
    }
    // file.contents 是一个 buffer 类型, 所以把字符串转成 buffer
    let b = Buffer.from(s)
    return b
}

const plugin2k = (options) => {

    let t = new Transform({
        objectMode: true,
        transform(file, encoding, callback) {
            file.contents = contentForFile(file)
            Object.entries(file).forEach(([k, v]) => {
                log(`(${k}) is (${v})`)
            })
            return callback(null, file)
        },
    })
    return t
}

module.exports = plugin2k