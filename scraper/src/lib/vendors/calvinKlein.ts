import * as moment from 'moment';
import * as accounting from 'accounting';
import { parseHtmlString, productQuantityHelper } from '../helpers';
import { decode as htmlDecode } from 'html-entities';
import { OrderData, RawProduct, IEmailPayload } from '../../models';

export default class CalvinKlein {
  static async parse(code: string, payload: IEmailPayload): Promise<OrderData> {
    const doc = parseHtmlString(payload.decodedBody);
    const [orderRef, orderDate, rawProducts] = await Promise.all([
      this.getOrderRef(doc),
      this.getOrderDate(doc),
      this.getProducts(doc)
    ]);

    if (!orderRef || !orderDate || rawProducts.length === 0 || rawProducts.find((x) => !x.name || !x.price)) {
      throw new Error(`Lacking info parsed from the email: ${JSON.stringify({ orderRef, orderDate, rawProducts })}`);
    }

    return {
      vendor: code,
      emailId: payload.id,
      orderRef,
      orderDate,
      products: rawProducts
    };
  }

  static async getOrderRef(root: Document): Promise<string | null> {
    try {
      const orderRefElement = root.querySelector(
        'html > body > table > tbody > tr > td > div > table > tbody > tr:nth-child(12) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(1)'
      );
      const orderRef = orderRefElement ? orderRefElement.textContent.split('Order #:')[1].trim() : null;
      return `${orderRef}`;
    } catch (error) {
      /* istanbul ignore next */
      return null;
    }
  }

  static async getOrderDate(root: Document): Promise<number | null> {
    try {
      const orderDateElement = root.querySelector(
        'html > body > table > tbody > tr > td > div > table > tbody > tr:nth-child(12) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(3)'
      );

      const orderDate = orderDateElement ? orderDateElement.textContent.split('Order Date:')[1].trim() : null;

      return orderDate ? moment(orderDate, 'MMMM DD, YYYY').startOf('day').valueOf() : null;
    } catch (error) {
      /* istanbul ignore next */
      return null;
    }
  }
  static async getProducts(root: Document): Promise<RawProduct[]> {
    try {
      const initialContainer = root.querySelector(
        'html > body > table > tbody > tr > td > div > table > tbody > tr:nth-child(11) > td > table > tbody'
      );

      const orderTableContainer = [];

      initialContainer.querySelectorAll('tr').forEach((item) => {
        const hasThumbnail = item
          .querySelector('td > table > tbody > tr > td > table > tbody > tr > td:nth-child(1) > img')
          ?.getAttribute('src');
        const isProduct = !!hasThumbnail && item.children.length === 1 && item.childNodes.length > 3;
        if (isProduct) {
          orderTableContainer.push(item);
        }
      });
      let products = [];

      orderTableContainer.forEach((item) => {
        const productRowElement = item;
        const productNameElement = productRowElement.querySelector(
          'td > table > tbody > tr > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td > b'
        );
        const productName = productNameElement.textContent.trim() || /* istanbul ignore next */ '';

        const productQuantityElement = productRowElement.querySelector(
          'td > table > tbody > tr > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(3) > td:nth-child(2)'
        );

        /* istanbul ignore next */
        const productQuantity = productQuantityElement.innerHTML.trim();
        const quantity = productQuantity ? parseInt(productQuantity, 10) : /* istanbul ignore next */ 1;

        const productThumbnailElement = productRowElement.querySelector(
          'td > table > tbody > tr > td > table > tbody > tr > td:nth-child(1) > img'
        );
        const productThumbnail = productThumbnailElement
          ? productThumbnailElement.getAttribute('src')
          : /* istanbul ignore next */ '';

        const productPriceElement = productRowElement.querySelector(
          'td > table > tbody > tr > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(4) > td:nth-child(2)'
        );
        const price = /* istanbul ignore next */ productPriceElement.innerHTML.trim();
        const productPrice = productPriceElement ? accounting.unformat(price) : /* istanbul ignore next */ 0;
        products = products.concat(
          productQuantityHelper({
            name: productName,
            price: productPrice,
            thumbnail: productThumbnail,
            quantity
          })
        );
      });

      return products;
    } catch (error) {
      /* istanbul ignore next */
      return [];
    }
  }
}
