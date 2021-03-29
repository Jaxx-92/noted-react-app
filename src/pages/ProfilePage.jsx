import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import UserInfo from '../components/Profile/UserInfo';
import Address from '../components/Profile/Address';
import Payment from '../components/Profile/Payment';
import ReturnHistory from '../components/Profile/ReturnHistory';
import { useFormik } from 'formik';
import {
  paymentAddressSchema,
  pickUpAddressSchema,
} from '../models/formSchema';
import { getUser } from '../utils/auth';

export default function ProfilePage() {
  const [showEditPayment] = useState(true);
  const [user, setUser] = useState(null);

  const {
    handleChange: handleAddressChange,
    values: addressFormValues,
  } = useFormik({
    initialValues: {
      fullName: '',
      state: '',
      zipCode: '',
      line1: '',
      line2: '',
      phoneNumber: '',
    },
    validationSchema: pickUpAddressSchema,
  });

  const {
    handleChange: handlePaymentChange,
    values: paymentFormValues,
  } = useFormik({
    initialValues: {
      fullName: '',
      cardNumber: '',
      expirationMonth: '',
      expirationYear: '',
      cvc: '',
    },
    validationSchema: paymentAddressSchema,
  });

  useEffect(() => {
    (async () => {
      const user = await getUser();
      setUser(user);
    })();
  }, []);

  return (
    <div id='Profile'>
      <div className='container mt-6'>
        {!user && 'Loading...'}
        {user && (
          <div className='row'>
            <div className='col-sm-3'>
              {/*LEFT CARD*/}
              <div className='col'>
                <UserInfo user={user} />
              </div>
            </div>
            <div className='col-sm-9'>
              <Address
                {...addressFormValues}
                handleChange={handleAddressChange}
              />
              {showEditPayment && (
                <div className='mt-5'>
                  <Payment
                    {...paymentFormValues}
                    handleChange={handlePaymentChange}
                  />
                </div>
              )}
              <ReturnHistory />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
