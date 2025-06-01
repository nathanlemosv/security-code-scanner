import './content.css'
import { useState } from "react";
import type { Scan } from "../../../types/scan.ts";
import SelectFilesToScanButton from "../../select-files-button.tsx";
import ScanTable from "../../scan-table.tsx";
import ScanConfigSelect from "../../scan-config-select.tsx";
import ScanButton from "../../scan-button.tsx";

function Content() {
    const [selectedFilesToScan, setSelectedFilesToScan] = useState<Scan[]>([]);
    const [selectedConfig, setSelectedConfig] = useState<string>('full');
    const handleFilesChange = (scan: Scan[]) => {
        setSelectedFilesToScan(scan);
    }
    const handleConfigChange = (config: string) => {
        setSelectedConfig(config);
    }
    const handleScanComplete = (updatedScans: Scan[]) => {
        setSelectedFilesToScan(updatedScans);
    }
    return (
        <div className="content">
            <div className="table">
                <ScanTable scans={ selectedFilesToScan }/>
            </div>
            <div className="actions">
                <SelectFilesToScanButton onFilesSelected={ handleFilesChange }/>
                <ScanConfigSelect onConfigSelected={ handleConfigChange }></ScanConfigSelect>
                <ScanButton scanConfig={ selectedConfig } scans={ selectedFilesToScan } onScanComplete={ handleScanComplete }/>
            </div>
        </div>
    )
}
export default Content