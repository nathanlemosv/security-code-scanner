import { useState } from 'react';
import { Button, VStack, Spinner } from '@chakra-ui/react';
import type { Scan } from "../types/scan.ts";
import { ProcessScanService } from "../services/process-scan.service.ts";

interface ScanButtonProps {
    scanConfig: string
    scans: Scan[];
    onScanComplete: (updatedScans: Scan[]) => void;
}

const ScanButton = ({ scanConfig, scans, onScanComplete }: ScanButtonProps) => {
    const [loading, setLoading] = useState(false);

    const handleScan = async () => {
        setLoading(true);
        try {
            const updatedScans = await Promise.all(
                scans.map(scan => ProcessScanService.execute(scanConfig, scan))
            );
            onScanComplete(updatedScans);
        } catch (error) {
            console.error('scan process failure:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <VStack align="start">
            <Button
                onClick={handleScan}>
                {loading ? <Spinner size="sm" mr={2}/> : null}
                {loading ? 'Scanning...' : 'Scan'}
            </Button>
        </VStack>
    );
};

export default ScanButton;