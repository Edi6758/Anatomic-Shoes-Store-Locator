import React from 'react'

const StoreCard = ({ ...item }) => {
  return (
    <li className="store-card">
      <div className="store-card__content">
        <div className="store-card__left">
          <h3>Store Info</h3>
          <p className="name">{item.name}</p>
          <p className="address">
            {item.address} <br />
            {item.city} <br />
            {item.postalCode} <br />
            {item.number}
          </p>
          <p className="city" />
          <p />
        </div>
        <div className="store-card__right">
          <h3>Opening Times</h3>
          <p className="working-days">{item.workingInterval}</p>
          <div className="store-card__shifts">
            <p className="working-days">
              {item.workingDays &&
                item.workingDays.length > 0 &&
                item.workingDays.map((workingDay, i) => (
                  <span key={i}>
                    {workingDay}
                    <br />
                  </span>
                ))}
            </p>
            <p className="working-hours">
              {item.workingHours &&
                item.workingHours.length > 0 &&
                item.workingHours.map((workingHour, i) => (
                  <span key={i}>
                    {workingHour}
                    <br />
                  </span>
                ))}
            </p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default StoreCard
