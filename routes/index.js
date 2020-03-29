var express = require('express');
var router = express.Router();

router.all('/', function(req, res, next) {
  res.sendStatus(200);
});

router.all('/search', function(req, res, next) {
  res.json([
    'metric-1',
    'metric-2',
    'metric-3 and metric-4',
  ]);
});

router.all('/query', function(req, res, next) {
  const type = req.body.targets[0].type;
  const target = req.body.targets[0].target;

  let results = [];

  switch (type) {
    case 'timeseries':
      switch (target) {
        case 'metric-1':
          results = [
            {
              target: 'metric-1',
              datapoints:[
                [622,1585494000000],
                [365,1585494300000],
                [25, 1585494600000],
                [610, 1585494900000],
                [250, 1585495200000],
                [620, 1585495500000],
                [420, 1585495800000],
                [30, 1585496100000],
              ]
            }
          ];
          break;
        case 'metric-3 and metric-4':
          results = [
            {
              target: 'metric-3',
              datapoints:[
                [622,1585494000000],
                [365,1585494300000],
                [25, 1585494600000],
                [610, 1585494900000],
                [250, 1585495200000],
                [620, 1585495500000],
                [420, 1585495800000],
                [30, 1585496100000],
              ]
            },
            {
              target: 'metric-4',
              datapoints:[
                [120,1585494000000],
                [35,1585494300000],
                [225, 1585494600000],
                [10, 1585494900000],
                [650, 1585495200000],
                [20, 1585495500000],
                [20, 1585495800000],
                [430, 1585496100000],
              ],
            },
          ];
          break;
      }
      break;
    case 'table':
      results = [
        {
          columns: [
            {text: 'Field - string', 'type': 'string'},
            {text: 'Field - number', 'type': 'number'},
          ],
          rows: [
            ['Text 1', 124],
            ['Text 2', 5678],
            ['Text 3', 15243664],
          ],
          type: 'table',
        }
      ];
      break;
  }
  res.json(results);
});

router.all('/annotations', function(req, res, next) {
  res.json([
    {
      "text": "text shown in body",
      "title": "Annotation Title",
      "isRegion": true,
      "time": "timestamp",
      "timeEnd": "timestamp",
      "tags": ["tag1"]
    }
  ]);
});

module.exports = router;
