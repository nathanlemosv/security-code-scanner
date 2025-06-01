import { Table } from "@chakra-ui/react"
import type {Occurrence} from "../types/occurrence.ts";

interface OccurrencesTableProps {
    occurrences: Occurrence[]
}

const OccurrencesTable = ({ occurrences }: OccurrencesTableProps) => {
    return (
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader>Pattern</Table.ColumnHeader>
                    <Table.ColumnHeader>Position</Table.ColumnHeader>
                    <Table.ColumnHeader>Line</Table.ColumnHeader>
                    <Table.ColumnHeader>Column</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {occurrences.map((occurrence: Occurrence, index: number) => (
                    <Table.Row key={index}>
                        <Table.Cell>{occurrence.pattern}</Table.Cell>
                        <Table.Cell>{occurrence.position}</Table.Cell>
                        <Table.Cell>{occurrence.line}</Table.Cell>
                        <Table.Cell>{occurrence.column}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    )
}

export default OccurrencesTable