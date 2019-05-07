module.exports = isPro => ({
    test : /\.vue$/,
    loader : 'vue-loader',
    options : {
        cssSourceMap       : !isPro,
        cacheBusting       : !isPro,
        transformToRequire : {
            image  : 'xlink:href',
            img    : 'src',
            source : 'src',
            video  : ['src', 'poster']
        }
    }
});
