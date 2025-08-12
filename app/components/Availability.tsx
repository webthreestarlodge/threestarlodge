"use client";

import { useEffect, useState } from "react";
import { parseISO, isWithinInterval } from "date-fns";
import { fetchBookingsWithRooms } from "../queries/bookings";
import { rooms } from "../queries/rooms";

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

  const [toDate, setToDate] = useState<string>("");

  const [allRooms, setAllRooms] = useState<string[]>([]);

  const [availableRoomCount, setAvailableRoomCount] = useState<number | null>(
    null
  );

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchBookingsWithRooms();
      const roomsData = await rooms();
      setBookings(data);
      setAllRooms(roomsData.map((room: any) => room.title));
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

    // // Extract unique room titles from all bookings
    // const allRoomTitles = Array.from(
    //   new Set(bookings.map((b) => b.rooms.title))
    // );

    // Extract unique room titles from overlapping bookings
    const bookedRoomTitles = new Set(
      overlappingBookings.map((b) => b.rooms.title)
    );

    // Rooms not in the booked set are available
    // const availableRooms = allRoomTitles.filter(
    //   (room) => !bookedRoomTitles.has(room)
    // );

    const availableRooms = allRooms.filter(
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
          className={`mt-4 text-sm ${
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
