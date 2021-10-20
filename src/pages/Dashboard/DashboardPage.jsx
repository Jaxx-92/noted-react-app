import { get, isEmpty } from 'lodash';
import React, { useEffect, useState, useRef } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ReturnCategory from '../../components/Product/ReturnCategory';
import RightCard from './components/RightCard';
import { getUserId, getUser } from '../../api/auth';
import { getOrders } from '../../api/orderApi';
import {
  LAST_CALL,
  NOT_ELIGIBLE,
  RETURNABLE,
  DONATE,
} from '../../constants/actions/runtime';
import AddProductModal from '../../modals/AddProductModal';
import ScheduledCard from './components/ScheduledCard';
import Scanning from './components/Scanning';
import { scrollToTop } from '../../utils/window';
import { showError, showSuccess } from '../../library/notifications.library';
import { AlertCircle, CheckCircle } from 'react-feather';
import ReturnValueInfoIcon from '../../components/ReturnValueInfoIcon';
import { resetAuthorizeNewEmail } from '../../utils/data';
import { NORMAL, SCRAPEOLDER } from '../../constants/scraper';
import InitialScanModal from '../../modals/initialScanModal';
import PickUpLeftModal from '../../modals/PickUpLeftModal';
import { setIsNewlySignedUp } from '../../actions/auth.action';

