class HP {
    apply(compiler) {
        compiler.hooks.done.tap('YiyiPlugin', (compilation, callback) => {
            console.log('YiyiPlugin======');
        });
    }
}
module.exports = HP;
