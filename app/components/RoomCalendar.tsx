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

"use client";

import { useEffect, useState } from "react";
import {
  format,
  addDays,
  isWithinInterval,
  parseISO,
  eachDayOfInterval,
} from "date-fns";
import { fetchBookingsWithRooms } from "../queries/bookings";

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
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [fromDate, setFromDate] = useState<string>(() =>
    format(new Date(), "yyyy-MM-dd")
  );
  const [toDate, setToDate] = useState<string>(() =>
    format(addDays(new Date(), 14), "yyyy-MM-dd")
  );

  useEffect(() => {
    const loadData = async () => {
      const data: Booking[] = await fetchBookingsWithRooms();
      setBookings(data);
    };
    loadData();
  }, []);

  const from = parseISO(fromDate);
  const to = parseISO(toDate);

  const dates = eachDayOfInterval({ start: from, end: to });

  const rooms = Array.from(new Set(bookings.map((b) => b.rooms.title)));

  return (
    <div className='space-y-4'>
      {/* Date Range Picker */}
      <div className='flex items-center gap-4'>
        <label className='flex flex-col text-sm'>
          From:
          <input
            type='date'
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className='border px-2 py-1 rounded'
          />
        </label>
        <label className='flex flex-col text-sm'>
          To:
          <input
            type='date'
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className='border px-2 py-1 rounded'
          />
        </label>
      </div>

      {/* Calendar Grid */}
      <div className='overflow-auto'>
        <div
          className='grid border'
          style={{
            gridTemplateColumns: `200px repeat(${dates.length}, minmax(40px, 1fr))`,
          }}>
          {/* Header Row */}
          <div className='bg-gray-100 font-bold p-2 border'>Room</div>
          {dates.map((date) => (
            <div
              key={date.toISOString()}
              className='bg-gray-100 text-sm text-center border'>
              {format(date, "MMM d")}
            </div>
          ))}

          {/* Room Rows */}
          {rooms.map((room) => (
            <div key={room} className='contents'>
              <div className='border p-2 font-medium'>{room}</div>
              {dates.map((date) => {
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
                    className={`h-8 border ${isBooked ? "bg-red-500" : ""}`}
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
