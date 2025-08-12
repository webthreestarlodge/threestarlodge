// "use client";

// import { useEffect, useState } from "react";
// import { parseISO, isWithinInterval } from "date-fns";
// import { fetchBookingsWithRooms } from "../queries/bookings";

// // Booking data type
// interface Booking {
//   _id: string;
//   fromDate: string;
//   toDate: string;
//   rooms: {
//     _id: string;
//     title: string;
//   };
// }

// export default function RoomAvailabilityCheck() {
//   const [bookings, setBookings] = useState<Booking[]>([]);

//   const [fromDate, setFromDate] = useState<string>(() => {
//     const today = new Date();
//     return today.toISOString().split("T")[0]; // yyyy-mm-dd
//   });

//   const [toDate, setToDate] = useState<string>(() => {
//     const date = new Date();
//     date.setDate(date.getDate() + 1); // Tomorrow
//     return date.toISOString().split("T")[0];
//   });

//   const [isAvailable, setIsAvailable] = useState<boolean | null>(null); // null = not checked yet

//   useEffect(() => {
//     const loadData = async () => {
//       const data = await fetchBookingsWithRooms();
//       setBookings(data);
//     };
//     loadData();
//   }, []);

//   // Check if any room is available for selected date range
//   const checkAvailability = () => {
//     const from = parseISO(fromDate);
//     const to = parseISO(toDate);

//     const overlappingBookings = bookings.filter(
//       (booking) =>
//         isWithinInterval(from, {
//           start: parseISO(booking.fromDate),
//           end: parseISO(booking.toDate),
//         }) ||
//         isWithinInterval(to, {
//           start: parseISO(booking.fromDate),
//           end: parseISO(booking.toDate),
//         }) ||
//         (from <= parseISO(booking.fromDate) && to >= parseISO(booking.toDate))
//     );

//     const allRoomTitles = bookings.map((b) => b.rooms.title);
//     const bookedRoomTitles = overlappingBookings.map((b) => b.rooms.title);

//     const availableRooms = allRoomTitles.filter(
//       (room) => !bookedRoomTitles.includes(room)
//     );

//     setIsAvailable(availableRooms.length > 0);
//   };

//   return (
//     <div className='space-y-4 max-w-md mx-auto p-4'>
//       <h2 className='text-xl font-semibold text-[#897172] dark:text-[#B6A999]'>
//         Check Room Availability
//       </h2>

//       <div className='flex items-center gap-4'>
//         <label className='flex flex-col text-sm text-[#897172] dark:text-[#B6A999]'>
//           From:
//           <input
//             type='date'
//             value={fromDate}
//             max={toDate}
//             onChange={(e) => setFromDate(e.target.value)}
//             className='border px-2 py-1 rounded text-[#897172] dark:text-[#B6A999]'
//           />
//         </label>

//         <label className='flex flex-col text-sm text-[#897172] dark:text-[#B6A999]'>
//           To:
//           <input
//             type='date'
//             value={toDate}
//             min={fromDate}
//             onChange={(e) => setToDate(e.target.value)}
//             className='border px-2 py-1 rounded text-[#897172] dark:text-[#B6A999]'
//           />
//         </label>
//       </div>

//       <button
//         onClick={checkAvailability}
//         className='bg-[#897172] hover:bg-[#897172]/90 dark:bg-white/10 cursor-pointer text-white text-sm dark:text-[#B6A999] px-4 py-2 rounded'>
//         Check Availability
//       </button>

//       {isAvailable !== null && (
//         <div
//           className={`mt-4 text-lg font-medium ${
//             isAvailable ? "text-green-600" : "text-red-600"
//           }`}>
//           {isAvailable ? "✅ Rooms Available" : "❌ No Rooms Available"}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { parseISO, isWithinInterval } from "date-fns";
import { fetchBookingsWithRooms } from "../queries/bookings";

// Booking data type
interface Booking {
  _id: string;
  fromDate: string;
  toDate: string;
  rooms: {
    _id: string;
    title: string;
  };
}

export default function RoomAvailabilityCheck() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [fromDate, setFromDate] = useState<string>("");
  // const [fromDate, setFromDate] = useState<string>(() => {
  //   const today = new Date();
  //   return today.toISOString().split("T")[0];
  // });

  const [toDate, setToDate] = useState<string>("");
  // const [toDate, setToDate] = useState<string>(() => {
  //   const date = new Date();
  //   date.setDate(date.getDate() + 1);
  //   return date.toISOString().split("T")[0];
  // });

  const [availableRoomCount, setAvailableRoomCount] = useState<number | null>(
    null
  );

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchBookingsWithRooms();
      setBookings(data);
    };
    loadData();
  }, []);

  const checkAvailability = () => {
    const from = parseISO(fromDate);
    const to = parseISO(toDate);

    // Find all bookings that overlap with the selected range
    const overlappingBookings = bookings.filter(
      (booking) =>
        isWithinInterval(from, {
          start: parseISO(booking.fromDate),
          end: parseISO(booking.toDate),
        }) ||
        isWithinInterval(to, {
          start: parseISO(booking.fromDate),
          end: parseISO(booking.toDate),
        }) ||
        (from <= parseISO(booking.fromDate) && to >= parseISO(booking.toDate))
    );

    // Extract unique room titles from all bookings
    const allRoomTitles = Array.from(
      new Set(bookings.map((b) => b.rooms.title))
    );

    // Extract unique room titles from overlapping bookings
    const bookedRoomTitles = new Set(
      overlappingBookings.map((b) => b.rooms.title)
    );

    // Rooms not in the booked set are available
    const availableRooms = allRoomTitles.filter(
      (room) => !bookedRoomTitles.has(room)
    );

    // Set the number of available rooms
    setAvailableRoomCount(availableRooms.length);
  };

  return (
    <div className='space-y-4 max-w-md mx-auto'>
      <h2 className='text-xl font-semibold text-[#897172] dark:text-[#B6A999]'>
        Check Room Availability
      </h2>

      {/* Date Inputs */}
      <div className='flex items-center gap-4'>
        <label className='flex flex-col text-sm text-[#897172] dark:text-[#B6A999]'>
          From:
          <input
            type='date'
            value={fromDate}
            max={toDate}
            onChange={(e) => setFromDate(e.target.value)}
            className='border px-2 py-1 rounded text-[#897172] dark:text-[#B6A999]'
          />
        </label>

        <label className='flex flex-col text-sm text-[#897172] dark:text-[#B6A999]'>
          To:
          <input
            type='date'
            value={toDate}
            min={fromDate}
            onChange={(e) => setToDate(e.target.value)}
            className='border px-2 py-1 rounded text-[#897172] dark:text-[#B6A999]'
          />
        </label>
      </div>

      {/* Check Button */}
      <button
        onClick={checkAvailability}
        className='bg-[#897172] hover:bg-[#897172]/90 dark:bg-white/10 cursor-pointer text-white text-sm dark:text-[#B6A999] px-4 py-2 rounded'>
        Check Availability
      </button>

      {/* Result Display */}
      {availableRoomCount !== null && (
        <div
          className={`mt-4 text-lg font-medium ${
            availableRoomCount > 0 ? "text-green-600" : "text-red-600"
          }`}>
          {availableRoomCount > 0
            ? `✅ ${availableRoomCount} Room(s) Available`
            : "❌ No Rooms Available"}
        </div>
      )}
    </div>
  );
}
