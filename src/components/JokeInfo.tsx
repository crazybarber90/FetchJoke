import React from 'react'

const JokeInfo = ({ data, label }: { data: any; label: string }) => {
  return (
    <div
      style={{
        width: '100%',
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <label style={{ fontSize: '14px' }}>{label} :</label>
      <p style={{ fontSize: '16px', fontWeight: 'bold', width: '75%' }}>
        {data}
      </p>
    </div>
  )
}

export default JokeInfo
