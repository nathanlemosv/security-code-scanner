package scan

import (
	"encoding/json"
	"os"
)

func Handle(scanType string, file []byte) ([]Occurrence, error) {
	patterns, err := setPatterns(scanType)
	if err != nil {
		return []Occurrence{}, err
	}
	return Process(file, patterns), nil
}

// TODO: optimize
func setPatterns(scanType string) ([]string, error) {
	scanTypes, err := loadScanTypes()
	if err != nil {
		return []string{}, err
	}
	if scanType == "full" {
		var allPatterns []string
		for _, patterns := range scanTypes {
			allPatterns = append(allPatterns, patterns...)
		}
		return allPatterns, nil
	}
	return scanTypes[scanType], nil
}

func loadScanTypes() (map[string][]string, error) {
	data, err := os.ReadFile("../scan-types.json")
	if err != nil {
		return map[string][]string{}, err
	}
	var scanTypes map[string][]string
	err = json.Unmarshal(data, &scanTypes)
	if err != nil {
		return map[string][]string{}, err
	}
	return scanTypes, nil
}
