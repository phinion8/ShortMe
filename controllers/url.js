const shortid = require("shortid");
const URL = require("../models/url");
const { timeStamp } = require("console");

async function generateShortUrl(req, res){
      const body = req.body;
      if(!body.url) return res.status(400).json({status: "Url not found..."});
      const urlId = shortid(8);
      await URL.create({
            urlId: urlId,
            redirectUrl: body.url,
            viewHistory: [],
            createdBy: req.user._id
      });
      // res.status(200).json({
      //       status: "Short url created successully",
      //       redirectUrl: `${req.protocol + '://' + req.get('host') + req.originalUrl}/${urlId}`
      // });
      return res.render("home", {
            redirectUrl: `${req.protocol + '://' + req.get('host') + req.originalUrl}/${urlId}`
      });
}

async function redirectToUrl(req, res){
      const urlId = req.params.urlId;
      const entry = await URL.findOneAndUpdate({
            urlId
      }, {
            $push: {
                  viewHistory: {
                        timeStamp: Date.now()
                  }
            }
      })
      res.redirect(entry.redirectUrl);
}

async function getAnaytics(req, res){
      const urlId = req.params.urlId;
      const entry = await URL.findOne({urlId});
      if(!entry) return res.status(400).json({status: "Invalid url id"});
      res.status(200).json({
            totalClicks: entry.viewHistory.length,
            analytics: entry.viewHistory
      });

}

module.exports = {
      generateShortUrl,
      redirectToUrl,
      getAnaytics
}