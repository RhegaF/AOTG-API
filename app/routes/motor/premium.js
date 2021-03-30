const router = require('express').Router()
const MwClient = require('../../mw/motor/mw.motor.client')
const config = require('../../config/mw.config')
const {publickey,privatekey} = require('../../config/db.config')
const {decrypt3DES, encrypt3DES} = require('../../auth/tripledes')


router.post('/calculate-premium', (req, res, next) => {
    MwClient.calculatePremium(req.body)
      .then(({ data }) => res.json(data))
      .catch(err => { next(err) })
  })

router.post('/quick-premium', (req, res, next) => {
    MwClient.quickPremium(req.body)
      .then(({ data }) => {
        res.json(data)
      })
      .catch(err => { next(err) })
  })
// router.post('/test', (req, res, next) => {
//     const test = JSON.stringify(req.body)

    
//     const Data = encrypt3DES(test , privatekey)
//     console.log(Data);
//     console.log(test);


//     // const A = {'Data': Data,
//     //             'Xpublic' : publickey}
//     // MwClient.testget(A)
//     //   .then(({ data }) => res.json(data))
//     //   .catch(err => { next(err) })
//   })

module.exports = router