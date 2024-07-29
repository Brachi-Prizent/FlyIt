import './Station.css'
export const Station = (props) => {
  debugger
  const station = props.props;

  return (<>
    <div className='s'>
      <h1>this flight has stations:</h1>
      <table className="flights">
        <tr>
          <th>chronologicalOrder</th>
          <th>place</th>
          <th>stayTime</th>
        </tr>
        {station.map((x) =>
          <tr>
            <td>{x.chronologicalOrder}</td>
            <td>{x.namePlace}</td>
            <td>{x.stayTime}</td>
          </tr>
        )}
      </table></div>
  </>)
}