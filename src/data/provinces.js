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
              longitude: 54.48961,
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
            name: "آسو",
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
              longitude: 54.57848,
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
              longitude: 54.56244,
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
              longitude: 54.32044,
            },
            zoomLevel: 16,
          },
          { id: 15, name: "جناح", value: "janah", services: [{ serviceId: 1 }], coordinates: { latitude: "27.021025", longitude: "54.288209" }, zoomLevel: 17 },
          { id: 16, name: "کهتویه", value: "kahtooyeh", services: [{ serviceId: 1 }], coordinates: { latitude: "26.994854", longitude: "54.215273" }, zoomLevel: 17 },
          { id: 17, name: "عالی احمدان", value: "ali-ahmadan", services: [{ serviceId: 1 }], coordinates: { latitude: "26.998002", longitude: "54.151723" }, zoomLevel: 17 },
          { id: 18, name: "فاریاب", value: "fariab-janah", services: [{ serviceId: 1 }], coordinates: { latitude: "27.141745", longitude: "54.207776" }, zoomLevel: 17 },
          { id: 19, name: "نهند", value: "nahand", services: [{ serviceId: 1 }], coordinates: { latitude: "27.203886", longitude: "54.195896" }, zoomLevel: 17 },
          { id: 20, name: "کوهیج", value: "koohij", services: [{ serviceId: 1 }], coordinates: { latitude: "27.190507", longitude: "54.162186" }, zoomLevel: 17 },
          { id: 21, name: "گزه", value: "gezeh", services: [{ serviceId: 1 }], coordinates: { latitude: "27.057391", longitude: "54.063054" }, zoomLevel: 17 },
          { id: 22, name: "دهنو خواجه", value: "dehnow-khajeh", services: [{ serviceId: 1 }], coordinates: { latitude: "27.052752", longitude: "54.047968" }, zoomLevel: 17 },
          { id: 23, name: "هنگویه", value: "hongouyeh", services: [{ serviceId: 1 }], coordinates: { latitude: "27.069601", longitude: "54.007886" }, zoomLevel: 17 },
          { id: 24, name: "عالی احمدان", value: "ali-ahmadan", services: [{ serviceId: 1 }], coordinates: { latitude: "27.072532", longitude: "53.987443" }, zoomLevel: 17 },
          { id: 25, name: "دهنو قلندران", value: "dehnow-qalandaran", services: [{ serviceId: 1 }], coordinates: { latitude: "27.074192", longitude: "53.976298" }, zoomLevel: 17 },
          { id: 26, name: "کنار سیاه", value: "konar-siah", services: [{ serviceId: 1 }], coordinates: { latitude: "27.069394", longitude: "53.931256" }, zoomLevel: 17 },
          { id: 27, name: "کمشک", value: "kemeshk", services: [{ serviceId: 1 }], coordinates: { latitude: "27.063034", longitude: "53.896176" }, zoomLevel: 17 },
          { id: 28, name: "گچویه", value: "گچویه", services: [{ serviceId: 1 }], coordinates: { latitude: "27.013379", longitude: "53.995481" }, zoomLevel: 17 },
          { id: 29, name: "مغدان", value: "moghdan", services: [{ serviceId: 1 }], coordinates: { latitude: "27.231589", longitude: "54.335683" }, zoomLevel: 17 },
          { id: 30, name: "بست قلات", value: "bast-ghalat", services: [{ serviceId: 1 }], coordinates: { latitude: "27.254914", longitude: "54.565129" }, zoomLevel: 17 },
          { id: 31, name: "گود گز", value: "gowd-gez", services: [{ serviceId: 1 }], coordinates: { latitude: "27.303621", longitude: "54.509298" }, zoomLevel: 17 },
          { id: 32, name: "مردونو", value: "merdono", services: [{ serviceId: 1 }], coordinates: { latitude: "27.330303", longitude: "54.466905" }, zoomLevel: 17 },
          { id: 33, name: "فتویه", value: "fatouyeh", services: [{ serviceId: 1 }], coordinates: { latitude: "27.332476", longitude: "54.412660" }, zoomLevel: 17 },
          { id: 34, name: "انوه", value: "anveh", services: [{ serviceId: 1 }], coordinates: { latitude: "27.396707", longitude: "54.281809" }, zoomLevel: 17 },
          { id: 35, name: "زنگارد", value: "zangard", services: [{ serviceId: 1 }], coordinates: { latitude: "27.220020", longitude: "54.612848" }, zoomLevel: 17 },
          { id: 36, name: "چاه بنارد", value: "chah-banard", services: [{ serviceId: 1 }], coordinates: { latitude: "27.242760", longitude: "54.609758" }, zoomLevel: 17 },
          { id: 37, name: "دهنگ", value: "dehong", services: [{ serviceId: 1 }], coordinates: { latitude: "27.314391", longitude: "54.656368" }, zoomLevel: 17 },
          { id: 38, name: "تدروئیه", value: "todrouyeh", services: [{ serviceId: 1 }], coordinates: { latitude: "27.308874", longitude: "54.711159" }, zoomLevel: 17 },
          { id: 39, name: "تسان", value: "tasan", services: [{ serviceId: 1 }], coordinates: { latitude: "27.382037", longitude: "54.600241" }, zoomLevel: 17 },
          { id: 40, name: "گاوبری", value: "gauberi", services: [{ serviceId: 1 }], coordinates: { latitude: "27.383152", longitude: "54.762679" }, zoomLevel: 17 },
          { id: 41, name: "گشون", value: "gashun", services: [{ serviceId: 1 }], coordinates: { latitude: "27.379101", longitude: "54.899753" }, zoomLevel: 17 },
          { id: 42, name: "چاه سرمه", value: "chah-sormeh", services: [{ serviceId: 1 }], coordinates: { latitude: "27.369755", longitude: "54.925744" }, zoomLevel: 17 },
          { id: 43, name: "کنچی", value: "konchi", services: [{ serviceId: 1 }], coordinates: { latitude: "27.192703", longitude: "54.885759" }, zoomLevel: 17 },
          { id: 44, name: "رودبار بستک", value: "roudbar-bastak", services: [{ serviceId: 1 }], coordinates: { latitude: "27.173692", longitude: "55.070401" }, zoomLevel: 17 },
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
