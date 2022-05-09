import {StyleSheet, Dimensions} from 'react-native';
import uuid from 'react-native-uuid';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('screen').height;

const date = new Date();
const DeviceIp = '192.168.1.' + Math.floor(Math.random() * 99) + 1; // default
const DeviceId = uuid.v4();

export const global = StyleSheet.create({
  //------- CommonStyles -------///\\

  Dimensionheight: windowHeight,
  Dimensionwidth: windowWidth,

  commonBg: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    height: '100%',
  },
  headBackarrow: {width: 20, height: 20},

  appColor: {color: '#144692'},
  appBgcolor: {backgroundColor: '#144692'},

  boxHead: {backgroundColor: '#144692', padding: 15},

  activeTextmd: {fontSize: 16, color: '#144692', fontWeight: '600'},
  inactiveTextmd: {fontSize: 16, color: 'red', fontWeight: '600'},

  commonText: {
    fontSize: 15,
    color: '#5C6677',
    fontFamily: 'Helvetica',
  },
  commonTextblack: {
    fontSize: 15,
    color: '#000',
    fontFamily: 'Helvetica',
  },
  tabTextblack: {
    fontSize: 13,
    color: '#000',
    fontFamily: 'Helvetica',
  },
  bigOtext_1: {fontSize: 30},

  bigOtext_2: {fontSize: 22},

  bigOtext: {fontSize: 30},

  commonTextblue: {
    fontSize: windowWidth > 480 ? 16 : 15,
    color: '#144693',
    fontFamily: 'Helvetica',
  },

  commonTextwhite: {
    fontSize: windowWidth > 480 ? 16 : 15,
    color: '#fff',
    fontFamily: 'Helvetica',
  },
  commonTextwhiteH1: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Helvetica',
  },

  tableHead: {
    backgroundColor: '#F1F6FA',
    padding: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E7E7',
  },
  

  tableBody: {
    padding: windowWidth > 480 ? 15 : 11,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E7E7',
  },
  themeBordercolor: {borderColor: '#144693', borderWidth: 1},

  commonModalbg: {
    backgroundColor: '#00000075',
    width: '100%',
    height: '100%',
    padding: 3,
  },
  commonModalbg90: {
    backgroundColor: '#00000075',
    width: '90%',
    height: '100%',
    padding: 3,
  },
  COLOR_BLUE: {color: '#144693'},
  COLOR_BLACK: {color: '#000'},
  COLOR_NORMAL: {color: '#5C6677'},
  COLOR_WHITE: {color: '#fff'},
  COLOR_RED: {color: 'red'},

  commonTextH1: {
    fontSize: windowWidth > 480 ? 17 : 16,
    color: '#5C6677',
    fontFamily: 'Helvetica',
  },
  commonTextblackH1: {
    fontSize: windowWidth > 480 ? 17 : 16,
    color: '#000',
    fontFamily: 'Helvetica',
  },
  commonTextblueH1: {
    fontSize: windowWidth > 480 ? 17 : 16,
    color: '#144693',
    fontFamily: 'Helvetica',
  },

  H1: {fontSize: 18},

  innerSecwhitebg: {paddingHorizontal: 15, flex: 1},

  flexRowsec: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  flexLine: {
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#DADADA',
  },

  customerDetailList: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#DADADA',
  },

  flexLinetext: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E7E7',
  },

  commonIcon: {
    width: 22,
    height: 22,
    tintColor: '#144693',
  },

  settingIcon: {
    width: 20,
    height: 20,
  },
  cashCalcicon: {width: 30, height: 30},

  commonTwocol: {
    width: '48.5%'
  },
  input: {
    width: '100%',
    fontSize: 17,
  },

  commonFlexrow_bt: {flexDirection: 'row'},
  commonFlexrow_ct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commonFlexrowa_ar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  commomMediumicon: {width: 20, height: 20, tintColor: '#144693'},

  commonWhitebg: {backgroundColor: '#fff', padding: 15},

  commonLightbg: {
    backgroundColor: '#f1f6fa6b',
    flex: 1,
  },

  commonBold: {fontFamily: 'Helvetica-Bold'},

  commonMedium: {fontFamily: 'Helvetica-Medium'},

  topSpacing: {marginTop: 15},

  bottomSpacing: {marginBottom: 15},

  colscreen3: {
    width: '70%',
  },
  commonBoxshadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2.25,

    elevation: 3,
  },

  commonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',

    borderBottomWidth: 1,
    borderBottomColor: '#DADADA',
    padding: 15,
  },

  tabHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#6a686842',
    alignItems: 'center',
  },
  commonMobileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#DADADA',
    padding: 15,
  },

  headTitle: {
    fontSize: 19,
    color: '#000',
    fontFamily: 'Helvetica',
  },
  headSvbtn: {
    color: '#144693',
    fontSize: windowWidth > 468 ? 17 : 15,
    borderRadius: 4,
  },

  inputBox: {
    backgroundColor: '#fff',
    borderWidth: 1,
    height: 45,
    borderRadius: 4,
    paddingHorizontal: 9,

    justifyContent: 'center',
    borderColor: '#b6b9bd',
    width: '100%',
  },

  qtyBox: {
    backgroundColor: '#fff',
    borderWidth: 1,
    width: windowWidth > 468 ? 130 : '100%',
    height: 40,
    borderRadius: 4,
    paddingHorizontal: 11,
    marginBottom: 11,
    justifyContent: 'center',
    borderColor: '#E7E7E7',

    marginTop: 11,
    alignItems: 'center',
    flexDirection: 'row',
  },

  commonButton: {
    backgroundColor: '#144692',
    paddingHorizontal: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    height: 46,
    flexDirection: 'row',
  },
  commmonDiasbletn: {
    backgroundColor: '#14469257',
    paddingHorizontal: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    height: 46,
    flexDirection: 'row',
  },
  innersecTitle: {fontSize: 18, color: '#144693'},

  commonWhitebtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    height: 45,
    flexDirection: 'row',
    borderColor: '#E7E7E7',
    borderWidth: 2,
  },

  borderLine: {
    borderWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderColor: '#E7E7E7',
  },
  formFlexwrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  inputLabelicon: {width: 20, height: 30},

  customCheckbox: {
    width: 25,
    height: 25,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#0652A2',
    backgroundColor: '#144693',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 11,
  },
  customCheckboxdisable: {
    width: 25,
    height: 25,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#b6b9bd',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 11,
  },
  checkBoxWrapper: {flexDirection: 'row', alignItems: 'center'},
  checkBoxflex: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 11,
  },
  flexBottomwrapper: {padding: 14, backgroundColor: '#fff'},
  transparentButton: {
    borderWidth: 1,
    paddingHorizontal: 11,
    height: 40,
    justifyContent: 'center',
    borderRadius: 4,
    alignItems: 'center',
    borderColor: '#0652A2',
    flexDirection: 'row',
    width: '100%',
  },
  btnText2: {
    fontSize: 15,
    color: '#0652A2',
    fontFamily: 'Helvetica',
  },
  btnText1: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Helvetica',
    fontWeight: '600',
  },

  appColor: {
    color: '#0652A2',
    fontSize: 14,
    fontFamily: 'Helvetica',
  },
  errorText: {
    color: '#E12727',
    fontSize: 15,
  },
  payTabmenu: {fontSize: 16, color: '#144693'},
  payTabmenuactive: {fontSize: 14, color: '#000'},

  catText_Tab: {fontSize: 15, color: '#fff', textAlign: 'center'},

  //------- CommonStyles -------///

  homeHead: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 15,
    alignItems: 'center',
    paddingTop: 10,
  },

  headerSerach: {
    flexDirection: 'row',
    backgroundColor: '#DEDFE1',
    paddingHorizontal: 7,
    height: 44,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },

  commonborder: {borderWidth: 1, borderColor: '#E7E7E7', borderRadius: 3},

  home_section: {flexDirection: 'row', flex: 1},

  home_catsec: {
    marginTop: 15,
    paddingLeft: windowWidth > 480 ? 12 : 0,
  },

  catbox: {
    backgroundColor: '#fff',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 3,
    paddingHorizontal: 5,
  },
  catboxActive: {
    backgroundColor: 'transparent',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 3,
    paddingHorizontal: 5,
  },

  catbox_Tab: {
    width: '100%',
    height: 100,
    backgroundColor: '#144693',
    marginBottom: 11,
    justifyContent: 'center',
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  catbox_TabActive: {
    width: '100%',
    height: 100,
    backgroundColor: '#DFDFDF',
    marginBottom: 11,
    justifyContent: 'center',
    paddingHorizontal: 5,
    alignItems: 'center',
  },

  catgtText2: {fontSize: 18, color: '#fff'},

  productBox: {
    backgroundColor: '#fff',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    height: windowWidth > 480 ? 160 : 180,
    overflow: 'hidden',
  },

  formSection: {
    backgroundColor: '#fff',
    flexGrow: 1,
    paddingHorizontal: 14,
    paddingVertical: 20,
  },

  listItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 7,
    borderBottomColor: '#DEDFE1',
    borderBottomWidth: 1,
  },

  cartsection: {
    width: windowWidth / 3.8,
    marginTop: 15,
    borderLeftWidth: 1,
    borderLeftColor: '#E2E2E2',
  },

  carsec1: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 13,
    paddingTop: 10,
  },

  tabHeadiconsec: {justifyContent: 'space-between', alignItems: 'center'},

  productListwrapper: {
    borderBottomWidth: 9,
    paddingBottom: 11,
    borderBottomColor: '#DEDFE1',
  },

  payIconslists: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 17,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
  },

  payIconslistsfocus: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 17,
    backgroundColor: '#F1F6FA',
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
  },

  payCardsec1: {
    borderWidth: 1,
    borderColor: '#DEDFE1',
    backgroundColor: '#fff',
    marginTop: 10,
    paddingVertical: 11,
    paddingHorizontal: 4,
  },

  cartCountbox: {
    borderWidth: 1,
    width: 120,
    height: 35,
    alignItems: 'center',
    borderColor: '#E7E7E7',
  },
  counterDec: {
    padding: 0,
    width: '33.33%',
    borderColor: '#E7E7E7',
    borderRightWidth: 2,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  counterInc: {
    padding: 0,
    width: '33.33%',
    borderColor: '#E7E7E7',
    borderLeftWidth: 2,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  smButton: {
    backgroundColor: '#144692',
    paddingHorizontal: 13,
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    maxWidth: 300,
  },

  touchPadbtn: {
    width: 80,
    backgroundColor: '#363636',
    height: 80,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  drawerMenus: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: windowWidth > 480 ? 30 : 20,
  },

  Pr_commonBox: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    backgroundColor: 'red',
  },

  tabModel: {width: windowWidth / 1.4, flex: 1},
  tabModel_typecoverhalf: {
    width: windowWidth / 2,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },

  checkBoxtick: {width: windowWidth > 480 ? 18 : 13},

  drawerMenuicon: {width: 30, height: 30, tintColor: '#fff'},

  draweruserlogo: {
    width: 60,
    height: 60,
    borderRadius: 100,
    overflow: 'hidden',
  },

  ModalBox: {width: windowWidth > 480 ? windowWidth / 2 : '100%'},

  ModalBox80: {width: windowWidth > 480 ? windowWidth / 2 : '80%'},

  paycash: {
    fontSize: windowWidth > 480 ? 30 : 20,
    textAlign: 'right',
  },

  paycasdiscount: {
    fontSize: windowWidth > 480 ? 45 : 30,
    color: 'red',
    textAlign: 'right',
    marginTop: 22,
  },
  deliveryIcon: {
    width: windowWidth > 480 ? 40 : 35,
    height: windowWidth > 480 ? 40 : 35,
    overflow: 'hidden',
    borderRadius: 8,
  },

  verticalSpacing: {marginVertical: windowWidth > 480 ? 30 : 20},

  barcodeButton: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f48c',
  },

  borderR_width: {borderRightWidth: 1, borderRightColor: '#EFEFEF'},

  reportDt: {
    alignItems: 'center',
    width: windowWidth > 468 ? windowWidth / 6.2 : windowWidth / 2.7,
    padding: 11,
    borderWidth: 1,
    justifyContent: 'center',
    marginHorizontal: 6,
    borderRadius: 5,
    borderColor: '#EFEFEF',
    height: 60,
  },

  reportActive: {
    alignItems: 'center',
    width: windowWidth > 468 ? windowWidth / 6.2 : windowWidth / 2.7,
    padding: 11,
    borderWidth: 1,
    justifyContent: 'center',
    marginHorizontal: 6,
    borderRadius: 5,
    borderColor: '#EFEFEF',
    backgroundColor: '#eee',
    height: 60,
  },

  reportTablehead: {
    width: windowWidth > 468 ? windowWidth / 4.2 : windowWidth / 2.2,
    backgroundColor: '#EFEFEF',
    padding: windowWidth > 468 ? 15 : 11,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E7E7',
  },

  reportTablebody: {
    width: windowWidth > 468 ? windowWidth / 4.2 : windowWidth / 2.2,
    padding: windowWidth > 468 ? 15 : 11,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E7E7',
  },

  chartTabhead: {
    backgroundColor: '#eee',
    borderRadius: 2,
    width: windowWidth > 468 ? windowWidth / 2.4 : ' 100%',
    padding: 4,
  },
  tabActive: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 2,
  },

  tabInactive: {paddingVertical: 6, paddingHorizontal: 6},

  barChartbox: {
    backgroundColor: '#fff',
    padding: 4,
    height: windowWidth > 468 ? windowHeight / 2.1 : windowHeight / 3,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderTopWidth: 0,
    borderRightWidth: 0,
  },

  mob_payTypeLists: {
    width: windowWidth / 3.4,
    backgroundColor: '#fff',
    height: 60,
    paddingHorizontal: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },

  mob_payTypeListsactive: {
    width: windowWidth / 3.4,
    backgroundColor: '#F1F6FA',
    height: 60,
    paddingHorizontal: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#EFEFEF',
  },

  cashbutton_head1: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 10,
    borderRightWidth: 1,
    borderColor: '#DBDBDB',
  },

  cashbutton_head2: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 10,
    borderRightWidth: 1,
    borderColor: '#DBDBDB',
  },
  cashbutton_head3: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 10,
  },

  cashCalcbody: {
    width: '25%',
    borderRightWidth: 1,
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    height: windowWidth > 468 ? 89 : 60,
    borderBottomWidth: 1,
    borderColor: '#DBDBDB',
  },

  activePin: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  statusBarline: {
    position: 'absolute',
    right: 0,
    width: 1,
    height: 107,
    backgroundColor: '#DADADA',
    top: -40,
  },

  statusBarlineInventory: {
    position: 'absolute',
    right: 0,
    width: 1,
    height: 105,
    backgroundColor: '#FF0000',
    top: -40,
  },

  tabHeadcol1: {
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 11,
  },
  tabHeadcol2: {
    width: '70%',
    paddingHorizontal: 11,
    paddingVertical: 11,
  },

  dashedLine: {
    height: 1,
    borderRadius: 2,
    width: '100%',
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: '#000',
  },

  actionButton: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    right: 0,
  },

  actionButtonq: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    right: 70,
  },
  actionButtonq2: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    right: 140,
  },
  swipeAction: {
    alignItems: 'center',
    justifyContent: 'center',

    width: 75,
    right: 0,
    height: '100%',
    flex: 0.5,
  },

  swipeDelete: {backgroundColor: 'red'},

  swipeEdit: {backgroundColor: '#000'},

  deleteBtn: {
    backgroundColor: 'red',
    right: 0,
  },

  rowBack: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingTop:4
  },

  imageBox: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },

  Checkbox: {
    width: 17,
    height: 17,
    borderWidth: 1,
    borderColor: '#DADADA',
    backgroundColor: '#144693',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Checkboxdisable: {
    width: 17,
    height: 17,
    borderWidth: 1,
    marginRight: 11,
    borderColor: '#DADADA',
  },

  formverticalSpacing: {marginVertical: 10},

  listdwwdwd: {backgroundColor: 'yellow', padding: 20},

  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 5,

    height: 150,
  },

  itemContainer1: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 5,
    height: 150,
  },

  closeIcon: {
    position: 'absolute',
    top: 14,
    left: 10,
  },

  blockView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: Dimensions.get('window').width,
    height: '100%',
    backgroundColor: '#eee',
    flexGrow: 1,
    right: 0,
  },

  colrightBorder: {borderTopLeftRadius: 0, borderBottomLeftRadius: 0},

  colleftBorder: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderWidth: 1,
    borderColor: '#b6b9bd',
  },
  iconColor: {tintColor: '#144692'},

  cartFootertext: {fontSize: windowWidth > 468 ? 18 : 16, color: '#144693'},

  modalBoxscreeen: {
    width: Dimensions.get('screen').width / 1.6,
    borderRadius: 11,
    flex: 1,
    overflow: 'hidden',
  },

  mediumModalcreeen: {
    width: Dimensions.get('screen').width / 2,
    borderRadius: 15,
    flex: 1,
    overflow: 'hidden',
  },

  tableThreecol: {
    width: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  tableFourcol: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 1,
  },

  hamBurgermenu: {width: 24, height: 24},

  commonlineWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#DADADA',
    backgroundColor: '#fff',
  },

  boxlineWrapper: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#DADADA',
    backgroundColor: '#fff',
  },
  commonhrPadding: {paddingHorizontal: 15},

  boxLists: {
    borderBottomWidth: 1,
    borderColor: '#DADADA',
    paddingVertical: 9,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  smallIcon: {width: 20, height: 20},
});
