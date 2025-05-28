const EventSelection = ({ events, onSelect }) => (
    <div>
      <h2>Chọn Sự Kiện</h2>
      <ul>
        {events.map(event => (
          <li key={event.event_id}>
            <button onClick={() => onSelect(event)}>{event.name} - {event.time}</button>
          </li>
        ))}
      </ul>
    </div>
  );
  
  export default EventSelection;