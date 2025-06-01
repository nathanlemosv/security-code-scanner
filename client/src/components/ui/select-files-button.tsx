import * as React from "react";
import { useRef } from 'react';
import { Button, type ButtonProps } from '@chakra-ui/react';
import type {Scan} from "../types/scan.ts";


interface SelectFilesButtonProps extends Omit<ButtonProps, 'onClick'> {
    onFilesSelected: (scans: Scan[]) => void
}

const SelectFilesToScanButton = ({
                               onFilesSelected
                           }: SelectFilesButtonProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return
        const files: File[] = Array.from(event.target.files)
        onFilesSelected(files.map(file => ({file})));
    };
    return (
        <>
            <input
                className="select-files-input"
                ref={fileInputRef}
                type="file"
                multiple={true}
                onChange={handleFileChange}
            />
            <Button
                onClick={handleButtonClick}>
                Select Files
            </Button>
        </>
    );
};

export default SelectFilesToScanButton;