export default function DashboardPage({ triggerScanNow }) {
  const [search, setSearch] = useState('');
  const [refreshCategory, setRefreshCategory] = useState({
    LAST_CALL: () => {},
    NOT_ELIGIBLE: () => {},
    RETURNABLE: () => {},
    DONATE: () => {},
  });
  const isNewlySignedUp = useSelector((state) => state.auth.isNewlySignedUp);

  const { search: searchSession } = useSelector(
    ({ runtime: { search }, auth: { scheduledReturns } }) => ({
      search,
      scheduledReturns,
    })
  );

  const [loading, setLoading] = useState(true);
  const [showScanning, setShowScanning] = useState(false);
  const [user, setUser] = useState('');
  const [userId, setUserId] = useState('');
  const [showScanOlderButton, setShowScanOlderButton] = useState(false);
  const [modalProductShow, setModalProductShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [orders, setOrders] = useState([]);
  const [fetchingOrders, setFetchingOrders] = useState(false);
  const addManualRef = useRef(null);
  const [showInitialScanModal, setShowInitialScanModal] = useState(false);
  const dispatch = useDispatch();

  /**HANDLE CATEGORY REFRESH */
  const handleRefreshCategory = (method, category) => {
    if (category === 'LAST_CALL,NOT_ELIGIBLE') {
      setRefreshCategory((refreshCategory) => ({
        ...refreshCategory,
        LAST_CALL: method,
      }));
    } else {
      setRefreshCategory((refreshCategory) => ({
        ...refreshCategory,
        [`${category}`]: method,
      }));
    }
  };

  const getScheduledOrders = async () => {
    try {
      setFetchingOrders(true);
      const userId = await getUserId();
      const res = await getOrders(userId, 'active');

      setFetchingOrders(false);
      setOrders(res.orders);
      // console.log(res.orders);
    } catch (error) {
      setFetchingOrders(false);
    }
  };

  useEffect(() => {
    // console.log({
    //   searchSession,
    // });
    setSearch(searchSession.trim());
  }, [searchSession]);

  useEffect(() => {
    // empty orders
    if (orders.length === 0) {
      getScheduledOrders();
    }
  }, []);

  async function loadScans() {
    // dispatch(clearSearchQuery());
    try {
      setLoading(true);
      const userId = await getUserId();

      setUserId(userId);
      setLoading(false);
      setTimeout(() => {
        setShowInitialScanModal(true);
      }, 5000);
    } catch (error) {
      showError({
        message: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <AlertCircle />
            <h4 className='ml-3 mb-0' style={{ lineHeight: '16px' }}>
              Error! Failed to load products!
            </h4>
          </div>
        ),
      });
      setLoading(false);
    }
  }

  const scanOlderRequest = async () => {
    setShowScanOlderButton(false);
    triggerScanNow(SCRAPEOLDER);
  };

  const checkForJustAuthorizedMail = () => {
    const isMailJustAuthorized =
      localStorage.getItem('authorizeNewEmail') === 'true' || false;
    if (isMailJustAuthorized) {
      showSuccess({
        message: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CheckCircle />
            <h4 className='ml-3 mb-0' style={{ lineHeight: '16px' }}>
              Successfully added an email! Please wait a few minutes to show
              your returns on the dashboard
            </h4>
          </div>
        ),
      });
      resetAuthorizeNewEmail();
    }
  };

  useEffect(() => {
    scrollToTop();
    loadScans();
    checkForJustAuthorizedMail();
  }, []);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 991);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    function handleResize() {
      setIsTablet(window.innerWidth >= 541 && window.innerWidth <= 767);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    (async () => {
      // await updateUserAttributes({ 'custom:scan_older_done': '0' }); // don't delete: helps to bring back 'Scan for older items' button if not-commented
      const user = await getUser();
      setUser(user);
      setShowScanOlderButton(user['custom:scan_older_done'] === '0');
    })();
  }, []);

  const beyond90days = get(user, 'custom:scan_older_done', '0') === '1';

  // SCROLL TO
  const executeScroll = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setShowInitialScanModal(false);
    dispatch(setIsNewlySignedUp(false));

    setTimeout(() => {
      setModalProductShow(true);
    }, 1200);
  };

  const onHide = () => {
    setShowInitialScanModal(false);
    dispatch(setIsNewlySignedUp(false));
  };

  return (
    <div id='DashboardPage'>
      <div className='container mt-6 main-mobile-dashboard'>
        <div className='row sched-row'>
          {/* If there are in progress orders */}
          {!isEmpty(orders) && (
            <ScheduledCard fetchingOrders={fetchingOrders} />
          )}
        </div>
        <div className='row ipad-row'>
          <div className={`mt-4 w-840 bottom ${isTablet ? 'col' : 'col-sm-9'}`}>
            {(loading || showScanning) && (
              <>
                <h3 className={`sofia-pro text-16 ${isMobile ? 'ml-3' : ''}`}>
                  Your online purchases - Last 90 Days
                </h3>
                <div
                  className={`card shadow-sm scanned-item-card mb-2 p-5 spinner-container ${
                    isMobile ? 'ml-3 mr-3' : ''
                  }`}
                >
                  {showScanning && <Scanning />}
                  {loading && (
                    <div>
                      <Spinner
                        className='dashboard-spinner'
                        animation='border'
                      />
                    </div>
                  )}
                </div>
              </>
            )}

            <PickUpLeftModal show={true} />

            <InitialScanModal
              show={showInitialScanModal && isNewlySignedUp}
              onHide={onHide}
              onButtonClick={() => executeScroll(addManualRef)}
            />

            {/*CONTAINS ALL SCANS LEFT CARD OF DASHBOARD PAGE*/}
            {!loading && !showScanning && (
              <>
                {isEmpty(search) && (
                  <h3 className='sofia-pro mt-0 ml-3 text-18 text-list'>
                    Your online purchases - Last 90 Days
                    {beyond90days ? ' & beyond' : ''}
                  </h3>
                )}
                {!isEmpty(search) && (
                  <h3 className='sofia-pro mt-0 ml-3 text-18 text-list'>
                    Search Results
                  </h3>
                )}
                {isEmpty(search) && (
                  <>
                    <div>
                      <ReturnCategory
                        typeTitle='Last Call!'
                        userId={userId}
                        size={5}
                        category={`${LAST_CALL},${NOT_ELIGIBLE}`}
                        refreshCategory={refreshCategory}
                        handleRefreshCategory={handleRefreshCategory}
                      />
                    </div>
                    <div className='mt-4 returnable-items'>
                      <ReturnCategory
                        typeTitle='Returnable Items'
                        userId={userId}
                        size={5}
                        category={RETURNABLE}
                        refreshCategory={refreshCategory}
                        handleRefreshCategory={handleRefreshCategory}
                      />
                    </div>
                    <div>
                      <p className='line-break'>
                        <span></span>
                      </p>
                    </div>
                    <div className='mt-4' unselectable='one'>
                      <ReturnCategory
                        typeTitle='Donate'
                        userId={userId}
                        size={5}
                        category={DONATE}
                        refreshCategory={refreshCategory}
                        handleRefreshCategory={handleRefreshCategory}
                      />
                    </div>
                    <div>
                      <p className='line-break'>
                        <span></span>
                      </p>
                    </div>
                  </>
                )}

                {!isEmpty(search) && (
                  <div>
                    <ReturnCategory
                      typeTitle='Select all'
                      userId={userId}
                      size={5}
                      search={search}
                    />
                  </div>
                )}

                {isEmpty(search) && (
                  <div>
                    <div className='row justify-center mt-3 mobile-footer-row mt-5'>
                      <div className='col-sm-6 text-center'>
                        <div className='text-muted text-center text-cant-find sofia-pro'>
                          Can’t find one?
                          <button
                            className='btn btn-add-product mr-1'
                            onClick={() => setModalProductShow(true)}
                            disabled={false}
                            style={{
                              padding: '0px',
                            }}
                            ref={addManualRef}
                          >
                            <h4 className='mb-0 noted-purple sofia-pro line-height-16 text-add'>
                              &nbsp; Add it manually
                            </h4>
                          </button>
                          <ReturnValueInfoIcon
                            content="We're still working on this"
                            iconClassname='info-icon-small'
                          />
                        </div>
                      </div>
                    </div>
                    <div className='row justify-center mt-2 mobile-footer-row'>
                      <div className='col-sm-6 text-center'>
                        <button
                          className='btn text-center noted-purple sofia-pro line-height-16 text-new-email'
                          onClick={() => triggerScanNow(NORMAL)}
                        >
                          Scan Now
                        </button>
                      </div>
                    </div>
                    <AddProductModal
                      show={modalProductShow}
                      onHide={() => setModalProductShow(false)}
                    />
                    {showScanOlderButton && (
                      <>
                        <div className='row justify-center mt-2 mobile-footer-row'>
                          <div className='col-sm-6 text-center'>
                            {loading && (
                              <Spinner
                                className='mr-3 noted-purple'
                                animation='border'
                                size='md'
                                style={{
                                  height: '1.5rem',
                                  width: '1.5rem',
                                }}
                              />
                            )}
                            <button
                              className='btn btn-footer'
                              onClick={scanOlderRequest}
                            >
                              <h4 className='text-center mb-0 noted-purple sofia-pro line-height-16 text-new-email'>
                                Scan for older items
                              </h4>
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
          {!isTablet && (
            <>
              <div className='col-sm-3 checkout-card'>
                <RightCard beyond90days={beyond90days} />
              </div>
            </>
          )}
        </div>
      </div>
      {isTablet && (
        <>
          <div className='col checkout-card'>
            <RightCard beyond90days={beyond90days} />
          </div>
        </>
      )}
    </div>
  );
}
