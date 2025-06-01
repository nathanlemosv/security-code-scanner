import {Button, useDisclosure} from "@chakra-ui/react";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/modal";
import type {Scan} from "../types/scan.ts";
import OccurrencesTable from "./occurrences-table.tsx";

interface OccurrencesModalProps {
    scan: Scan;
}

const OccurrencesModal = ({ scan }: OccurrencesModalProps) => {
    const { open, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button onClick={onOpen}>{ scan.occurrences!.length }</Button>
            <Modal isOpen={open} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Scan Occurrences</ModalHeader>
                    <ModalBody>
                        <OccurrencesTable occurrences={ scan.occurrences! }/>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default OccurrencesModal;