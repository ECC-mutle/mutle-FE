export default function profileCard() {
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '10px',
        boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
      }}
    >
      <div
        style={{
          width: '128px',
          height: '80px',
          background: 'linear-gradient(to bottom right, #fb923c, #9333ea)',
          borderRadius: '8px',
          margin: '0 auto 16px',
        }}
      ></div>
      <h2
        style={{
          fontSize: '20px',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        홍길동
      </h2>
      <p
        style={{
          textAlign: 'center',
          color: '#4b5563',
        }}
      >
        프로필 샘플입니다
      </p>
    </div>
  );
}
