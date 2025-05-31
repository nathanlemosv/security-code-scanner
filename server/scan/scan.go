package scan

type Item struct {
	ID     string  `json:"id"`
	Name   string  `json:"name"`
	Price  float64 `json:"price"`
	Status bool    `json:"status"`
}

var Items = []Item{
	{ID: "1", Name: "Item 1", Price: 19.99, Status: true},
	{ID: "2", Name: "Item 2", Price: 29.99, Status: false},
	{ID: "3", Name: "Item 3", Price: 39.99, Status: true},
}
