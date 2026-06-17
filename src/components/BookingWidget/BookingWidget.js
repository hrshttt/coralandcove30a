"use client";

import { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { useRouter } from 'next/navigation';
import 'react-day-picker/dist/style.css';
import { ChevronDown, Calendar, Users, Plus, Minus, X } from 'lucide-react';
import styles from './BookingWidget.module.css';

export default function BookingWidget() {
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  const [activePopover, setActivePopover] = useState(null); // 'arrival', 'departure', 'guests'
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [bookedDates, setBookedDates] = useState([]);
  
  const widgetRef = useRef(null);
  const router = useRouter();

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch OwnerRez Availability
  useEffect(() => {
    async function fetchAvailability() {
      try {
        const res = await fetch('/api/availability');
        const data = await res.json();
        if (data.success && data.bookedDates) {
          // Convert string dates to Date objects for react-day-picker
          const formattedDates = data.bookedDates.map(range => ({
            from: new Date(range.from),
            to: new Date(range.to)
          }));
          setBookedDates(formattedDates);
        }
      } catch (error) {
        console.error('Failed to fetch availability:', error);
      }
    }
    fetchAvailability();
  }, []);

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setActivePopover(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when mobile sheet is open
  useEffect(() => {
    if (mobileSheetOpen) {
      document.body.style.overflow = 'hidden';
      document.body.setAttribute('data-booking-sheet', 'open');
    } else {
      document.body.style.overflow = '';
      document.body.removeAttribute('data-booking-sheet');
    }
    return () => {
      document.body.style.overflow = '';
      document.body.removeAttribute('data-booking-sheet');
    };
  }, [mobileSheetOpen]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (checkIn) params.append('arrival', format(checkIn, 'yyyy-MM-dd'));
    if (checkOut) params.append('departure', format(checkOut, 'yyyy-MM-dd'));
    params.append('adults', guests.adults.toString());
    params.append('children', guests.children.toString());
    
    setActivePopover(null);
    setMobileSheetOpen(false);
    
    router.push(`/book?${params.toString()}`);
  };

  const updateGuests = (type, operation) => {
    setGuests(prev => {
      const current = prev[type];
      const next = operation === 'add' ? current + 1 : current - 1;
      
      if (type === 'adults' && next < 1) return prev;
      if (type === 'children' && next < 0) return prev;
      if (prev.adults + prev.children >= 12 && operation === 'add') return prev;
      
      return { ...prev, [type]: next };
    });
  };

  const totalGuests = guests.adults + guests.children;

  // Calculate disabled dates for Arrival
  // You can arrive on the same day someone else departs, so we don't disable the 'to' date.
  const disabledForArrival = [
    { before: new Date() },
    ...bookedDates.map(range => {
      const toDate = new Date(range.to);
      toDate.setDate(toDate.getDate() - 1);
      return { from: range.from, to: toDate };
    })
  ];

  // Calculate disabled dates for Departure
  // If checkIn is selected, prevent selecting a departure date AFTER the next booking starts.
  let nextBookingStart = null;
  if (checkIn) {
    for (const b of bookedDates) {
      if (b.from > checkIn) {
        if (!nextBookingStart || b.from < nextBookingStart) {
          nextBookingStart = b.from;
        }
      }
    }
  }

  const disabledForDeparture = [
    { before: checkIn || new Date() }
  ];

  if (nextBookingStart) {
    disabledForDeparture.push({ after: nextBookingStart });
  } else {
    // Fallback if checkIn isn't selected
    disabledForDeparture.push(
      ...bookedDates.map(range => {
        const fromDate = new Date(range.from);
        fromDate.setDate(fromDate.getDate() + 1);
        return { from: fromDate, to: range.to };
      })
    );
  }

  // Modifiers for visual split-cell styling
  const bookedMiddleDates = bookedDates
    .filter(range => {
      const fromDate = new Date(range.from);
      const toDate = new Date(range.to);
      return (toDate - fromDate) > 86400000; // Only if stay > 1 night
    })
    .map(range => {
      const fromDate = new Date(range.from);
      fromDate.setDate(fromDate.getDate() + 1);
      const toDate = new Date(range.to);
      toDate.setDate(toDate.getDate() - 1);
      return { from: fromDate, to: toDate };
    });

  const checkinDates = bookedDates.map(range => new Date(range.from));
  const checkoutDates = bookedDates.map(range => new Date(range.to));

  const modifiers = {
    bookedMiddle: bookedMiddleDates,
    checkinDay: checkinDates,
    checkoutDay: checkoutDates,
  };

  const modifiersClassNames = {
    bookedMiddle: styles.bookedMiddle,
    checkinDay: styles.checkinDay,
    checkoutDay: styles.checkoutDay,
  };

  // ──── MOBILE: Single CTA button + full-screen bottom sheet ────
  if (isMobile) {
    return (
      <>
        {/* The single collapsed button */}
        <div className={styles.mobileCta}>
          <button 
            className={`btn-primary ${styles.mobileCtaBtn}`}
            onClick={() => setMobileSheetOpen(true)}
          >
            <Calendar size={18} />
            <span>Check Availability</span>
          </button>
        </div>

        {/* Full-screen bottom sheet */}
        {mobileSheetOpen && (
          <div className={styles.sheetOverlay} onClick={() => { setMobileSheetOpen(false); setActivePopover(null); }}>
            <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
              <div className={styles.sheetHeader}>
                <h3 className={styles.sheetTitle}>Plan Your Stay</h3>
                <button className={styles.sheetClose} onClick={() => { setMobileSheetOpen(false); setActivePopover(null); }}>
                  <X size={22} />
                </button>
              </div>

              <div className={styles.sheetBody}>
                {/* Arrival */}
                <div className={styles.sheetField}>
                  <label className={styles.sheetLabel}>Arrival</label>
                  <button 
                    className={styles.sheetInput}
                    onClick={() => setActivePopover(activePopover === 'arrival' ? null : 'arrival')}
                  >
                    <span>{checkIn ? format(checkIn, 'MMM d, yyyy') : 'Select date'}</span>
                    <Calendar size={18} />
                  </button>
                  {activePopover === 'arrival' && (
                    <div className={styles.sheetCalendar}>
                      <DayPicker
                        mode="single"
                        selected={checkIn}
                        onSelect={(date) => {
                          setCheckIn(date);
                          setActivePopover('departure');
                          if (checkOut && date > checkOut) setCheckOut(undefined);
                        }}
                        disabled={disabledForArrival}
                        modifiers={modifiers}
                        modifiersClassNames={modifiersClassNames}
                        className={styles.calendar}
                      />
                    </div>
                  )}
                </div>

                {/* Departure */}
                <div className={styles.sheetField}>
                  <label className={styles.sheetLabel}>Departure</label>
                  <button 
                    className={styles.sheetInput}
                    onClick={() => setActivePopover(activePopover === 'departure' ? null : 'departure')}
                  >
                    <span>{checkOut ? format(checkOut, 'MMM d, yyyy') : 'Select date'}</span>
                    <Calendar size={18} />
                  </button>
                  {activePopover === 'departure' && (
                    <div className={styles.sheetCalendar}>
                      <DayPicker
                        mode="single"
                        selected={checkOut}
                        onSelect={(date) => {
                          setCheckOut(date);
                          setActivePopover('guests');
                        }}
                        disabled={disabledForDeparture}
                        modifiers={modifiers}
                        modifiersClassNames={modifiersClassNames}
                        className={styles.calendar}
                      />
                    </div>
                  )}
                </div>

                {/* Guests */}
                <div className={styles.sheetField}>
                  <label className={styles.sheetLabel}>Guests</label>
                  <div className={styles.sheetGuestSection}>
                    <div className={styles.guestRow}>
                      <div>
                        <h4>Adults</h4>
                        <p>Ages 13 or above</p>
                      </div>
                      <div className={styles.controls}>
                        <button 
                          onClick={() => updateGuests('adults', 'subtract')}
                          disabled={guests.adults <= 1}
                          className={styles.controlBtn}
                        >
                          <Minus size={16} />
                        </button>
                        <span className={styles.count}>{guests.adults}</span>
                        <button 
                          onClick={() => updateGuests('adults', 'add')}
                          className={styles.controlBtn}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <div className={styles.guestRow}>
                      <div>
                        <h4>Children</h4>
                        <p>Ages 0-12</p>
                      </div>
                      <div className={styles.controls}>
                        <button 
                          onClick={() => updateGuests('children', 'subtract')}
                          disabled={guests.children <= 0}
                          className={styles.controlBtn}
                        >
                          <Minus size={16} />
                        </button>
                        <span className={styles.count}>{guests.children}</span>
                        <button 
                          onClick={() => updateGuests('children', 'add')}
                          className={styles.controlBtn}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.sheetFooter}>
                <button className={`btn-primary ${styles.sheetSearchBtn}`} onClick={handleSearch}>
                  <span>Check Availability</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // ──── DESKTOP: Original glass bar layout ────
  return (
    <div className={styles.glassBar} ref={widgetRef}>
      <div className={`container ${styles.glassContainer}`}>
        
        {/* ARRIVAL */}
        <div className={styles.glassItem}>
          <button 
            className={styles.triggerBtn} 
            onClick={() => setActivePopover(activePopover === 'arrival' ? null : 'arrival')}
          >
            <div className={styles.triggerContent}>
              <span>Arrival</span>
              <p>{checkIn ? format(checkIn, 'MMM d, yyyy') : 'Select Date'}</p>
            </div>
            <Calendar size={18} className={styles.icon} />
          </button>
          
          {activePopover === 'arrival' && (
            <div className={styles.popover}>
              <DayPicker
                mode="single"
                selected={checkIn}
                onSelect={(date) => {
                  setCheckIn(date);
                  setActivePopover('departure');
                  if (checkOut && date > checkOut) setCheckOut(undefined);
                }}
                disabled={disabledForArrival}
                modifiers={modifiers}
                modifiersClassNames={modifiersClassNames}
                className={styles.calendar}
              />
            </div>
          )}
        </div>

        {/* DEPARTURE */}
        <div className={styles.glassItem}>
          <button 
            className={styles.triggerBtn} 
            onClick={() => setActivePopover(activePopover === 'departure' ? null : 'departure')}
          >
            <div className={styles.triggerContent}>
              <span>Departure</span>
              <p>{checkOut ? format(checkOut, 'MMM d, yyyy') : 'Select Date'}</p>
            </div>
            <Calendar size={18} className={styles.icon} />
          </button>

          {activePopover === 'departure' && (
            <div className={styles.popover}>
              <DayPicker
                mode="single"
                selected={checkOut}
                onSelect={(date) => {
                  setCheckOut(date);
                  setActivePopover(null);
                }}
                disabled={disabledForDeparture}
                modifiers={modifiers}
                modifiersClassNames={modifiersClassNames}
                className={styles.calendar}
              />
            </div>
          )}
        </div>

        {/* GUESTS */}
        <div className={styles.glassItem}>
          <button 
            className={styles.triggerBtn} 
            onClick={() => setActivePopover(activePopover === 'guests' ? null : 'guests')}
          >
            <div className={styles.triggerContent}>
              <span>Guests</span>
              <p>{totalGuests} {totalGuests === 1 ? 'Guest' : 'Guests'}</p>
            </div>
            <Users size={18} className={styles.icon} />
          </button>

          {activePopover === 'guests' && (
            <div className={`${styles.popover} ${styles.guestsPopover}`}>
              <div className={styles.guestRow}>
                <div>
                  <h4>Adults</h4>
                  <p>Ages 13 or above</p>
                </div>
                <div className={styles.controls}>
                  <button 
                    onClick={() => updateGuests('adults', 'subtract')}
                    disabled={guests.adults <= 1}
                    className={styles.controlBtn}
                  >
                    <Minus size={16} />
                  </button>
                  <span className={styles.count}>{guests.adults}</span>
                  <button 
                    onClick={() => updateGuests('adults', 'add')}
                    className={styles.controlBtn}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className={styles.guestRow}>
                <div>
                  <h4>Children</h4>
                  <p>Ages 0-12</p>
                </div>
                <div className={styles.controls}>
                  <button 
                    onClick={() => updateGuests('children', 'subtract')}
                    disabled={guests.children <= 0}
                    className={styles.controlBtn}
                  >
                    <Minus size={16} />
                  </button>
                  <span className={styles.count}>{guests.children}</span>
                  <button 
                    onClick={() => updateGuests('children', 'add')}
                    className={styles.controlBtn}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <button className={`btn-primary ${styles.searchBtn}`} onClick={handleSearch}>
          <span>Check Availability</span>
        </button>
      </div>
    </div>
  );
}
