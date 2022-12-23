#!/usr/bin/env node
const _ = require("lodash")
const fs = require('fs-extra')
const path = require('path')
const Metashu = require("@ndujalabs/metashu")

const turfNameByArea = {
  16: "Lakeside",
  36: "Farmland",
  64: "Residential",
  100: "Woodland",
  144: "The Rockies",
};

class Shuffler {

  constructor(options = {}) {
    this.options = options
    if (!options.inputPath) {
      this.options.inputPath = path.resolve(__dirname, "../input")
    }
    if (!options.resultPath) {
      this.options.resultPath = path.resolve(__dirname, "../result")
    }
  }

  async run() {
    const {hash} = JSON.parse(await fs.readFile(path.resolve(this.options.inputPath, "blockinfo.json"), "utf8"));
    for (let nft of ["farm", "turf"]) {
      let data = _.trim(await fs.readFile(path.resolve(this.options.inputPath, `${nft}-unordered-metadata.csv`), "utf8")).replace(/\r/g, "").split("\n")
      let header = data.splice(0,1)
      let metashu = new Metashu({});
      let result = metashu.getShuffling(data, hash);
      let isFarm = nft === "farm";
      for (let i = 0; i< result.length; i++) {
        let id = isFarm ? i+1 : i + 16;
        let row = data[result[i].index].split(",")
        row[0] = id;
        row[1] = isFarm ? `MOBLAND Weed Farm #${id}` : `MOBLAND ${turfNameByArea[row[5]]} Turf #${id}`
        row[isFarm ? 5 : 2] = id
        header.push(row.join(","))
      }
      await fs.writeFile(path.resolve(this.options.resultPath, `${nft}-metadata.csv`), header.join("\n"))

    }
    if (!this.options.noConsole) {
      console.log("All done! Data saved in ", this.options.resultPath)
    }
  }
}

module.exports = Shuffler;
