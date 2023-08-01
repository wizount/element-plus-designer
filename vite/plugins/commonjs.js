import commonjs from '@rollup/plugin-commonjs'

export default function createCompression() {
    //解决引入commonjs模块后打包出现的{'default' is not exported by XXX}错误!!
   return  commonjs({requireReturnsDefault: true})
}