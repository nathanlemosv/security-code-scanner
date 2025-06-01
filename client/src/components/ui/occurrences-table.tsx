import { ButtonGroup, IconButton, Pagination, Stack, Table} from "@chakra-ui/react"
import { useState } from "react"
import type {Occurrence} from "../types/occurrence.ts";
import {LuChevronLeft, LuChevronRight} from "react-icons/lu";

interface OccurrencesTableProps {
    occurrences: Occurrence[]
}
// TODO: (ScanTable&OccurrenceTable) abstract in 1 component to avoid code duplicity
const OccurrencesTable = ({ occurrences }: OccurrencesTableProps) => {
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 5
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const currentOccurrences = occurrences.slice(startIndex, endIndex)
    const totalPages = Math.ceil(occurrences.length / pageSize)

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
                <Table.Header position="sticky">
                    <Table.Row>
                        <Table.ColumnHeader>Pattern</Table.ColumnHeader>
                        <Table.ColumnHeader>Position</Table.ColumnHeader>
                        <Table.ColumnHeader>Line</Table.ColumnHeader>
                        <Table.ColumnHeader>Column</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {currentOccurrences.map((occurrence: Occurrence, index: number) => (
                        <Table.Row key={startIndex + index}>
                            <Table.Cell>{occurrence.pattern}</Table.Cell>
                            <Table.Cell>{occurrence.position}</Table.Cell>
                            <Table.Cell>{occurrence.line}</Table.Cell>
                            <Table.Cell>{occurrence.column}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>

            {occurrences.length > pageSize && (
                <Pagination.Root
                    count={occurrences.length}
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

export default OccurrencesTable