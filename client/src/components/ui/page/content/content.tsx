import './content.css'
import { useState } from "react";
import type { Scan } from "../../../types/scan.ts";
import SelectFilesToScanButton from "../../select-files-button.tsx";
import ScanTable from "../../scan-table.tsx";
import ScanConfigSelect from "../../scan-config-select.tsx";

function Content() {
    const [selectedFilesToScan, setSelectedFilesToScan] = useState<Scan[]>([]);
    const handleFilesChange = (scan: Scan[]) => {
        setSelectedFilesToScan(scan);
    }
    const handleConfigChange = (config: string) => {
        console.log('config:', config)
    }
    return (
        <div className="content">
            <div className="table">
                <ScanTable scans={ selectedFilesToScan }/>
            </div>
            <div className="actions">
                <SelectFilesToScanButton onFilesSelected={ handleFilesChange }/>
                <ScanConfigSelect onConfigSelected={ handleConfigChange }></ScanConfigSelect>
            </div>
        </div>
    )
}
export default Content