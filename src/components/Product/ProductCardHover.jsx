import React, { useState, useEffect } from 'react';
import ReturnPolicyModal from '../../modals/ReturnPolicyModal';
import EditProductModal from '../../modals/EditProductModal';
import moment from 'moment';
import { get } from 'lodash';
import {
  mountProductInEdit,
  unmountProductedit,
} from '../../actions/runtime.action';
import { useDispatch } from 'react-redux';
import { RETURN_SCORES } from '../../constants/returns/scores';
import ReturnScore from './ReturnsScore';
import { useHistory } from 'react-router';
import { Col, Row } from 'react-bootstrap';
import ReturnValueInfoIcon from '../ReturnValueInfoIcon';

export default function ProductCardHover({ show, item, editproductform }) {
  const dispatch = useDispatch();
  const {
    location: { pathname },
  } = useHistory();
  const [modalPolicyShow, setModalPolicyShow] = useState(false);
  const [modalEditShow, setModalEditShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentScore, setCurrentScore] = useState(null);

  useEffect(() => {
    const vendorRating = get(item, 'vendor_data.rating', 0);
    const score = RETURN_SCORES.find(({ rating }) => vendorRating === rating);
    setCurrentScore(score);
  }, []);
  // Check if device is mobile
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 991);
    }
    handleResize(); // Run on load to set the default value
    window.addEventListener('resize', handleResize);
    // Clean up event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const { handleChange, values, setFieldValue, errors } = editproductform;

  const onEdit = async () => {
    /**
     * MOUNT PRODUCT FIRST
     */
    dispatch(unmountProductedit());
    dispatch(mountProductInEdit(item));
    setModalEditShow(true);
  };

  const inDashboard = ['/dashboard'].includes(pathname);
  const inCheckout = ['/checkout'].includes(pathname);

  const renderRating = () => {
    return (
      <Row
        className='container-3 text-left-3'
        style={{
          paddingLeft: 20,
        }}
      >
        <Col
          xs={2}
          style={{
            paddingLeft: 0,
          }}
        >
          <span className='score-container mr-2 d-flex'>
            <ReturnScore score={item.vendor_data.rating} />
          </span>
        </Col>
        <Col xs={10}>
          <Row xs={10}>
            <p className='text-14 sofia-pro line-height-16 text-score'>
              {get(currentScore, 'title', '')}
            </p>
          </Row>
          <Row xs={8}>
            <button
              className='btn-policy sofia-pro btn p-0 pt-1'
              onClick={() => setModalPolicyShow(true)}
            >
              Return policy
            </button>
          </Row>
        </Col>
      </Row>
    );
  };

  return (
    <div>
      {!isMobile && (
        <div
          id='OnHoverProductCard'
          style={{
            display: show || inCheckout ? 'block' : 'none',
          }}
        >
          {inDashboard && (
            <div className='container-1'>
              <h4 className='date text-14 sofia-pro line-height-16'>
                {moment(item.order_date).format('MMM DD, YYYY')}
              </h4>
              <div className='info-container'>
                <p className='text-wrong-info sofia-pro'>Wrong info?&nbsp;</p>
                <button
                  className='btn-hover-edit sofia-pro btn mr-1'
                  onClick={onEdit}
                >
                  Edit
                </button>
                <ReturnValueInfoIcon
                  content="We're still working on this"
                  iconClassname='info-icon-small'
                />
              </div>
            </div>
          )}
          {renderRating()}
        </div>
      )}

      <EditProductModal
        show={modalEditShow}
        onHide={() => {
          setModalEditShow(false);
        }}
        editproductform={{ handleChange, values, setFieldValue, errors }}
      />

      <ReturnPolicyModal
        item={item}
        show={modalPolicyShow}
        onHide={() => {
          setModalPolicyShow(false);
        }}
      />
    </div>
  );
}