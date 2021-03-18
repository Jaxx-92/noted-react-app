/* eslint-disable react/prop-types */
import React from 'react';

function PickUpButton({
  disabled,
  leadingText = '',
  backgroundColor: background,
  textColor: color,
  price,
  timeWindow,
  opacity,
  onClick,
}) {
  return (
    <div className='row'>
      <button
        className='btn btn-md mb-2 col-sm-12 pick-up-btn'
        disabled={disabled}
        style={{
          alignSelf: 'center',
          letterSpacing: 1,
          background,
          opacity,
        }}
        onClick={onClick}
      >
        <div className='row'>
          <div
            className='col-sm-8'
            style={{
              display: 'flex',
              justifyItems: 'center',
              alignItems: 'center',
            }}
          >
            <p
              className='mt-0 mb-0 ml-3 pick-up-btn-lead'
              style={{
                fontWeight: '500',
                fontSize: 16,
                color,
              }}
            >
              {leadingText || ''}
            </p>
          </div>
          <div className='col-sm-4 small'>
            <p
              className='mt-0 mb-0'
              style={{
                fontSize: 13,
                color,
              }}
            >
              ${price || ''}
            </p>
            {timeWindow && (
              <p
                className='mt-0 mb-0 h5'
                style={{
                  color,
                }}
              >
                {timeWindow}
              </p>
            )}
          </div>
        </div>
      </button>
    </div>
  );
}

export default PickUpButton;
