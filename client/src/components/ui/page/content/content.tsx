import './content.css'
import SelectFilesToScanButton from "../../select-files-to-scan-button.tsx";
import {useState} from "react";
import type {Scan} from "../../../types/scan.ts";
import ScanTable from "../../scan-table.tsx";

function Content() {
    const [selectedFilesToScan, setSelectedFilesToScan] = useState<Scan[]>([]);
    const handleFilesChange = (scan: Scan[]) => {
        setSelectedFilesToScan(scan);
    }
    return (
        <div className="content">
            <div className="table">
                <ScanTable scans={ selectedFilesToScan }/>
            </div>
            <div className="actions">
                <SelectFilesToScanButton onFilesSelected={ handleFilesChange }/>
            </div>
        </div>
    )
}
export default Content