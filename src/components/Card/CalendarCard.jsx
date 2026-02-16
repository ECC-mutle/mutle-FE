import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CalendarCard({ calendarData = [], isClickable }) {
  const navigate = useNavigate();

  // 1. 시작일을 무조건 이번 달로 설정
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [musicData, setMusicData] = useState({});

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

  // 부모에게 전달받은 데이터만 가공
  useEffect(() => {
    console.log('--- 캘린더 데이터 수신 ---');
    console.log('부모가 준 원본 배열:', calendarData);
    const mapped = {};
    calendarData.forEach((item) => {
      const dateKey = item.date.split('T')[0];
      mapped[dateKey] = {
        bottleId: item.bottleId,
        artworkUrl60: item.artworkUrl60,
      };
    });
    setMusicData(mapped);
  }, [calendarData]); // 부모가 데이터를 주면 자동으로 실행됨

  // 달력 날짜 계산 로직
  const daysInMonth = new Date(2026, currentMonth + 1, 0).getDate();
  const firstDay = new Date(2026, currentMonth, 1).getDay();
  const calendarCells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const handlePrevMonth = () =>
    setCurrentMonth((prev) => (prev > 0 ? prev - 1 : 11));
  const handleNextMonth = () =>
    setCurrentMonth((prev) => (prev < 11 ? prev + 1 : 0));

  const handleDateClick = (day) => {
    if (!day) return;

    // 클릭한 칸의 날짜 키 조립 (ex: 2026-02-15)
    const dateKey = `2026-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const bottleInfo = musicData[dateKey];

    setSelectedDate(day);

    if (bottleInfo?.bottleId) {
      if (isClickable) {
        // '나'이거나 '친구'인 경우 -> 상세 페이지로 이동
        navigate(`/bottles/${bottleInfo.bottleId}`);
      } else {
        // 친구가 아닌 경우 -> 알림창
        alert('친구가 되어야 유리병 속 이야기를 볼 수 있어요! 🏝️');
      }
    }
  };

  return (
    <div style={styles.container}>
      {/* 헤더 섹션 */}
      <div style={styles.header}>
        <button onClick={handlePrevMonth} style={styles.navButton}>
          ←
        </button>
        <h3 style={styles.title}>{months[currentMonth]} 2026</h3>
        <button onClick={handleNextMonth} style={styles.navButton}>
          →
        </button>
      </div>

      {/* 요일 헤더 */}
      <div style={styles.grid}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} style={styles.weekdayHeader}>
            {d}
          </div>
        ))}

        {/* 날짜 그리드 */}
        {calendarCells.map((day, index) => {
          const dateKey = day
            ? `2026-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            : null;
          const bottleInfo = dateKey ? musicData[dateKey] : null;

          return (
            <div
              key={index}
              onClick={() => handleDateClick(day)}
              style={{
                ...styles.dayCell,
                backgroundColor: day
                  ? selectedDate === day
                    ? '#F0F7FF'
                    : 'white'
                  : '#F9FAFB',
                cursor: day ? 'pointer' : 'default',
              }}
            >
              {day && (
                <>
                  <span style={styles.dayNumber}>{day}</span>
                  {bottleInfo && (
                    <div style={styles.albumWrapper}>
                      <img
                        src={bottleInfo.artworkUrl60}
                        alt='album'
                        style={{
                          ...styles.albumArt,
                          filter: isClickable ? 'none' : 'grayscale(0.5)',
                        }}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 🎨 스타일 분리
const styles = {
  container: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1A1A1A',
    margin: 0,
  },
  navButton: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#666',
    padding: '5px 10px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '1px',
    backgroundColor: '#EDF0F3', // 그리드 선 색상
    border: '1px solid #EDF0F3',
  },
  weekdayHeader: {
    textAlign: 'center',
    fontSize: '11px',
    fontWeight: '600',
    color: '#999',
    padding: '8px 0',
    backgroundColor: '#F9FAFB',
    textTransform: 'uppercase',
  },
  dayCell: {
    minHeight: '70px',
    padding: '6px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    transition: 'background-color 0.2s',
  },
  dayNumber: {
    fontSize: '12px',
    color: '#333',
    marginBottom: '4px',
  },
  albumWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2px',
  },
  albumArt: {
    width: '32px',
    height: '32px',
    borderRadius: '4px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
    objectFit: 'cover',
  },
};
