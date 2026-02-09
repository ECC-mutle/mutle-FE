import { useState } from 'react';

export default function CalendarCard() {
  const [currentMonth, setCurrentMonth] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);

  const months = [
    'JANUARY',
    'FEBRUARY',
    'MARCH',
    'APRIL',
    'MAY',
    'JUNE',
    'JULY',
    'AUGUST',
    'SEPTEMBER',
    'OCTOBER',
    'NOVEMBER',
    'DECEMBER',
  ];

  const getDaysInMonth = (monthIndex) => {
    return new Date(2026, monthIndex + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (monthIndex) => {
    return new Date(2026, monthIndex, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => (prev > 0 ? prev - 1 : 11));
    console.log('이전 달');
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev < 11 ? prev + 1 : 0));
    console.log('다음 달');
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
    console.log(`날짜 선택: ${months[currentMonth]} ${day}, 2026`);
  };

  // 빈 칸 + 날짜 배열 생성
  const firstDay = getFirstDayOfMonth(currentMonth);
  const daysInMonth = getDaysInMonth(currentMonth);
  const blanks = Array(firstDay).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const calendarCells = [...blanks, ...days];

  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <button
          onClick={handlePrevMonth}
          style={{
            padding: '8px',
            width: '40px',
            height: '40px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            fontSize: '18px',
          }}
        >
          ←
        </button>
        <h3
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
          }}
        >
          {months[currentMonth]} 2026
        </h3>
        <button
          onClick={handleNextMonth}
          style={{
            padding: '8px',
            width: '40px',
            height: '40px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            fontSize: '18px',
          }}
        >
          →
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          border: '1px solid #d1d5db',
        }}
      >
        {/* 요일 헤더 */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            style={{
              textAlign: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              padding: '4px',
              color: '#4b5563',
              borderRight: '1px solid #d1d5db',
              borderBottom: '1px solid #d1d5db',
              backgroundColor: '#f9fafb',
            }}
          >
            {day}
          </div>
        ))}

        {/* 날짜 칸들 */}
        {calendarCells.map((day, index) => (
          <div
            key={index}
            style={{
              borderRight: '1px solid #d1d5db',
              borderBottom: '1px solid #d1d5db',
              minHeight: '20px',
              padding: '4px',
              backgroundColor: day
                ? selectedDate === day
                  ? '#dbeafe'
                  : 'white'
                : '#f9fafb',
              cursor: day ? 'pointer' : 'default',
              position: 'relative',
            }}
            onClick={() => day && handleDateClick(day)}
          >
            {day && (
              <>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: selectedDate === day ? 'bold' : 'normal',
                  }}
                >
                  {day}
                </div>
                {day % 7 === 1 && (
                  <div
                    style={{
                      width: '24px',
                      height: '16px',
                      backgroundColor: '#9ca3af',
                      borderRadius: '4px',
                      marginTop: '8px',
                    }}
                  ></div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
