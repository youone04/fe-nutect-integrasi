import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormInputBarang from './FormInputBarang';

const  ModalInputBarang = (props)  => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         Tambah Barang
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormInputBarang
        onHide={props.onHide}
        getData={props.getData}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant={'danger'} onClick={props.onHide}>Keluar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalInputBarang;
