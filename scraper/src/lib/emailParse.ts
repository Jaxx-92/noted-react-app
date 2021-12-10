import * as log from './logger';
import { VENDOR_CODES } from '../constants';
import {
  Abercrombie,
  Adidas,
  Aerie,
  BedBathBeyond,
  Belk,
  BrooksBrothers,
  CalvinKlein,
  Carters,
  Chicos,
  Converse,
  Express,
  FashionNova,
  FinishLine,
  FootLocker,
  FreePeople,
  GAP,
  Gymboree,
  HM,
  JCPenney,
  JCrew,
  Journeys,
  kMccarthy,
  Kohls,
  LaneBryant,
  Levi,
  Lululemon,
  Macys,
  Nordstrom,
  NordstromRack,
  NorthFace,
  OldNavy,
  ShoeCarnival,
  Skechers,
  Soma,
  SteveMadden,
  Talbots,
  Target,
  TJMaxx,
  UnderArmour,
  VictoriaSecret,
  Walmart,
  WhiteHouse,
  Zara,
  Vans,
  Lush,
  MacCosmetics,
  LuckyBrand,
  MichaelKors,
  Dillards,
  AltardState,
  AnnTaylor,
  Athleta,
  Aveda,
  BrightonCollectibles,
  Coach,
  Forever21,
  Gucci,
  Burberry,
  Claires
} from './vendors';
import { OrderData, IEmailPayload } from '../models';

