// "use client";
// import { format, addDays, isWithinInterval, parseISO } from "date-fns";
// import { useEffect, useState } from "react";
// import { fetchBookingsWithRooms } from "../queries/bookings";

// const NUM_DAYS = 30;

// export default function RoomCalendar() {
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     const loadData = async () => {
//       const data = await fetchBookingsWithRooms();
//       setBookings(data);
//     };
//     loadData();
//   }, []);

//   // Generate date headers (next 30 days)
//   const today = new Date();
//   const dates = Array.from({ length: NUM_DAYS }, (_, i) => addDays(today, i));

//   // Get unique rooms
//   const rooms = [...new Set(bookings.map((b) => b.rooms.title))];

//   return (
//     <div className='overflow-auto'>
//       <div className='grid grid-cols-[200px_repeat(30,minmax(40px,1fr))] border'>
//         {/* Header Row */}
//         <div className='bg-gray-100 font-bold p-2 border'>Room</div>
//         {dates.map((date) => (
//           <div
//             key={date.toISOString()}
//             className='bg-gray-100 text-sm text-center border'>
//             {format(date, "MMM d")}
//           </div>
//         ))}

//         {/* Room Rows */}
//         {rooms.map((room) => (
//           <>
//             <div key={room} className='border p-2 font-medium'>
//               {room}
//             </div>
//             {dates.map((date) => {
//               const isBooked = bookings.some(
//                 (b) =>
//                   b.rooms.title === room &&
//                   isWithinInterval(date, {
//                     start: parseISO(b.fromDate),
//                     end: parseISO(b.toDate),
//                   })
//               );
//               return (
//                 <div
//                   key={`${room}-${date.toISOString()}`}
//                   className={`h-8 border ${isBooked ? "bg-red-500" : ""}`}
//                 />
//               );
//             })}
//           </>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client"; // This tells Next.js to render this component on the client side.

import { useEffect, useState } from "react";
import {
  format,
  addDays,
  isWithinInterval,
  parseISO,
  eachDayOfInterval,
} from "date-fns"; // Utilities for date manipulation

import { fetchBookingsWithRooms } from "../queries/bookings"; // Custom query to get bookings from Sanity

// Type definition for each booking
interface Booking {
  _id: string;
  fromDate: string;
  toDate: string;
  rooms: {
    _id: string;
    title: string;
  };
}

export default function RoomCalendar() {
  // State for all fetched bookings
  const [bookings, setBookings] = useState<Booking[]>([]);

  // State for the "from" date (default is today)
  const [fromDate, setFromDate] = useState<string>(() =>
    format(new Date(), "yyyy-MM-dd")
  );

  // State for the "to" date (default is 14 days from today)
  const [toDate, setToDate] = useState<string>(() =>
    format(addDays(new Date(), 14), "yyyy-MM-dd")
  );

  // Fetch booking data from Sanity when the component mounts
  useEffect(() => {
    const loadData = async () => {
      const data: Booking[] = await fetchBookingsWithRooms();
      setBookings(data); // Save data in state
    };
    loadData();
  }, []);

  // Parse string inputs into Date objects for range generation
  const from = parseISO(fromDate);
  const to = parseISO(toDate);

  // Generate array of dates between from and to (inclusive)
  const dates = eachDayOfInterval({ start: from, end: to });

  // Get a list of unique room names from bookings
  const rooms = Array.from(new Set(bookings.map((b) => b.rooms.title)));

  return (
    <div className='space-y-4'>
      {/* ---------------- Date Picker UI ---------------- */}
      <div className='flex items-center gap-4'>
        <label className='flex flex-col text-sm'>
          From:
          <input
            type='date'
            value={fromDate}
            max={toDate} // Prevent selecting a date after the "to" date
            onChange={(e) => {
              const selected = e.target.value;
              if (selected > toDate) return; // Prevent invalid selection
              setFromDate(selected);
            }}
            className='border px-2 py-1 rounded'
          />
        </label>

        <label className='flex flex-col text-sm'>
          To:
          <input
            type='date'
            value={toDate}
            min={fromDate} // Prevent selecting a date before the "from" date
            onChange={(e) => {
              const selected = e.target.value;
              if (selected < fromDate) return;
              setToDate(selected);
            }}
            className='border px-2 py-1 rounded'
          />
        </label>
      </div>

      {/* ---------------- Calendar Grid ---------------- */}
      <div className='overflow-auto'>
        <div
          className='grid border'
          style={{
            // Create a responsive grid: 1 fixed column for room names, rest dynamic for each date
            gridTemplateColumns: `200px repeat(${dates.length}, minmax(40px, 1fr))`,
          }}>
          {/* ----------- Header Row (Dates) ----------- */}
          <div className='bg-gray-100 dark:bg-white/10 font-bold ps-4 border'>
            Room
          </div>
          {dates.map((date) => (
            <div
              key={date.toISOString()}
              className='bg-gray-100 dark:bg-white/10 text-xs text-center border'>
              {format(date, "MMM d")} {/* Format: Aug 11 */}
            </div>
          ))}

          {/* ----------- Room Rows ----------- */}
          {rooms.map((room) => (
            <div key={room} className='contents'>
              {/* Room Name Cell */}
              <div className='border ps-4 font-medium'>{room}</div>

              {/* Date Cells for the room */}
              {dates.map((date) => {
                // Check if this date is booked for this room
                const isBooked = bookings.some(
                  (b) =>
                    b.rooms.title === room &&
                    isWithinInterval(date, {
                      start: parseISO(b.fromDate),
                      end: parseISO(b.toDate),
                    })
                );

                return (
                  <div
                    key={`${room}-${date.toISOString()}`}
                    className={`h-8 border ${isBooked ? "bg-red-500/50 dark:bg-white/20" : ""}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Feature	                            Explanation
// useState	                        Manages local state for date range and bookings
// useEffect	                        Loads bookings once when component mounts
// eachDayOfInterval	                Generates the list of days to show as columns
// isWithinInterval	                Checks if a given date is within a booking's date range
// gridTemplateColumns	                Dynamic CSS grid to match the number of dates
// min / max on <input type="date">	Prevents invalid date range selection
// className="contents"	            Ensures multiple elements render inside .map() cleanly
// bg-red-500	                        Highlights booked dates visually
