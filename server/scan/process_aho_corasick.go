package scan

import "strings"

type TrieNode struct {
	children map[rune]*TrieNode
	failure  *TrieNode
	output   []string
}

type AhoCorasick struct {
	root *TrieNode
}

func NewAhoCorasick() *AhoCorasick {
	return &AhoCorasick{
		root: &TrieNode{
			children: make(map[rune]*TrieNode),
			output:   []string{},
		},
	}
}

func (ac *AhoCorasick) AddPattern(pattern string) {
	node := ac.root
	for _, char := range strings.ToLower(pattern) {
		if _, exists := node.children[char]; !exists {
			node.children[char] = &TrieNode{
				children: make(map[rune]*TrieNode),
				output:   []string{},
			}
		}
		node = node.children[char]
	}
	node.output = append(node.output, pattern)
}

func (ac *AhoCorasick) BuildFailureLinks() {
	var queue []*TrieNode
	for _, child := range ac.root.children {
		child.failure = ac.root
		queue = append(queue, child)
	}
	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]
		for char, child := range current.children {
			queue = append(queue, child)
			failure := current.failure
			for failure != nil && failure.children[char] == nil {
				failure = failure.failure
			}
			if failure != nil {
				child.failure = failure.children[char]
				child.output = append(child.output, child.failure.output...)
			} else {
				child.failure = ac.root
			}
		}
	}
}

func processAhoCorasick(file []byte, patterns []string) []Occurrence {
	ac := NewAhoCorasick()
	for _, pattern := range patterns {
		ac.AddPattern(pattern)
	}
	ac.BuildFailureLinks()
	var occurrences []Occurrence
	fileStr := strings.ToLower(string(file))
	node := ac.root
	for i, char := range fileStr {
		for node != ac.root && node.children[char] == nil {
			node = node.failure
		}
		if node.children[char] != nil {
			node = node.children[char]
		}
		for _, pattern := range node.output {
			line, column := getLineColumn(file, i-len([]rune(strings.ToLower(pattern)))+1)
			occurrences = append(occurrences, Occurrence{
				Pattern:  pattern,
				Position: i - len([]rune(strings.ToLower(pattern))) + 1,
				Line:     line,
				Column:   column,
			})
		}
	}
	return occurrences
}
