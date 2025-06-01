package scan

type Occurrence struct {
	Pattern  string `json:"pattern"`
	Position int    `json:"position"`
	Line     int    `json:"line"`
	Column   int    `json:"column"`
}

func Process(file []byte, patterns []string) []Occurrence {
	return processInParallel(file, patterns)
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
