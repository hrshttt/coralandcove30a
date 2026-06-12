"use client";

import { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ChevronDown, Calendar, Users, Plus, Minus } from 'lucide-react';
import styles from './BookingWidget.module.css';

export default function BookingWidget() {
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [guests, setGuests] = useState({ adults: 2, children: 0 });
  const [activePopover, setActivePopover] = useState(null); // 'arrival', 'departure', 'guests'
  
  const widgetRef = useRef(null);

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
    </div>
  );
}
