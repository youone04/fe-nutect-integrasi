import { Card } from 'react-bootstrap';

const Sidebar = () => {
  return (
    <div className="col-sm-3 d-none d-sm-block">
      <Card className='dashboard-admin' style={{height: 'auto'}}>
        <Card.Body>
        <h2>Admin</h2>
        <hr/>
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="#section1">Dashboard</a>
              </li>
              <hr/>
              <li className="nav-item">
                <a className="nav-link" href="#section2">Age</a>
              </li>
              <hr/>
              <li className="nav-item">
                <a className="nav-link" href="#section3">Gender</a>
              </li>
              <hr/>
              <li className="nav-item">
                <a className="nav-link" href="#section4">Geo</a>
              </li>
              <hr/>
            </ul>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Sidebar;