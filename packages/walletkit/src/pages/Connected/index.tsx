import { Navbar } from '../../components/Navbar';
import { ModalBody } from '../../components/base/Modal/ModalBody';
import { ModalHeader } from '../../components/base/Modal/ModalHeader';

export function ConnectedPage() {
  return (
    <>
      <Navbar />
      <ModalHeader>Connected</ModalHeader>
      <ModalBody></ModalBody>
    </>
  );
}
