package utils

import (
	"fmt"
	"strconv"
)

// ConvertToInt ensures that the field is converted to int if it is string
func ConvertToInt(field interface{}) int {
	switch v := field.(type) {
	case string:
		intVal, err := strconv.Atoi(v)
		if err != nil {
			return 0
		}
		return intVal
	case int:
		return v
	case int32:
		return int(v)
	case float64:
		return int(v)
	default:
		fmt.Printf("Unknown type: %T, value: %v\n", v, v)
		return 0
	}
}

// ConvertToFloat ensures that the field is converted to float64 if it is string
func ConvertToFloat(field interface{}) float64 {
	switch v := field.(type) {
	case string:
		floatVal, err := strconv.ParseFloat(v, 64)
		if err != nil {
			return 0
		}
		return floatVal
	case float64:
		return v
	case int:
		return float64(v)
	default:
		fmt.Printf("Unknown type: %T, value: %v\n", v, v)
		return 0
	}
}
