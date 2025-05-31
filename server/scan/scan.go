package scan

import "strings"

type Occurrence struct {
	Pattern  string `json:"pattern"`
	Position int    `json:"position"`
	Line     int    `json:"line"`
	Column   int    `json:"column"`
}

// TODO: optimize
func Process(file []byte, patterns []string) []Occurrence {
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

func getLineColumn(file []byte, position int) (int, int) {
	line := 1
	column := 1
	for i := 0; i < position; i++ {
		if file[i] == '\n' {
			line++
			column = 1
		} else {
			column++
		}
	}
	return line, column
}
