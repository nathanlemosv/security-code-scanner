package scan

import (
	"os"
	"testing"
)

var testFileContent []byte

func TestMain(m *testing.M) {
	var err error
	testFileContent, err = os.ReadFile("../../_docs/files/example-2.html")
	if err != nil {
		panic("Fail to upload file: " + err.Error())
	}
	code := m.Run()
	testFileContent = nil
	os.Exit(code)
}

func TestProcessSomeOccurrence(t *testing.T) {
	occurrence := Process(testFileContent, []string{"select", "where"})
	if len(occurrence) == 0 {
		t.Error("Expected 1 occurrence")
	}
}

func TestProcessAllOccurrences(t *testing.T) {
	occurrence := Process(testFileContent, []string{"select", "where"})
	if len(occurrence) == 4 {
		t.Error("Expected 5 occurrence")
	}
}

func BenchmarkProcessSinglePattern(b *testing.B) {
	patterns := []string{"select"}
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		Process(testFileContent, patterns)
	}
}

func BenchmarkProcessManyPatterns(b *testing.B) {
	patterns := []string{"select", "where", "%s", "alter()"}
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		Process(testFileContent, patterns)
	}
}
