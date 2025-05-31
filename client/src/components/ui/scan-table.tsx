import { Table } from "@chakra-ui/react"
import type {Scan} from "../types/scan.ts";

interface TableProps {
    scans: Scan[]
}

const ScanTable = ({scans}: TableProps) => {
    return (
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader>Name</Table.ColumnHeader>
                    <Table.ColumnHeader>Size</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {scans.map((scan: Scan) => (
                    <Table.Row key={scan.file.name}>
                        <Table.Cell>{scan.file.name}</Table.Cell>
                        <Table.Cell>{(scan.file.size / 1024)} kb</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    )
}

export default ScanTable