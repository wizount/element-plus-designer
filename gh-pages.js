import ghpages from 'gh-pages';
ghpages.publish('dist', {
    branch: 'gh-pages',
    repo: 'https://github.com/wizount/element-plus-designer.git'
}, function (err) {
    console.info(err)
});