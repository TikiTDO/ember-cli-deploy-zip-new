/* jshint node: true */
"use strict";
var fs = require("fs");
var path = require("path");
var AdmZip = require("adm-zip");
var gitignore = require("parse-gitignore");
var DeployPluginBase = require("ember-cli-deploy-plugin");

module.exports = {
  name: "ember-cli-deploy-zip-new",
  createDeployPlugin: function (options) {
    var DeployPlugin = DeployPluginBase.extend({
      name: options.name,
      defaultConfig: {
        targetFile: "archive.zip",
        gitignoreFile: null,
      },
      requiredConfig: ["sourcePath", "targetPath"],
      setup: function () {
        var zip = new AdmZip();
        var sourcePath = this.readConfig("sourcePath");
        var targetPath = this.readConfig("targetPath");
        var targetFile = this.readConfig("targetFile");

        // delete archive.zip if it exists
        try {
          fs.accessSync(path.joins(targetPath, targetFile), fs.F_OK);
          fs.unlinkSync(path.joins(targetPath, targetFile));
        } catch (e) {
          // noop
        }

        // returns an array of the root directory
        var ls = fs.readdirSync(sourcePath);

        // Optional gitignore parser
        var patterns = gitignoreFile ? gitignore(gitignoreFile) : null;

        // loop through projects files and folders
        ls.forEach(function (fileName) {
          // only zip files/folders if they aren't in .gitignore
          if (patterns && patterns.indexOf(fileName) >= 0) return;

          if (fs.lstatSync(fileName).isFile()) {
            console.log("Zipping: " + fileName);
            zip.addLocalFile(fileName);
          }

          if (fs.lstatSync(fileName).isDirectory()) {
            console.log("Zipping: " + fileName);
            zip.addLocalFolder(fileName, originalValue);
          }
        });

        // remove compression since certain files can't be DEFLATED
        // such as .png, .jpg, .eot, etc.
        zip.getEntries().forEach(function (currentValue) {
          currentValue.header.method = 0;
        });

        // write everything to disk
        zip.writeZip(path.joins(targetPath, targetFile));
      },
    });

    return new DeployPlugin();
  },
};
