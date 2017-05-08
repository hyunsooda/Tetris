// webpack version

module.exports = {
    entry : './basic_logic.js',
    output : {
        path : __dirname,
        filename : 'translate_basic_logic.js'
    },
    module : {
        rules : [{
            test : /\.js$/,
            exclude : /node_modules/,
            use : [{
                loader : 'babel-loader',
                options : {
                    presets : ['es2017'],
                    plugins : ["transform-react-jsx"]
                }
            }]        
        }]
    },
    devServer : {
        inline : true,
        port : 7777,
        contentBase : __dirname
    }
}