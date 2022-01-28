import React from 'react';
import { Row, Col, Table, Button, Spinner } from 'react-bootstrap';
import moment from 'moment';
import NotedIcon from '../../../assets/icons/NoteeIcon.svg';

export default function MyCredits({ user, history, onAdd, addPickUp }) {
  return (
    <div className='mt-5' id='mycredits-container'>
      <h3 className='sofia-pro text-18 mb-3 mb-0 ml-3'>My Credits</h3>
      <div className='card shadow-sm mb-2 mt-4 max-w-840'>
        <div className='card-body'>
          {!user && !history ? (
            <Spinner
              animation='border'
              size='md'
              style={{
                color: '#570097',
                opacity: '0.6',
              }}
              className='spinner'
            />
          ) : (
            <Row>
              <Col>
                <h4>
                  Here you will find your credits and the history of your
                  top-ups.
                </h4>

                <Table responsive='sm' className='mycredits-table-1'>
                  <thead>
                    <tr>
                      <th>Amount</th>
                      <th>Pick ups</th>
                      <th>Expiry</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.length > 0 ? (
                      history.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>
                              <img src={NotedIcon} className='mr-2' />
                              {item.plan_name}
                            </td>
                            <td>0</td>
                            <td>
                              {moment(item.expiration_date).format(
                                'YYYY-MM-DD'
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr id='current_plan'>
                        <td>No active subscription</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Col>
              <Col>
                <div className='pl-3 col-2-table'>
                  <Table responsive='sm' className='mycredits-table-2'>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Pick ups</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.lenght > 0 ? (
                        history.map((item, i) => {
                          return (
                            <tr key={`tr-${i}`}>
                              <td>
                                {moment(item.created_date * 1000).format(
                                  'YYYY-MM-DD'
                                )}
                              </td>
                              <td>${item.price}</td>
                              <td>+{item.no_of_pick_ups} pickups</td>
                              <td>{item.no_of_pick_ups} pickups</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr id='current_plan'>
                          <td>No active subscription</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
                <Row className='d-flex align-items-center justify-content-end mt-3'>
                  <Button className='primary' onClick={onAdd}>
                    Add a Pickup
                  </Button>
                </Row>
              </Col>
            </Row>
          )}
        </div>
      </div>
    </div>
  );
}
