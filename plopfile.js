const path = require('path');
const fs = require('fs');

function getDirsSync(src) {
  return fs
    .readdirSync(src)
    .filter(file => fs.statSync(path.join(src, file)).isDirectory());
}

module.exports = function generate(plop) {
  plop.setGenerator('feature', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'choose feature name in camelCase (e.g. myFeature)',
        basePath: '.',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: path.join(__dirname, 'src/features'),
        base: '.blueprints/feature',
        templateFiles: '.blueprints/feature/**/**',
      },
    ],
  });
};
