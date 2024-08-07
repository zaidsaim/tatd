import { Dimensions, PixelRatio } from 'react-native';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => SCREEN_WIDTH / guidelineBaseWidth * size;
const verticalScale = size => SCREEN_HEIGHT / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const normalizeFontSize = (size) => {
  return Math.round(PixelRatio.roundToNearestPixel(moderateScale(size)));
};


export const Colors = {
    primary: '#16588e',
    black: '#000000',
    white: '#FFFFFF',
    grey: '#D3D3D3',
    darkgrey:'#808080',
    lightgrey: '#f1f1f1',
    secondary: '#d9d9d9',
    lightblue: '#0981bd',
    orange: '#ff8b00',
    darkblue:'#0390fc',
    icon:'#bab7af',
    mediumgrey:'#b1b3b5',
    lightGreen:'#289c51',
    secondarylight:'#e8eaeb',
    check:'#75c519',
    secondydark:'#b7cbdc',
    iconplus:'#337ab7',
    red:'#FF0000',
    textcolor:'#52708a'
  };
  
  // export const FontSizes = {
  //   tinyxsmall:8,
  //   tinysmall:9,
  //   tiny: 10,
  //   xtiny: 11,
  //   small: 12,
  //   xsmall:13,
  //   tinymedium: 14,
  //   medium: 16,
  //   body: 18,
  //   xbody:19,
  //   large: 20,
  //   xlarge:22,
  //   xxlarge: 24,
  //   xxxlarge: 30,
  //   xxxxlarge:40,
  //   title: 34,
  //   subtitle: 28,
  //   header:90

  // };
  export const FontSizes = {
    tinyxsmall: normalizeFontSize(8),
    tinysmall: normalizeFontSize(9),
    tiny: normalizeFontSize(10),
    xtiny: normalizeFontSize(11),
    small: normalizeFontSize(12),
    xsmall: normalizeFontSize(13),
    tinymedium: normalizeFontSize(14),
    medium: normalizeFontSize(16),
    body: normalizeFontSize(18),
    xbody: normalizeFontSize(19),
    large: normalizeFontSize(20),
    xlarge: normalizeFontSize(22),
    xxlarge: normalizeFontSize(24),
    xxxlarge: normalizeFontSize(30),
    xxxxlarge: normalizeFontSize(40),
    title: normalizeFontSize(34),
    subtitle: normalizeFontSize(28),
    header: normalizeFontSize(90)
  };
  
  export const FontWeights = {
    thin: '100',
    extraLight: '200',
    light: '300',
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
    extraBold: '800',
    black: '900',
  };
  
  export const BorderRadius = {
    br1: { borderRadius: 1 }, br2: { borderRadius: 2 }, br3: { borderRadius: 3 }, br4: { borderRadius: 4 }, br5: { borderRadius: 5 },
    br6: { borderRadius: 6 }, br7: { borderRadius: 7 }, br8: { borderRadius: 8 }, br9: { borderRadius: 9 }, br10: { borderRadius: 10 },
    br11: { borderRadius: 11 }, br12: { borderRadius: 12 }, br13: { borderRadius: 13 }, br14: { borderRadius: 14 }, br15: { borderRadius: 15 },
    br16: { borderRadius: 16 }, br17: { borderRadius: 17 }, br18: { borderRadius: 18 }, br19: { borderRadius: 19 }, br20: { borderRadius: 20 },
    br21: { borderRadius: 21 }, br22: { borderRadius: 22 }, br23: { borderRadius: 23 }, br24: { borderRadius: 24 }, br25: { borderRadius: 25 },
    br26: { borderRadius: 26 }, br27: { borderRadius: 27 }, br28: { borderRadius: 28 }, br29: { borderRadius: 29 }, br30: { borderRadius: 30 },
    br31: { borderRadius: 31 }, br32: { borderRadius: 32 }, br33: { borderRadius: 33 }, br34: { borderRadius: 34 }, br35: { borderRadius: 35 },
    br36: { borderRadius: 36 }, br37: { borderRadius: 37 }, br38: { borderRadius: 38 }, br39: { borderRadius: 39 }, br40: { borderRadius: 40 },
    br41: { borderRadius: 41 }, br42: { borderRadius: 42 }, br43: { borderRadius: 43 }, br44: { borderRadius: 44 }, br45: { borderRadius: 45 },
    br46: { borderRadius: 46 }, br47: { borderRadius: 47 }, br48: { borderRadius: 48 }, br49: { borderRadius: 49 }, br50: { borderRadius: 50 },
  };
  export const Paddings = {
    p: {
      p1: { padding: 1 }, p2: { padding: 2 }, p3: { padding: 3 }, p4: { padding: 4 }, p5: { padding: 5 },
      p6: { padding: 6 }, p7: { padding: 7 }, p8: { padding: 8 }, p9: { padding: 9 }, p10: { padding: 10 },
      p11: { padding: 11 }, p12: { padding: 12 }, p13: { padding: 13 }, p14: { padding: 14 }, p15: { padding: 15 },
      p16: { padding: 16 }, p17: { padding: 17 }, p18: { padding: 18 }, p19: { padding: 19 }, p20: { padding: 20 },
      p21: { padding: 21 }, p22: { padding: 22 }, p23: { padding: 23 }, p24: { padding: 24 }, p25: { padding: 25 },
      p26: { padding: 26 }, p27: { padding: 27 }, p28: { padding: 28 }, p29: { padding: 29 }, p30: { padding: 30 },
    },
    pt: {
      pt1: { paddingTop: 1 }, pt2: { paddingTop: 2 }, pt3: { paddingTop: 3 }, pt4: { paddingTop: 4 }, pt5: { paddingTop: 5 },
      pt6: { paddingTop: 6 }, pt7: { paddingTop: 7 }, pt8: { paddingTop: 8 }, pt9: { paddingTop: 9 }, pt10: { paddingTop: 10 },
      pt11: { paddingTop: 11 }, pt12: { paddingTop: 12 }, pt13: { paddingTop: 13 }, pt14: { paddingTop: 14 }, pt15: { paddingTop: 15 },
      pt16: { paddingTop: 16 }, pt17: { paddingTop: 17 }, pt18: { paddingTop: 18 }, pt19: { paddingTop: 19 }, pt20: { paddingTop: 20 },
      pt21: { paddingTop: 21 }, pt22: { paddingTop: 22 }, pt23: { paddingTop: 23 }, pt24: { paddingTop: 24 }, pt25: { paddingTop: 25 },
      pt26: { paddingTop: 26 }, pt27: { paddingTop: 27 }, pt28: { paddingTop: 28 }, pt29: { paddingTop: 29 }, pt30: { paddingTop: 30 },
      pt50: { paddingTop: 50 },
    },
    pl: {
      pl1: { paddingLeft: 1 }, pl2: { paddingLeft: 2 }, pl3: { paddingLeft: 3 }, pl4: { paddingLeft: 4 }, pl5: { paddingLeft: 5 },
      pl6: { paddingLeft: 6 }, pl7: { paddingLeft: 7 }, pl8: { paddingLeft: 8 }, pl9: { paddingLeft: 9 }, pl10: { paddingLeft: 10 },
      pl11: { paddingLeft: 11 }, pl12: { paddingLeft: 12 }, pl13: { paddingLeft: 13 }, pl14: { paddingLeft: 14 }, pl15: { paddingLeft: 15 },
      pl16: { paddingLeft: 16 }, pl17: { paddingLeft: 17 }, pl18: { paddingLeft: 18 }, pl19: { paddingLeft: 19 }, pl20: { paddingLeft: 20 },
      pl21: { paddingLeft: 21 }, pl22: { paddingLeft: 22 }, pl23: { paddingLeft: 23 }, pl24: { paddingLeft: 24 }, pl25: { paddingLeft: 25 },
      pl26: { paddingLeft: 26 }, pl27: { paddingLeft: 27 }, pl28: { paddingLeft: 28 }, pl29: { paddingLeft: 29 }, pl30: { paddingLeft: 30 },
    },
    pr: {
      pr1: { paddingRight: 1 }, pr2: { paddingRight: 2 }, pr3: { paddingRight: 3 }, pr4: { paddingRight: 4 }, pr5: { paddingRight: 5 },
      pr6: { paddingRight: 6 }, pr7: { paddingRight: 7 }, pr8: { paddingRight: 8 }, pr9: { paddingRight: 9 }, pr10: { paddingRight: 10 },
      pr11: { paddingRight: 11 }, pr12: { paddingRight: 12 }, pr13: { paddingRight: 13 }, pr14: { paddingRight: 14 }, pr15: { paddingRight: 15 },
      pr16: { paddingRight: 16 }, pr17: { paddingRight: 17 }, pr18: { paddingRight: 18 }, pr19: { paddingRight: 19 }, pr20: { paddingRight: 20 },
      pr21: { paddingRight: 21 }, pr22: { paddingRight: 22 }, pr23: { paddingRight: 23 }, pr24: { paddingRight: 24 }, pr25: { paddingRight: 25 },
      pr26: { paddingRight: 26 }, pr27: { paddingRight: 27 }, pr28: { paddingRight: 28 }, pr29: { paddingRight: 29 }, pr30: { paddingRight: 30 },
    },
    pv: {
      pv1: { paddingVertical: 1 }, pv2: { paddingVertical: 2 }, pv3: { paddingVertical: 3 }, pv4: { paddingVertical: 4 }, pv5: { paddingVertical: 5 },
      pv6: { paddingVertical: 6 }, pv7: { paddingVertical: 7 }, pv8: { paddingVertical: 8 }, pv9: { paddingVertical: 9 }, pv10: { paddingVertical: 10 },
      pv11: { paddingVertical: 11 }, pv12: { paddingVertical: 12 }, pv13: { paddingVertical: 13 }, pv14: { paddingVertical: 14 }, pv15: { paddingVertical: 15 },
      pv16: { paddingVertical: 16 }, pv17: { paddingVertical: 17 }, pv18: { paddingVertical: 18 }, pv19: { paddingVertical: 19 }, pv20: { paddingVertical: 20 },
      pv21: { paddingVertical: 21 }, pv22: { paddingVertical: 22 }, pv23: { paddingVertical: 23 }, pv24: { paddingVertical: 24 }, pv25: { paddingVertical: 25 },
      pv26: { paddingVertical: 26 }, pv27: { paddingVertical: 27 }, pv28: { paddingVertical: 28 }, pv29: { paddingVertical: 29 }, pv30: { paddingVertical: 30 },
    },
    ph: {
      ph1: { paddingHorizontal: 1 }, ph2: { paddingHorizontal: 2 }, ph3: { paddingHorizontal: 3 }, ph4: { paddingHorizontal: 4 }, ph5: { paddingHorizontal: 5 },
      ph6: { paddingHorizontal: 6 }, ph7: { paddingHorizontal: 7 }, ph8: { paddingHorizontal: 8 }, ph9: { paddingHorizontal: 9 }, ph10: { paddingHorizontal: 10 },
      ph11: { paddingHorizontal: 11 }, ph12: { paddingHorizontal: 12 }, ph13: { paddingHorizontal: 13 }, ph14: { paddingHorizontal: 14 }, ph15: { paddingHorizontal: 15 },
      ph16: { paddingHorizontal: 16 }, ph17: { paddingHorizontal: 17 }, ph18: { paddingHorizontal: 18 }, ph19: { paddingHorizontal: 19 }, ph20: { paddingHorizontal: 20 },
      ph21: { paddingHorizontal: 21 }, ph22: { paddingHorizontal: 22 }, ph23: { paddingHorizontal: 23 }, ph24: { paddingHorizontal: 24 }, ph25: { paddingHorizontal: 25 },
      ph26: { paddingHorizontal: 26 }, ph27: { paddingHorizontal: 27 }, ph28: { paddingHorizontal: 28 }, ph29: { paddingHorizontal: 29 }, ph30: { paddingHorizontal: 30 },
      ph60: { paddingHorizontal: 60 }, ph50: { paddingHorizontal: 50 },
    },
    pb: {
      pb1: { paddingBottom: 1 }, pb2: { paddingBottom: 2 }, pb3: { paddingBottom: 3 }, pb4: { paddingBottom: 4 }, pb5: { paddingBottom: 5 },
      pb6: { paddingBottom: 6 }, pb7: { paddingBottom: 7 }, pb8: { paddingBottom: 8 }, pb9: { paddingBottom: 9 }, pb10: { paddingBottom: 10 },
      pb11: { paddingBottom: 11 }, pb12: { paddingBottom: 12 }, pb13: { paddingBottom: 13 }, pb14: { paddingBottom: 14 }, pb15: { paddingBottom: 15 },
      pb16: { paddingBottom: 16 }, pb17: { paddingBottom: 17 }, pb18: { paddingBottom: 18 }, pb19: { paddingBottom: 19 }, pb20: { paddingBottom: 20 },
      pb21: { paddingBottom: 21 }, pb22: { paddingBottom: 22 }, pb23: { paddingBottom: 23 }, pb24: { paddingBottom: 24 }, pb25: { paddingBottom: 25 },
      pb26: { paddingBottom: 26 }, pb27: { paddingBottom: 27 }, pb28: { paddingBottom: 28 }, pb29: { paddingBottom: 29 }, pb30: { paddingBottom: 30 },
    },
  };
  
  export const BorderWidths = {
    bw: {
      bw1: { borderWidth: 1 }, bw2: { borderWidth: 2 }, bw3: { borderWidth: 3 }, bw4: { borderWidth: 4 }, bw5: { borderWidth: 5 },
      bw6: { borderWidth: 6 }, bw7: { borderWidth: 7 }, bw8: { borderWidth: 8 }, bw9: { borderWidth: 9 }, bw10: { borderWidth: 10 },
    },
    bl: {
      bl1: { borderLeftWidth: 1 }, bl2: { borderLeftWidth: 2 }, bl3: { borderLeftWidth: 3 }, bl4: { borderLeftWidth: 4 }, bl5: { borderLeftWidth: 5 },
      bl6: { borderLeftWidth: 6 }, bl7: { borderLeftWidth: 7 }, bl8: { borderLeftWidth: 8 }, bl9: { borderLeftWidth: 9 }, bl10: { borderLeftWidth: 10 },
    },
    br: {
      br1: { borderRightWidth: 1 }, br2: { borderRightWidth: 2 }, br3: { borderRightWidth: 3 }, br4: { borderRightWidth: 4 }, br5: { borderRightWidth: 5 },
      br6: { borderRightWidth: 6 }, br7: { borderRightWidth: 7 }, br8: { borderRightWidth: 8 }, br9: { borderRightWidth: 9 }, br10: { borderRightWidth: 10 },
    },
    bt: {
      bt1: { borderTopWidth: 1 }, bt2: { borderTopWidth: 2 }, bt3: { borderTopWidth: 3 }, bt4: { borderTopWidth: 4 }, bt5: { borderTopWidth: 5 },
      bt6: { borderTopWidth: 6 }, bt7: { borderTopWidth: 7 }, bt8: { borderTopWidth: 8 }, bt9: { borderTopWidth: 9 }, bt10: { borderTopWidth: 10 },
    },
    bb: {
      bb1: { borderBottomWidth: 1 }, bb2: { borderBottomWidth: 2 }, bb3: { borderBottomWidth: 3 }, bb4: { borderBottomWidth: 4 }, bb5: { borderBottomWidth: 5 },
      bb6: { borderBottomWidth: 6 }, bb7: { borderBottomWidth: 7 }, bb8: { borderBottomWidth: 8 }, bb9: { borderBottomWidth: 9 }, bb10: { borderBottomWidth: 10 },
    },
  };

  export const Margins = {
    m: {
      m1: { margin: 1 }, m2: { margin: 2 }, m3: { margin: 3 }, m4: { margin: 4 }, m5: { margin: 5 },
      m6: { margin: 6 }, m7: { margin: 7 }, m8: { margin: 8 }, m9: { margin: 9 }, m10: { margin: 10 },
      m11: { margin: 11 }, m12: { margin: 12 }, m13: { margin: 13 }, m14: { margin: 14 }, m15: { margin: 15 },
      m16: { margin: 16 }, m17: { margin: 17 }, m18: { margin: 18 }, m19: { margin: 19 }, m20: { margin: 20 },
      m21: { margin: 21 }, m22: { margin: 22 }, m23: { margin: 23 }, m24: { margin: 24 }, m25: { margin: 25 },
      m26: { margin: 26 }, m27: { margin: 27 }, m28: { margin: 28 }, m29: { margin: 29 }, m30: { margin: 30 },
      m31: { margin: 31 }, m32: { margin: 32 }, m33: { margin: 33 }, m34: { margin: 34 }, m35: { margin: 35 },
      m36: { margin: 36 }, m37: { margin: 37 }, m38: { margin: 38 }, m39: { margin: 39 }, m40: { margin: 40 },
      m41: { margin: 41 }, m42: { margin: 42 }, m43: { margin: 43 }, m44: { margin: 44 }, m45: { margin: 45 },
      m46: { margin: 46 }, m47: { margin: 47 }, m48: { margin: 48 }, m49: { margin: 49 }, m50: { margin: 50 }
    },
    mt: {
      mt1: { marginTop: 1 }, mt2: { marginTop: 2 }, mt3: { marginTop: 3 }, mt4: { marginTop: 4 }, mt5: { marginTop: 5 },
      mt6: { marginTop: 6 }, mt7: { marginTop: 7 }, mt8: { marginTop: 8 }, mt9: { marginTop: 9 }, mt10: { marginTop: 10 },
      mt11: { marginTop: 11 }, mt12: { marginTop: 12 }, mt13: { marginTop: 13 }, mt14: { marginTop: 14 }, mt15: { marginTop: 15 },
      mt16: { marginTop: 16 }, mt17: { marginTop: 17 }, mt18: { marginTop: 18 }, mt19: { marginTop: 19 }, mt20: { marginTop: 20 },
      mt21: { marginTop: 21 }, mt22: { marginTop: 22 }, mt23: { marginTop: 23 }, mt24: { marginTop: 24 }, mt25: { marginTop: 25 },
      mt26: { marginTop: 26 }, mt27: { marginTop: 27 }, mt28: { marginTop: 28 }, mt29: { marginTop: 29 }, mt30: { marginTop: 30 },
      mt31: { marginTop: 31 }, mt32: { marginTop: 32 }, mt33: { marginTop: 33 }, mt34: { marginTop: 34 }, mt35: { marginTop: 35 },
      mt36: { marginTop: 36 }, mt37: { marginTop: 37 }, mt38: { marginTop: 38 }, mt39: { marginTop: 39 }, mt40: { marginTop: 40 },
      mt41: { marginTop: 41 }, mt42: { marginTop: 42 }, mt43: { marginTop: 43 }, mt44: { marginTop: 44 }, mt45: { marginTop: 45 },
      mt46: { marginTop: 46 }, mt47: { marginTop: 47 }, mt48: { marginTop: 48 }, mt49: { marginTop: 49 }, mt50: { marginTop: 50 }
    },
    ml: {
      ml1: { marginLeft: 1 }, ml2: { marginLeft: 2 }, ml3: { marginLeft: 3 }, ml4: { marginLeft: 4 }, ml5: { marginLeft: 5 },
      ml6: { marginLeft: 6 }, ml7: { marginLeft: 7 }, ml8: { marginLeft: 8 }, ml9: { marginLeft: 9 }, ml10: { marginLeft: 10 },
      ml11: { marginLeft: 11 }, ml12: { marginLeft: 12 }, ml13: { marginLeft: 13 }, ml14: { marginLeft: 14 }, ml15: { marginLeft: 15 },
      ml16: { marginLeft: 16 }, ml17: { marginLeft: 17 }, ml18: { marginLeft: 18 }, ml19: { marginLeft: 19 }, ml20: { marginLeft: 20 },
      ml21: { marginLeft: 21 }, ml22: { marginLeft: 22 }, ml23: { marginLeft: 23 }, ml24: { marginLeft: 24 }, ml25: { marginLeft: 25 },
      ml26: { marginLeft: 26 }, ml27: { marginLeft: 27 }, ml28: { marginLeft: 28 }, ml29: { marginLeft: 29 }, ml30: { marginLeft: 30 },
      ml31: { marginLeft: 31 }, ml32: { marginLeft: 32 }, ml33: { marginLeft: 33 }, ml34: { marginLeft: 34 }, ml35: { marginLeft: 35 },
      ml36: { marginLeft: 36 }, ml37: { marginLeft: 37 }, ml38: { marginLeft: 38 }, ml39: { marginLeft: 39 }, ml40: { marginLeft: 40 },
      ml41: { marginLeft: 41 }, ml42: { marginLeft: 42 }, ml43: { marginLeft: 43 }, ml44: { marginLeft: 44 }, ml45: { marginLeft: 45 },
      ml46: { marginLeft: 46 }, ml47: { marginLeft: 47 }, ml48: { marginLeft: 48 }, ml49: { marginLeft: 49 }, ml50: { marginLeft: 50 }
    },
    mr: {
      mr1: { marginRight: 1 }, mr2: { marginRight: 2 }, mr3: { marginRight: 3 }, mr4: { marginRight: 4 }, mr5: { marginRight: 5 },
      mr6: { marginRight: 6 }, mr7: { marginRight: 7 }, mr8: { marginRight: 8 }, mr9: { marginRight: 9 }, mr10: { marginRight: 10 },
      mr11: { marginRight: 11 }, mr12: { marginRight: 12 }, mr13: { marginRight: 13 }, mr14: { marginRight: 14 }, mr15: { marginRight: 15 },
      mr16: { marginRight: 16 }, mr17: { marginRight: 17 }, mr18: { marginRight: 18 }, mr19: { marginRight: 19 }, mr20: { marginRight: 20 },
      mr21: { marginRight: 21 }, mr22: { marginRight: 22 }, mr23: { marginRight: 23 }, mr24: { marginRight: 24 }, mr25: { marginRight: 25 },
      mr26: { marginRight: 26 }, mr27: { marginRight: 27 }, mr28: { marginRight: 28 }, mr29: { marginRight: 29 }, mr30: { marginRight: 30 },
      mr31: { marginRight: 31 }, mr32: { marginRight: 32 }, mr33: { marginRight: 33 }, mr34: { marginRight: 34 }, mr35: { marginRight: 35 },
      mr36: { marginRight: 36 }, mr37: { marginRight: 37 }, mr38: { marginRight: 38 }, mr39: { marginRight: 39 }, mr40: { marginRight: 40 },
      mr41: { marginRight: 41 }, mr42: { marginRight: 42 }, mr43: { marginRight: 43 }, mr44: { marginRight: 44 }, mr45: { marginRight: 45 },
      mr46: { marginRight: 46 }, mr47: { marginRight: 47 }, mr48: { marginRight: 48 }, mr49: { marginRight: 49 }, mr50: { marginRight: 50 }
    },
    mv: {
      mv1: { marginVertical: 1 }, mv2: { marginVertical: 2 }, mv3: { marginVertical: 3 }, mv4: { marginVertical: 4 }, mv5: { marginVertical: 5 },
      mv6: { marginVertical: 6 }, mv7: { marginVertical: 7 }, mv8: { marginVertical: 8 }, mv9: { marginVertical: 9 }, mv10: { marginVertical: 10 },
      mv11: { marginVertical: 11 }, mv12: { marginVertical: 12 }, mv13: { marginVertical: 13 }, mv14: { marginVertical: 14 }, mv15: { marginVertical: 15 },
      mv16: { marginVertical: 16 }, mv17: { marginVertical: 17 }, mv18: { marginVertical: 18 }, mv19: { marginVertical: 19 }, mv20: { marginVertical: 20 },
      mv21: { marginVertical: 21 }, mv22: { marginVertical: 22 }, mv23: { marginVertical: 23 }, mv24: { marginVertical: 24 }, mv25: { marginVertical: 25 },
      mv26: { marginVertical: 26 }, mv27: { marginVertical: 27 }, mv28: { marginVertical: 28 }, mv29: { marginVertical: 29 }, mv30: { marginVertical: 30 },
      mv31: { marginVertical: 31 }, mv32: { marginVertical: 32 }, mv33: { marginVertical: 33 }, mv34: { marginVertical: 34 }, mv35: { marginVertical: 35 },
      mv36: { marginVertical: 36 }, mv37: { marginVertical: 37 }, mv38: { marginVertical: 38 }, mv39: { marginVertical: 39 }, mv40: { marginVertical: 40 },
      mv41: { marginVertical: 41 }, mv42: { marginVertical: 42 }, mv43: { marginVertical: 43 }, mv44: { marginVertical: 44 }, mv45: { marginVertical: 45 },
      mv46: { marginVertical: 46 }, mv47: { marginVertical: 47 }, mv48: { marginVertical: 48 }, mv49: { marginVertical: 49 }, mv50: { marginVertical: 50 }
    },
    mh: {
      mh1: { marginHorizontal: 1 }, mh2: { marginHorizontal: 2 }, mh3: { marginHorizontal: 3 }, mh4: { marginHorizontal: 4 }, mh5: { marginHorizontal: 5 },
      mh6: { marginHorizontal: 6 }, mh7: { marginHorizontal: 7 }, mh8: { marginHorizontal: 8 }, mh9: { marginHorizontal: 9 }, mh10: { marginHorizontal: 10 },
      mh11: { marginHorizontal: 11 }, mh12: { marginHorizontal: 12 }, mh13: { marginHorizontal: 13 }, mh14: { marginHorizontal: 14 }, mh15: { marginHorizontal: 15 },
      mh16: { marginHorizontal: 16 }, mh17: { marginHorizontal: 17 }, mh18: { marginHorizontal: 18 }, mh19: { marginHorizontal: 19 }, mh20: { marginHorizontal: 20 },
      mh21: { marginHorizontal: 21 }, mh22: { marginHorizontal: 22 }, mh23: { marginHorizontal: 23 }, mh24: { marginHorizontal: 24 }, mh25: { marginHorizontal: 25 },
      mh26: { marginHorizontal: 26 }, mh27: { marginHorizontal: 27 }, mh28: { marginHorizontal: 28 }, mh29: { marginHorizontal: 29 }, mh30: { marginHorizontal: 30 },
      mh31: { marginHorizontal: 31 }, mh32: { marginHorizontal: 32 }, mh33: { marginHorizontal: 33 }, mh34: { marginHorizontal: 34 }, mh35: { marginHorizontal: 35 },
      mh36: { marginHorizontal: 36 }, mh37: { marginHorizontal: 37 }, mh38: { marginHorizontal: 38 }, mh39: { marginHorizontal: 39 }, mh40: { marginHorizontal: 40 },
      mh41: { marginHorizontal: 41 }, mh42: { marginHorizontal: 42 }, mh43: { marginHorizontal: 43 }, mh44: { marginHorizontal: 44 }, mh45: { marginHorizontal: 45 },
      mh46: { marginHorizontal: 46 }, mh47: { marginHorizontal: 47 }, mh48: { marginHorizontal: 48 }, mh49: { marginHorizontal: 49 }, mh50: { marginHorizontal: 50 }
    },
    mb: {
      mb1: { marginBottom: 1 }, mb2: { marginBottom: 2 }, mb3: { marginBottom: 3 }, mb4: { marginBottom: 4 }, mb5: { marginBottom: 5 },
      mb6: { marginBottom: 6 }, mb7: { marginBottom: 7 }, mb8: { marginBottom: 8 }, mb9: { marginBottom: 9 }, mb10: { marginBottom: 10 },
      mb11: { marginBottom: 11 }, mb12: { marginBottom: 12 }, mb13: { marginBottom: 13 }, mb14: { marginBottom: 14 }, mb15: { marginBottom: 15 },
      mb16: { marginBottom: 16 }, mb17: { marginBottom: 17 }, mb18: { marginBottom: 18 }, mb19: { marginBottom: 19 }, mb20: { marginBottom: 20 },
      mb21: { marginBottom: 21 }, mb22: { marginBottom: 22 }, mb23: { marginBottom: 23 }, mb24: { marginBottom: 24 }, mb25: { marginBottom: 25 },
      mb26: { marginBottom: 26 }, mb27: { marginBottom: 27 }, mb28: { marginBottom: 28 }, mb29: { marginBottom: 29 }, mb30: { marginBottom: 30 },
      mb31: { marginBottom: 31 }, mb32: { marginBottom: 32 }, mb33: { marginBottom: 33 }, mb34: { marginBottom: 34 }, mb35: { marginBottom: 35 },
      mb36: { marginBottom: 36 }, mb37: { marginBottom: 37 }, mb38: { marginBottom: 38 }, mb39: { marginBottom: 39 }, mb40: { marginBottom: 40 },
      mb41: { marginBottom: 41 }, mb42: { marginBottom: 42 }, mb43: { marginBottom: 43 }, mb44: { marginBottom: 44 }, mb45: { marginBottom: 45 },
      mb46: { marginBottom: 46 }, mb47: { marginBottom: 47 }, mb48: { marginBottom: 48 }, mb49: { marginBottom: 49 }, mb50: { marginBottom: 50 }
    },
  };
  

  