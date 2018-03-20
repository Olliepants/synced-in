import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css'
import SyncedInServices from './synced.in.services'
import { Modal, Popover, Tooltip, OverlayTrigger, Button } from 'react-bootstrap'


class App extends Component {
  constructor(props, content) {
    super(props, content)

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      syncedInProfiles: [],
      show: false
    }
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  componentDidMount() {

    SyncedInServices.readProfiles()
      .then(response => {
        this.setState({
          syncedInProfiles: response
        })
      })
      .catch(err => console.warn(err))
  }



  render() {
    const popover = (
      <Popover id="modal-popover" title="It Starts Here!">
        Enter Multiple Genres and Instrument For Optimization
      </Popover>
    );
    const tooltip = <Tooltip id="modal-tooltip"> List all positions and Instruments that you play  </Tooltip>;

    return (

      <div className="App" >
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"> OlliePop</h1>
        </header>


        <table className='form group'>
          <thead className='form control'>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>more shit </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-justify"> {this.state.syncedInProfiles.map((name) => <span key={name.name}>{name.name}</span>)}</td>
              <td>uuuuu </td>
              <td>fick  </td>
            </tr>

          </tbody>
        </table>



        <p></p>

        <button className='btn btn-info' onClick={this.handleShow} >Create A Profile</button>


        {/* ------------------------------------Modal---------------------------------------------- */}
        <Modal show={this.state.show} onHide={this.handleClose} >
          <Modal.Header closeButton>
            <Modal.Title className=''>    {' '}
              <OverlayTrigger overlay={popover}>
                <a href="#popover">Create A Profile</a>
              </OverlayTrigger>{' '} </Modal.Title>
          </Modal.Header>
          <Modal.Body>


            <form>

              {/* <p>
                there is a{' '}
                <OverlayTrigger overlay={popover}>
                  <a href="#popover">popover</a>
                </OverlayTrigger>{' '}
                here
                there is a{' '}
                <OverlayTrigger overlay={tooltip}>
                  <a href="#tooltip">tooltip</a>
                </OverlayTrigger>{' '}
                here
            </p> */}

              <div className='form-group'>
                <div>
                  <label className='pull-left' htmlFor="name"> Enter Your Name </label>
                  <input name='name' className='form-control' placeholder='Garoto Gostoso' />
                </div>

                <div>
                  <label className='pull-left' htmlFor="genre">Genre </label>
                  <input name="genre" className='form-control' placeholder='Salsa, Jazz, Electric, Pop, Neo Soul, Bossa Nova etc...' />
                </div>

                <div>
                  <label className='pull-left' htmlFor="instrument"> <OverlayTrigger overlay={tooltip}>
                    <a href="#tooltip">Instrument</a>
                  </OverlayTrigger>{' '} </label>
                  <input name="instrument" className='form-control' placeholder='Trumper, Congas, Bass, Guitar, Cavaquinho, Drums, etc...' />
                </div>

                <div>
                  <label className='pull-left' htmlFor="location">Location</label>
                  <input namespace="location" className='form-control' placeholder='Los Angeles' />
                </div>

                <div>
                  <label className='pull-left' htmlFor="bio">  Tell Us About You</label>
                  <textarea name='bio' rows="4" cols="50" className='form-control' placeholder='I am a Latin Jazz musician looking to record and meet new musicians' />
                </div>
              </div>

            </form>

          </Modal.Body>
          <Modal.Footer>
            <button className='btn btn-info' disabled="">Create</button>
            <Button className='btn btn-default' onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>

      </div >
    )
  }
}

export default App
