const paths = {
 Home: <><path d="m3 11 9-8 9 8M5 10v11h14V10"/><path d="M9 21v-7h6v7"/></>,
 Kitchen: <><path d="M4 3v6q0 3 3 3t3-3V3M7 3v18M20 3q-6 3-5 10h5M20 3v18"/></>,
 Bathroom: <><path d="M3 12h18v3a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6ZM6 12V5a3 3 0 0 1 6 0M8 7h6M6 21v1M18 21v1"/></>,
 Bedroom: <><path d="M20 15A9 9 0 0 1 9 3a9 9 0 1 0 11 12Z"/><path d="m17 3 1 3 3 1-3 1-1 3-1-3-3-1 3-1Z"/></>,
 Games: <><path d="M7 7h10q3 0 4 5l1 5q0 5-4 2l-3-3H9l-3 3q-4 3-4-2l1-5q1-5 4-5Z"/><path d="M6 12h5M8.5 9.5v5M16 11h.1M18 14h.1"/></>,
 'Dress Up': <><path d="M12 5q-1-5 3-3t-1 6L3 17q-2 3 2 3h14q4 0 2-3L12 9"/></>,
 Outside: <><circle cx="12" cy="9" r="4"/><path d="M12 1v2M12 15v2M4 9H2M22 9h-2M5 2l2 2M17 4l2-2M5 16l2-2M17 14l2 2M3 22q9-6 18 0"/></>,
}
export function RoomIcon({name}) {return <svg className="room-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.Home}</svg>}
