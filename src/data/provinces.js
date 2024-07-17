const provinces = [
  {
    id: 1,
    name: "هرمزگان",
    value: "hormozgan",
    counties: [
      {
        id: 1,
        name: "بندرعباس",
        value: "bandarAbbas",
        cities: [
          {
            id: 1,
            name: "بندرعباس",
            value: "bandarAbbas",
            services: [
              {
                serviceId: 1,
                areas: [
                  {
                    area1: [
                      [27.202667, 56.314331],
                      [27.198218, 56.294427],
                      [27.180741, 56.310707],
                    ],
                  },
                ],
              },
              { serviceId: 2 },
              { serviceId: 3 },
            ],
            coordinates: {
              latitude: 27.188772,
              longitude: 56.309378,
            },
            zoomLevel: 13,
          },
        ],
      },
      {
        id: 2,
        name: "بندر لنگه",
        value: "bandarLengeh",
        cities: [
          {
            id: 1,
            name: "بندر لنگه",
            value: "bandarLengeh",
            services: [{ serviceId: 1 }, { serviceId: 2 }],
            coordinates: {
              latitude: 26.567041,
              longitude: 54.893308,
            },
            zoomLevel: 14,
          },
          {
            id: 2,
            name: "بندر کنگ",
            value: "kong",
            services: [{ serviceId: 2 }],
            coordinates: {
              latitude: 26.596924,
              longitude: 54.928161,
            },
            zoomLevel: 15,
          },
        ],
      },
      {
        id: 3,
        name: "بندر خمیر",
        value: "bandarKhamir",
        cities: [
          {
            id: 1,
            name: "بندر خمیر",
            value: "bandarKhamir",
            services: [{ serviceId: 2 }],
            coordinates: {
              latitude: 26.953298,
              longitude: 55.585335,
            },
            zoomLevel: 15,
          },
        ],
      },
      {
        id: 4,
        name: "بستک",
        value: "bastak",
        cities: [
          {
            id: 1,
            name: "بستک",
            value: "bastak",
            services: [
              {
                serviceId: 1,
                areas: [
                  {
                    area1: [
                      [27.193585, 54.364304],
                      [27.188723, 54.371332],
                      [27.194724, 54.370426],
                    ],
                  },
                  {
                    area2: [
                      [27.207214, 54.367918],
                      [27.197636, 54.36587],
                      [27.203289, 54.359671],
                    ],
                  },
                ],
              },
              { serviceId: 2 },
              { serviceId: 3 },
            ],
            coordinates: {
              latitude: 27.196518,
              longitude: 54.367833,
            },
            zoomLevel: 14,
          },
          {
            id: 2,
            name: "هرنگ",
            value: "herang",
            services: [{ serviceId: 1 }],
            coordinates: {
              latitude: 27.105194,
              longitude: 54.450729,
            },
            zoomLevel: 15,
          },
          {
            id: 3,
            name: "کوخرد",
            value: "kookherd",
            services: [{ serviceId: 1 }],
            coordinates: {
              latitude: 27.085419,
              longitude: 54.489610,
            },
            zoomLevel: 15,
          },
          {
            id: 4,
            name: "چاله",
            value: "chaleh",
            services: [{ serviceId: 1 }],
            coordinates: {
              latitude: 27.085096,
              longitude: 54.521873,
            },
            zoomLevel: 17,
          },
          {
            id: 5,
            name: "گریند",
            value: "goreyand",
            services: [{ serviceId: 1 }],
            coordinates: {
              latitude: 27.087236,
              longitude: 54.527537,
            },
            zoomLevel: 17,
          },
          {
            id: 6,
            name: "شهرک صالح آباد",
            value: "saleh-abad",
            services: [{ serviceId: 1 }],
            coordinates: {
              latitude: 27.078021,
              longitude: 54.551868,
            },
            zoomLevel: 17,
          },
          {
            id: 7,
            name: "اسو",
            value: "asou",
            services: [{ serviceId: 1 }],
            coordinates: {
              latitude: 27.078653,
              longitude: 54.567032,
            },
            zoomLevel: 17,
          },
          {
            id: 8,
            name: "تخت گرو",
            value: "takht-gerou",
            services: [{ serviceId: 1 }],
            coordinates: {
              latitude: 27.094815,
              longitude: 54.604089,
            },
            zoomLevel: 17,
          },
          {
            id: 9,
            name: "لاور شیخ",
            value: "lavar-sheikh",
            services: [{ serviceId: 1 }],
            coordinates: {
              latitude: 27.112179,
              longitude: 54.693267,
            },
            zoomLevel: 17,
          },
          {
            id: 10,
            name: "کنار زرد",
            value: "konar-zard",
            services: [{ serviceId: 1 }],
            coordinates: {
              latitude: 27.045921,
              longitude: 54.678333,
            },
            zoomLevel: 17,
          },
          {
            id: 11,
            name: "کوران",
            value: "koran",
            services: [{ serviceId: 1 }],
            coordinates: {
              latitude: 27.006473,
              longitude: 54.660437,
            },
            zoomLevel: 17,
          },
          {
            id: 12,
            name: "بن کوه چهار برکه",
            value: "bon-kooh-chahar-berkeh",
            services: [{ serviceId: 1 }],
            coordinates: {
              latitude: 27.001077,
              longitude: 54.578480,
            },
            zoomLevel: 18,
          },
          {
            id: 13,
            name: "لاور دین",
            value: "lavar-din",
            services: [{ serviceId: 1 }],
            coordinates: {
              latitude: 26.967127,
              longitude: 54.562440,
            },
            zoomLevel: 17,
          },
          {
            id: 14,
            name: "خلوص",
            value: "kholus",
            services: [{ serviceId: 1 }],
            coordinates: {
              latitude: 27.111739,
              longitude: 54.320440,
            },
            zoomLevel: 16,
          },
        ],
      },
      {
        id: 5,
        name: "پارسیان",
        value: "parsian",
      },
      {
        id: 6,
        name: "حاجی آباد",
        value: "hajiAbad",
      },
      {
        id: 7,
        name: "میناب",
        value: "Minab",
      },
      {
        id: 8,
        name: "رودان",
        value: "roudan",
      },
      {
        id: 9,
        name: "بشاگرد",
        value: "bashagard",
      },
      {
        id: 10,
        name: "جاسک",
        value: "jask",
      },
      {
        id: 11,
        name: "سیریک",
        value: "sirik",
      },
    ],
  },
  {
    id: 2,
    name: "فارس",
    value: "fars",
    counties: [
      {
        id: 1,
        name: "اوز",
        value: "evaz",
        cities: [
          {
            id: 1,
            name: "اوز",
            value: "evaz",
            services: [{ serviceId: 2 }, { serviceId: 3 }],
            coordinates: {
              latitude: 27.759911,
              longitude: 54.006494,
            },
            zoomLevel: 15,
          },
        ],
      },
    ],
  },
];

export { provinces };
