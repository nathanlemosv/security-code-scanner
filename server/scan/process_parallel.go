package scan

import (
	"fmt"
	"runtime"
	"strings"
	"sync"
)

type Chunk struct {
	Data   []byte
	Start  int
	End    int
	Offset int
}

func processInParallel(file []byte, patterns []string) []Occurrence {
	numWorkers := runtime.NumCPU()
	maxPatternLen := 0
	for _, pattern := range patterns {
		if len(pattern) > maxPatternLen {
			maxPatternLen = len(pattern)
		}
	}
	chunks := createChunks(file, numWorkers, maxPatternLen)
	chunkChan := make(chan Chunk, len(chunks))
	resultChan := make(chan []Occurrence, len(chunks))
	var wg sync.WaitGroup
	for i := 0; i < numWorkers; i++ {
		wg.Add(1)
		go worker(chunkChan, resultChan, patterns, &wg)
	}
	for _, chunk := range chunks {
		chunkChan <- chunk
	}
	close(chunkChan)
	go func() {
		wg.Wait()
		close(resultChan)
	}()
	var allOccurrences []Occurrence
	for results := range resultChan {
		allOccurrences = append(allOccurrences, results...)
	}
	return removeDuplicates(allOccurrences)
}

func createChunks(file []byte, numChunks, overlap int) []Chunk {
	if numChunks <= 0 {
		numChunks = 1
	}
	fileSize := len(file)
	chunkSize := fileSize / numChunks
	var chunks []Chunk
	for i := 0; i < numChunks; i++ {
		start := i * chunkSize
		end := start + chunkSize
		if i == numChunks-1 {
			end = fileSize
		}
		if i < numChunks-1 && end+overlap < fileSize {
			end += overlap
		}
		chunks = append(chunks, Chunk{
			Data:   file[start:end],
			Start:  start,
			End:    end,
			Offset: start,
		})
	}
	return chunks
}

func worker(chunkChan <-chan Chunk, resultChan chan<- []Occurrence, patterns []string, wg *sync.WaitGroup) {
	defer wg.Done()
	for chunk := range chunkChan {
		occurrences := processChunk(chunk, patterns)
		resultChan <- occurrences
	}
}

func processChunk(chunk Chunk, patterns []string) []Occurrence {
	var occurrences []Occurrence
	chunkStr := strings.ToLower(string(chunk.Data))
	for _, pattern := range patterns {
		patternLower := strings.ToLower(pattern)
		for i := 0; i <= len(chunkStr)-len(patternLower); i++ {
			if strings.HasPrefix(chunkStr[i:], patternLower) {
				globalPos := chunk.Offset + i
				line, column := getLineColumn(chunk.Data, i)
				occurrences = append(occurrences, Occurrence{
					Pattern:  pattern,
					Position: globalPos,
					Line:     line,
					Column:   column,
				})
			}
		}
	}
	return occurrences
}

func removeDuplicates(occurrences []Occurrence) []Occurrence {
	seen := make(map[string]bool)
	var unique []Occurrence

	for _, occ := range occurrences {
		key := fmt.Sprintf("%s_%d", occ.Pattern, occ.Position)
		if !seen[key] {
			seen[key] = true
			unique = append(unique, occ)
		}
	}

	return unique
}
