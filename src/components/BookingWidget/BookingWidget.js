"use client";

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ChevronDown, Calendar, Users, Plus, Minus, Search, X } from 'lucide-react';
import styles from './BookingWidget.module.css';

export default function BookingWidget() {
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  const [activePopover, setActivePopover] = useState(null); // 'arrival', 'departure', 'guests'
  const [showMobileModal, setShowMobileModal] = useState(false);
  
  const widgetRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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

  // Prevent background scrolling when mobile modal is open
  useEffect(() => {
    if (showMobileModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showMobileModal]);

  const handleSearch = () => {
    // In a real app, this would route to a search page with URL params
    alert(`Searching availability:\\nCheck-in: ${checkIn ? format(checkIn, 'PP') : 'Any'}\\nCheck-out: ${checkOut ? format(checkOut, 'PP') : 'Any'}\\nAdults: ${guests.adults}, Children: ${guests.children}`);
    setActivePopover(null);
  };

  const updateGuests = (type, operation) => {
    setGuests(prev => {
      const current = prev[type];
      const next = operation === 'add' ? current + 1 : current - 1;
      
      // Validation
      if (type === 'adults' && next < 1) return prev;
      if (type === 'children' && next < 0) return prev;
      if (prev.adults + prev.children >= 12 && operation === 'add') return prev; // max 12 guests
      
      return { ...prev, [type]: next };
    });
  };

  return (
    <>
    <div className={styles.glassBar} ref={widgetRef}>
      {/* --- DESKTOP WIDGET --- */}
      <div className={`container ${styles.glassContainer} ${styles.desktopWidget}`}>
        
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
              <p>{guests.adults + guests.children} {guests.adults + guests.children === 1 ? 'Guest' : 'Guests'}</p>
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

      {/* --- MOBILE PILL BUTTON --- */}
      <div className={styles.mobilePillBtnContainer}>
        <button 
          type="button" 
          className={styles.mobilePillBtn} 
          onClick={() => setShowMobileModal(true)}
          onTouchEnd={(e) => { e.preventDefault(); setShowMobileModal(true); }}
        >
          <div className={styles.pillIcon}>
            <Search size={20} />
          </div>
          <div className={styles.pillText}>
            <span className={styles.pillTitle}>Where to?</span>
            <span className={styles.pillSubtitle}>
              {checkIn ? format(checkIn, 'MMM d') : 'Any week'} • {guests.adults + guests.children} guests
            </span>
          </div>
        </button>
      </div>
    </div>

      {/* --- MOBILE MODAL --- */}
      {showMobileModal && mounted && createPortal(
        <div className={styles.mobileModal}>
          <div className={styles.mobileModalHeader}>
            <button 
              type="button" 
              className={styles.closeBtn} 
              onClick={() => setShowMobileModal(false)}
              onTouchEnd={(e) => { e.preventDefault(); setShowMobileModal(false); }}
            >
              <X size={24} />
            </button>
            <h3>Search your stay</h3>
            <div style={{ width: 24 }}></div> {/* Balance for centering */}
          </div>
          
          <div className={styles.mobileModalBody}>
            <div className={styles.mobileSection}>
              <h4>When&apos;s your trip?</h4>
              <div className={styles.mobileDateInputs}>
                <div className={styles.dateInputGroup}>
                  <label>Arrival</label>
                  <input 
                    type="date" 
                    value={checkIn ? format(checkIn, 'yyyy-MM-dd') : ''} 
                    onChange={(e) => {
                      const date = new Date(e.target.value + 'T00:00:00'); // Prevent timezone shift
                      setCheckIn(date);
                      if (checkOut && date > checkOut) setCheckOut(undefined);
                    }}
                    id="mobileCheckIn"
                    className={styles.nativeDateInput}
                    min={mounted ? format(new Date(), 'yyyy-MM-dd') : undefined}
                  />
                </div>
                <div className={styles.dateInputGroup}>
                  <label>Departure</label>
                  <input 
                    type="date" 
                    value={checkOut ? format(checkOut, 'yyyy-MM-dd') : ''} 
                    onChange={(e) => setCheckOut(e.target.value ? new Date(e.target.value + 'T00:00:00') : undefined)}
                    id="mobileCheckOut"
                    className={styles.nativeDateInput}
                    min={checkIn ? format(checkIn, 'yyyy-MM-dd') : (mounted ? format(new Date(), 'yyyy-MM-dd') : undefined)}
                  />
                </div>
              </div>
            </div>

            <div className={styles.mobileSection}>
              <h4>Who&apos;s coming?</h4>
              <div className={styles.guestRow}>
                <div>
                  <h4>Adults</h4>
                  <p>Ages 13 or above</p>
                </div>
                <div className={styles.controls}>
                  <button onClick={() => updateGuests('adults', 'subtract')} disabled={guests.adults <= 1} className={styles.controlBtn}>
                    <Minus size={16} />
                  </button>
                  <span className={styles.count}>{guests.adults}</span>
                  <button onClick={() => updateGuests('adults', 'add')} className={styles.controlBtn}>
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
                  <button onClick={() => updateGuests('children', 'subtract')} disabled={guests.children <= 0} className={styles.controlBtn}>
                    <Minus size={16} />
                  </button>
                  <span className={styles.count}>{guests.children}</span>
                  <button onClick={() => updateGuests('children', 'add')} className={styles.controlBtn}>
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.mobileModalFooter}>
            <button className={styles.clearBtn} onClick={() => { setCheckIn(undefined); setCheckOut(undefined); setGuests({adults:2, children:0}); }}>
              Clear all
            </button>
            <button className={`btn-primary ${styles.mobileSearchBtn}`} onClick={handleSearch}>
              <Search size={18} /> <span>Search</span>
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
