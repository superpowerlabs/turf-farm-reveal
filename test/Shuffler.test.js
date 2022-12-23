const { expect, assert } = require("chai");
const path = require("path");
const fs = require("fs-extra");

const Shuffler = require("../src/Shuffler");

describe("Shuffler", async function () {

  let testPath = path.resolve(__dirname, "../tmp/test");

  beforeEach(async function() {
    await fs.emptyDir(testPath);
  })

  after(async function() {
    // await fs.emptyDir(testPath);
  })

  it("should shuffle the data and verify that it is correct", async function () {
    let resultPath = path.join(testPath, "results")
    await fs.ensureDir(resultPath)
    let options = {
      inputPath: path.resolve(__dirname, "fixtures/input"),
      resultPath,
      noConsole: true
    }
    let shuffler = new Shuffler(options);
    await shuffler.run()

    const farmR0 = (await fs.readFile(resultPath + "/farm-metadata.csv", "utf8")).split("\n")
    expect(farmR0[23]).equal("23,MOBLAND Weed Farm #23,Rare,1,1,23,1,1,0,21,9,9,960,43500,255,460,23515,11757,776,776,1")

    expect(farmR0.length).equal(1541)

    const turfR0 = (await fs.readFile(resultPath + "/turf-metadata.csv", "utf8")).split("\n")
    expect(turfR0[34].split(",")[0]).equal("49")
    expect(turfR0[35]).equal("50,MOBLAND Lakeside Turf #50,50,4,4,16,1,1,1,1,1,0,1,0,Common")

    resultPath = path.join(testPath, "results2")
    await fs.ensureDir(resultPath)
    options = {
      inputPath: path.resolve(__dirname, "fixtures/input2"),
      resultPath,
      noConsole: true
    }
    shuffler = new Shuffler(options);
    await shuffler.run();

    const farmR1 = (await fs.readFile(resultPath + "/farm-metadata.csv", "utf8")).split("\n")

    expect(farmR1[23]).equal("23,MOBLAND Weed Farm #23,Common,1,1,23,1,1,0,1,4,4,290,42120,245,355,9490,4745,613,613,1")

    const turfR1 = (await fs.readFile(resultPath + "/turf-metadata.csv", "utf8")).split("\n")
    expect(turfR1[35]).equal("50,MOBLAND Residential Turf #50,50,8,8,64,1,1,1,1,1,0,1,0,Rare")

  });
});
