/* jshint node: true */
'use strict';
var fs = require('fs');
var AdmZip = require('adm-zip');
var gitignore = require('parse-gitignore');
var BasePlugin = require('ember-cli-deploy-plugin');

module.exports = {
  name: 'ember-cli-deploy-zip',
  createDeployPlugin: function(options) {
    var DeployPlugin = BasePlugin.extend({
      name: options.name,
      setup: function() {
        var zip = new AdmZip();

        // delete archive.zip if it exists
        try {
          fs.accessSync('archive.zip', fs.F_OK);
          fs.unlinkSync('archive.zip');
        } catch (e) {
          // noop
        }

        // returns an array of the root directory
        var ls = fs.readdirSync(__dirname + '/../../');

        // returns an array of the .gitignore file
        var patterns = gitignore('.gitignore');

        // loop through projects files and folders
        ls.forEach(function(currentValue) {
          if(currentValue === '.git') {
            return;
          }

          // only zip files/folders if they aren't in .gitignore
          if(patterns.indexOf(currentValue) < 0) {
            if(fs.lstatSync(currentValue).isFile()) {
              zip.addLocalFile(currentValue);
            }
            if(fs.lstatSync(currentValue).isDirectory()) {
              zip.addLocalFolder(currentValue);
            }
          }
        });

        // write everything to disk
        zip.writeZip("archive.zip");
      }
    });

    return new DeployPlugin();
  }
};
