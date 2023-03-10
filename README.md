# MOBLAND Turf and Farm reveal app

A simple tool to reveal turfs and farms mystery boxes

### Introduction

During the recent MOBLAND NFT Sale, 150 turfs and 1250 farms have been sold. 290 more farms have been airdropped to winners, for a total of 1540 farms. This repo manages the reveal of the metadata.

#### The flow

**Stage 1**

1. Set up this repo, with the unshuffled metadata in [input/farm-unordered-metadata.csv](https://github.com/superpowerlabs/turf-farm-reveal/blob/main/input/farm-unordered-metadata.csv) and [input/turf-unordered-metadata.csv](https://github.com/superpowerlabs/turf-farm-reveal/blob/main/input/turf-unordered-metadata.csv) 
2. Chose a future block on the BNB blockchain
3. Include the selected block in the file [input/blockinfo.json](https://github.com/superpowerlabs/turf-farm-reveal/blob/main/input/blockinfo.json)
4. Commit and push to GitHub

**Stage 2**

1. When the selected future block is mined, paste its hash in [input/blockinfo.json](https://github.com/superpowerlabs/turf-farm-reveal/blob/main/input/blockinfo.json)
2. Launch `./shuffler.js` to perform the shuffle and will create the results in [result/farm-metadata.csv](https://github.com/superpowerlabs/turf-farm-reveal/blob/main/result/farm-metadata.csv) and [result/turf-metadata.csv](https://github.com/superpowerlabs/turf-farm-reveal/blob/main/result/turf-metadata.csv)
3. Commit and push the results to GitHub. 
4. Import the metadata in the db.
5. Refresh the metadata on exchanges.

### A future block

The chosen block is [24161607](https://bscscan.com/block/24161607). Estimated Target: Fri Dec 23 2022 12:00:56 GMT-0800 (Pacific Standard Time). 

When the block is mined this repo will be updated and ready to shuffle the metadata.

### The winners

When the stage 2 is completed, the results will be in `result/farm-metadata.csv` and `result/turf-metadata.csv`.

### Credits

Author: [Francesco Sullo](https://sullo.co)

(c) 2022 Superpower Labs Inc.

### License
MIT
