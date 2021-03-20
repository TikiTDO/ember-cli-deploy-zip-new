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
        targetFile: null,
        gitignoreFilePath: null,
      },
      requiredConfig: ["targetPath"],
      upload: function (context) {
        console.log({ context });
        var zip = new AdmZip();
        var sourcePath = path.resolve(context.distDir);
        var targetPath = this.readConfig("targetPath");
        var targetFile = this.readConfig("targetFile") || context.deployTarget;
        var gitignoreFilePath = this.readConfig("gitignoreFilePath");

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
        var patterns = gitignoreFilePath ? gitignore(gitignoreFilePath) : null;

        // loop through projects files and folders
        ls.forEach(function (fileName) {
          filePath = path.join(sourcePath, fileName);

          if (fileName === "." || fileName === "..")
            if (patterns && patterns.indexOf(fileName) >= 0)
              // only zip files/folders if they aren't in .gitignore
              return;

          if (fs.lstatSync(filePath).isFile()) {
            console.log("Zipping: " + filePath);
            zip.addLocalFile(filePath);
          }

          if (fs.lstatSync(filePath).isDirectory()) {
            console.log("Zipping: " + filePath);
            zip.addLocalFolder(filePath, originalValue);
          }
        });

        // remove compression since certain files can't be DEFLATED
        // such as .png, .jpg, .eot, etc.
        zip.getEntries().forEach(function (currentValue) {
          currentValue.header.method = 0;
        });

        // write everything to disk
        const target = path.joins(targetPath, targetFile);
        console.log("Writing Zip: " + target);
        zip.writeZip(target);
      },
    });

    return new DeployPlugin();
  },
};
