import {Button, IconButton, useDisclosure} from "@chakra-ui/react";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay
} from "@chakra-ui/modal";
import type {Scan} from "../types/scan.ts";
import OccurrencesTable from "./occurrences-table.tsx";
import {useColorModeValue} from "./color-mode.tsx";

interface OccurrencesModalProps {
    scan: Scan;
}

const OccurrencesModal = ({ scan }: OccurrencesModalProps) => {
    const { open, onOpen, onClose } = useDisclosure()
    return (
        <>
            <IconButton onClick={onOpen}>
                <img className="no-occurrences" src="/att.png" alt="no occurrences"/>
            </IconButton>
            <div className={ "occurrences-modal"}>
                <Modal isOpen={open} size={ "lg" } onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalBody display="flex">
                            <OccurrencesTable occurrences={ scan.occurrences! }/>
                        </ModalBody>
                        <ModalFooter>
                            <Button  color={useColorModeValue("black", "white")} mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>

        </>
    )
}

export default OccurrencesModal;