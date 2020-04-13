const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;
  router.get('/', async (req, res, next) => {
    try {
      const artwork = await speakersService.getAllArtwork();
      const speakers = await speakersService.getList();
      return res.render('layout', {
        pageTitle: 'Speakers',
        template: 'speakers',
        speakers,
        artwork,
      });
    } catch (error) {
      return next(error);
    }
  });

  router.get('/:shortName', async (req, res, next) => {
    try {
      const artwork = await speakersService.getArtworkForSpeaker(req.params.shortName);
      const speaker = await speakersService.getSpeaker(req.params.shortName);
      return res.render('layout', {
        pageTitle: 'Speakers',
        template: 'speaker-detail',
        speaker,
        artwork,
      });
    } catch (error) {
      return next(error);
    }
  });
  return router;
};
