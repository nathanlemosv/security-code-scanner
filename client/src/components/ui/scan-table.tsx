import { ButtonGroup, IconButton, Pagination, Stack, Table } from "@chakra-ui/react"
import { useState } from "react"
import type {Scan} from "../types/scan.ts";
import OccurrencesModal from "./occurrences-modal.tsx";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface TableProps {
    scans: Scan[]
}
// TODO: (ScanTable&OccurrenceTable) abstract in 1 component to avoid code duplicity
const ScanTable = ({scans}: TableProps) => {
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 5
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const currentScans = scans.slice(startIndex, endIndex)
    const totalPages = Math.ceil(scans.length / pageSize)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    return (
        <Stack width="full" gap="5">
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader textAlign="center">Name</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="center">Size</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="center">Occurrences</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {currentScans.map((scan: Scan) => (
                        <Table.Row key={scan.file.name}>
                            <Table.Cell>{scan.file.name}</Table.Cell>
                            <Table.Cell>{(scan.file.size / 1024)} kb</Table.Cell>
                            <Table.Cell className="occurrences">{
                                scan.occurrences ? <OccurrencesModal scan={ scan }/> : <img className="no-occurrences" src="/no.png" alt="no occurrences"/>
                            }</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>

            {scans.length > pageSize && (
                <Pagination.Root
                    count={scans.length}
                    pageSize={pageSize}
                    page={currentPage}
                    onPageChange={(details) => handlePageChange(details.page)}
                >
                    <ButtonGroup variant="ghost" size="sm" wrap="wrap">
                        <Pagination.PrevTrigger asChild>
                            <IconButton
                                onClick={handlePrevious}
                                disabled={currentPage === 1}
                            >
                                <LuChevronLeft />
                            </IconButton>
                        </Pagination.PrevTrigger>
                        <Pagination.Items
                            render={(page) => (
                                <IconButton
                                    variant={page.value === currentPage ? "outline" : "ghost"}
                                    onClick={() => handlePageChange(page.value)}
                                >
                                    {page.value}
                                </IconButton>
                            )}
                        />
                        <Pagination.NextTrigger asChild>
                            <IconButton
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                            >
                                <LuChevronRight />
                            </IconButton>
                        </Pagination.NextTrigger>
                    </ButtonGroup>
                </Pagination.Root>
            )}
        </Stack>
    )
}

export default ScanTable