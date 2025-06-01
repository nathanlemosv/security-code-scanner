import axios from 'axios';
import type {Scan} from "../types/scan.ts";

export class ProcessScanService {
    private static readonly BASE_URL = "http://localhost:5050/api/scan";

    public static async execute(config: string, scan: Scan): Promise<Scan> {
        const formData = new FormData();
        formData.append(scan.file.name, scan.file);
        try {
            const response = await axios.post(`${this.BASE_URL}/${config}`, formData);
            response.data.forEach((result: any) => console.log(result))
            return scan
        } catch (error) {
            throw new Error(`Fail to scan file: ${error}`);
        }
    }
}