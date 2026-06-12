"use client";

import { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
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
  
  const widgetRef = useRef(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileSheetOpen]);

  const handleSearch = () => {
    alert(`Searching availability:\\nCheck-in: ${checkIn ? format(checkIn, 'PP') : 'Any'}\\nCheck-out: ${checkOut ? format(checkOut, 'PP') : 'Any'}\\nAdults: ${guests.adults}, Children: ${guests.children}`);
    setActivePopover(null);
    setMobileSheetOpen(false);
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
                        disabled={{ before: new Date() }}
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
                        disabled={{ before: checkIn || new Date() }}
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
                disabled={{ before: new Date() }}
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
                disabled={{ before: checkIn || new Date() }}
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