const parse = async (code: string, payload: IEmailPayload): Promise<OrderData | undefined> => {
  try {
    let orderData: OrderData | undefined;

    switch (code) {
      case VENDOR_CODES.NORDSTROM:
        orderData = await Nordstrom.parse(code, payload);
        break;
      case VENDOR_CODES.LULULEMON:
        orderData = await Lululemon.parse(code, payload);
        break;
      case VENDOR_CODES.ABERCROMBIE:
        orderData = await Abercrombie.parse(code, payload);
        break;
      case VENDOR_CODES.ADIDAS:
        orderData = await Adidas.parse(code, payload);
        break;
      case VENDOR_CODES.AERIE:
        orderData = await Aerie.parse(code, payload);
        break;
      case VENDOR_CODES.BEDBATHBEYOND:
        orderData = await BedBathBeyond.parse(code, payload);
        break;
      case VENDOR_CODES.BELK:
        orderData = await Belk.parse(code, payload);
        break;
      case VENDOR_CODES.BROOKSBROTHERS:
        orderData = await BrooksBrothers.parse(code, payload);
        break;
      case VENDOR_CODES.CALVINKLEIN:
        orderData = await CalvinKlein.parse(code, payload);
        break;
      case VENDOR_CODES.CARTERS:
        orderData = await Carters.parse(code, payload);
        break;
      case VENDOR_CODES.CHICOS:
        orderData = await Chicos.parse(code, payload);
        break;
      case VENDOR_CODES.CONVERSE:
        orderData = await Converse.parse(code, payload);
        break;
      case VENDOR_CODES.EXPRESS:
        orderData = await Express.parse(code, payload);
        break;
      case VENDOR_CODES.FASHIONNOVA:
        orderData = await FashionNova.parse(code, payload);
        break;
      case VENDOR_CODES.FINISHLINE:
        orderData = await FinishLine.parse(code, payload);
        break;
      case VENDOR_CODES.FOOTLOCKER:
        orderData = await FootLocker.parse(code, payload);
        break;
      case VENDOR_CODES.FREEPEOPLE:
        orderData = await FreePeople.parse(code, payload);
        break;
      case VENDOR_CODES.GAP:
        orderData = await GAP.parse(code, payload);
        break;
      case VENDOR_CODES.GYMBOREE:
        orderData = await Gymboree.parse(code, payload);
        break;
      case VENDOR_CODES.HM:
        orderData = await HM.parse(code, payload);
        break;
      case VENDOR_CODES.JCPENNEY:
        orderData = await JCPenney.parse(code, payload);
        break;
      case VENDOR_CODES.JCREW:
        orderData = await JCrew.parse(code, payload);
        break;
      case VENDOR_CODES.JOURNEYS:
        orderData = await Journeys.parse(code, payload);
        break;
      case VENDOR_CODES.KMCCARTHY:
        orderData = await kMccarthy.parse(code, payload);
        break;
      case VENDOR_CODES.KOHLS:
        orderData = await Kohls.parse(code, payload);
        break;
      case VENDOR_CODES.LANEBRYANT:
        orderData = await LaneBryant.parse(code, payload);
        break;
      case VENDOR_CODES.LEVI:
        orderData = await Levi.parse(code, payload);
        break;
      case VENDOR_CODES.MACYS:
        orderData = await Macys.parse(code, payload);
        break;
      case VENDOR_CODES.NORDSTROMRACK:
        orderData = await NordstromRack.parse(code, payload);
        break;
      case VENDOR_CODES.NORTHFACE:
        orderData = await NorthFace.parse(code, payload);
        break;
      case VENDOR_CODES.OLDNAVY:
        orderData = await OldNavy.parse(code, payload);
        break;
      case VENDOR_CODES.SHOECARNIVAL:
        orderData = await ShoeCarnival.parse(code, payload);
        break;
      case VENDOR_CODES.SKECHERS:
        orderData = await Skechers.parse(code, payload);
        break;
      case VENDOR_CODES.SOMA:
        orderData = await Soma.parse(code, payload);
        break;
      case VENDOR_CODES.STEVEMADDEN:
        orderData = await SteveMadden.parse(code, payload);
        break;
      case VENDOR_CODES.TALBOTS:
        orderData = await Talbots.parse(code, payload);
        break;
      case VENDOR_CODES.TARGET:
        orderData = await Target.parse(code, payload);
        break;
      case VENDOR_CODES.TJMAXX:
        orderData = await TJMaxx.parse(code, payload);
        break;
      case VENDOR_CODES.UNDERARMOUR:
        orderData = await UnderArmour.parse(code, payload);
        break;
      case VENDOR_CODES.VICTORIASECRET:
        orderData = await VictoriaSecret.parse(code, payload);
        break;
      case VENDOR_CODES.WALMART:
        orderData = await Walmart.parse(code, payload);
        break;
      case VENDOR_CODES.WHITEHOUSE:
        orderData = await WhiteHouse.parse(code, payload);
        break;
      case VENDOR_CODES.ZARA:
        orderData = await Zara.parse(code, payload);
        break;
      case VENDOR_CODES.VANS:
        orderData = await Vans.parse(code, payload);
        break;
      case VENDOR_CODES.LUSH:
        orderData = await Lush.parse(code, payload);
        break;
      case VENDOR_CODES.MACCOSMETICS:
        orderData = await MacCosmetics.parse(code, payload);
        break;
      case VENDOR_CODES.LUCKYBRAND:
        orderData = await LuckyBrand.parse(code, payload);
        break;
      case VENDOR_CODES.MICHAELKORS:
        orderData = await MichaelKors.parse(code, payload);
        break;
      case VENDOR_CODES.DILLARDS:
        orderData = await Dillards.parse(code, payload);
        break;
      case VENDOR_CODES.ALTARDSTATE:
        orderData = await AltardState.parse(code, payload);
        break;
      case VENDOR_CODES.ANNTAYLOR:
        orderData = await AnnTaylor.parse(code, payload);
        break;
      case VENDOR_CODES.ATHLETA:
        orderData = await Athleta.parse(code, payload);
        break;
      case VENDOR_CODES.AVEDA:
        orderData = await Aveda.parse(code, payload);
        break;
      case VENDOR_CODES.BRIGHTONCOLLECTIBLES:
        orderData = await BrightonCollectibles.parse(code, payload);
        break;
      case VENDOR_CODES.COACH:
        orderData = await Coach.parse(code, payload);
        break;
      case VENDOR_CODES.FOREVER21:
        orderData = await Forever21.parse(code, payload);
        break;
      case VENDOR_CODES.GUCCI:
        orderData = await Gucci.parse(code, payload);
        break;
      case VENDOR_CODES.BURBERRY:
        orderData = await Burberry.parse(code, payload);
        break;
      case VENDOR_CODES.CLAIRES:
        orderData = await Claires.parse(code, payload);
        break;
      default:
        break;
    }

    return orderData;
  } catch (error) {
    log.info({
      message: error.message,
      code
    });
  }
};

export default parse;
