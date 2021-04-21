import React, { useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { isFormEmpty } from '../utils/form';
import $ from 'jquery';
import { isEmpty } from 'lodash-es';

export default function PaymentForm({
  fullName,
  cardNumber,
  expirationMonth,
  expirationYear,
  cvc,
  errors,
  handleChange,
  onDoneClick,
}) {
  const disableSubmit =
    isFormEmpty({
      fullName,
      cardNumber,
      expirationMonth,
      expirationYear,
      cvc,
    }) || !isFormEmpty({ ...errors });

  function formatCardNumber(value) {
    return value
      .replace(/[^0-9]/g, '')
      .substr(0, 16)
      .split('')
      .reduce((str, l, i) => {
        return str + (!i || i % 4 ? '' : '-') + l;
      }, '');
  }

  const renderInlineError = (error) => (
    <small className='form-text p-0 m-0 noted-red'>{error}</small>
  );

  console.log(errors);

  useEffect(() => {
    const platform = window.navigator.platform;
    const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];

    if (windowsPlatforms.indexOf(platform) !== -1) {
      // Windows 10 Chrome
      $('.btn-save').css('padding-top', '9px');
      $('.btn-save').css('padding-bottom', '9px');
    }
  }, []);

  return (
    <div>
      <div className='container mt-0'>
        <div className='row'>
          <div className='col-sm-9 mt-2'>
            <h3 className='sofia-pro text-18 mb-4'>Payment Method</h3>
            <div className='card shadow-sm mb-2 p-3 w-840'>
              <div className='card-body'>
                <Form id='PaymentForm'>
                  <Row>
                    <Col xs={6}>
                      <Form.Group>
                        <Form.Label>Cardholder Name</Form.Label>
                        <Form.Control
                          className='form-control-lg'
                          type='name'
                          name='fullName'
                          value={fullName || ''}
                          onChange={handleChange}
                        />
                        {!isEmpty(fullName) &&
                          renderInlineError(errors.fullName)}
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Expiration Date</Form.Label>
                        <div className='exp-form'>
                          <Form.Control
                            className='form-control-sm'
                            name='expirationMonth'
                            maxLength={2}
                            value={expirationMonth || ''}
                            onChange={(e) => {
                              const re = /^[0-9\b]+$/;
                              if (
                                e.target.value === '' ||
                                re.test(e.target.value)
                              ) {
                                handleChange(e);
                              }
                            }}
                          />
                          <div className='separator'>
                            <h4>&nbsp;&nbsp;/&nbsp;&nbsp;</h4>
                          </div>
                          <Form.Control
                            className='form-control-sm'
                            name='expirationYear'
                            maxLength={2}
                            value={expirationYear || ''}
                            onChange={(e) => {
                              const re = /^[0-9\b]+$/;
                              if (
                                e.target.value === '' ||
                                re.test(e.target.value)
                              ) {
                                handleChange(e);
                              }
                            }}
                          />
                        </div>
                        {!isEmpty(expirationYear) &&
                          renderInlineError(errors.expirationYear)}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={6}>
                      <Form.Group>
                        <Form.Label>Card Number</Form.Label>
                        <Form.Control
                          className='form-control-lg'
                          name='cardNumber'
                          value={formatCardNumber(cardNumber) || ''}
                          onChange={handleChange}
                          maxLength={20}
                        />
                        {!isEmpty(cardNumber) &&
                          renderInlineError(errors.cardNumber)}
                      </Form.Group>
                    </Col>
                    <Col xs={6} md={3}>
                      <Form.Group>
                        <Form.Label>CVC</Form.Label>
                        <Form.Control
                          className='form-control-sm'
                          name='cvc'
                          value={cvc || ''}
                          onChange={(e) => {
                            const re = /^[0-9\b]+$/;
                            if (
                              e.target.value === '' ||
                              re.test(e.target.value)
                            ) {
                              handleChange(e);
                            }
                          }}
                          maxLength={4}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col className='btn-container'>
                      <Button
                        disabled={disableSubmit}
                        className='btn-save'
                        type='submit'
                        onClick={onDoneClick}
                      >
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
