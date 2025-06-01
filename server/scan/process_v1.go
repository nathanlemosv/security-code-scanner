package scan

import "strings"

func processV1(file []byte, patterns []string) []Occurrence {
	var occurrences []Occurrence
	fileStr := strings.ToLower(string(file))
	for _, pattern := range patterns {
		patternLower := strings.ToLower(pattern)
		for i := 0; i <= len(fileStr)-len(patternLower); i++ {
			if strings.HasPrefix(fileStr[i:], patternLower) {
				line, column := getLineColumn(file, i)
				occurrences = append(occurrences, Occurrence{
					Pattern:  pattern,
					Position: i,
					Line:     line,
					Column:   column,
				})
			}
		}
	}
	return occurrences
}
