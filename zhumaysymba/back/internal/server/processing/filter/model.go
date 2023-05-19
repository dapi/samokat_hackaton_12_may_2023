package filter

import (
	"errors"
	"fmt"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing/enum"
	"strconv"
	"strings"
)

const (
	OperatorEquality      = "[eq]"  // =
	OperatorNotEquality   = "[ne]"  // !=
	OperatorLowerThan     = "[lt]"  // <
	OperatorLowerThanEq   = "[lte]" // <=
	OperatorGreaterThan   = "[gt]"  // >
	OperatorGreaterThanEq = "[gte]" // >=
)

type Options struct {
	IsToApply bool
	Fields    []Field
}

type Field struct {
	Name     string
	Value    string
	Operator string
	Type     enum.ValidateType
}

func (o *Options) AddField(name, value, operator string) {
	name = strings.TrimSpace(name)
	value = strings.TrimSpace(value)
	o.Fields = append(o.Fields, Field{
		Name:     name,
		Value:    value,
		Operator: operator,
	})
}

func (o *Options) ValidateField(filterRules map[string]map[string]enum.ValidateType) error {

	columnRules := make(map[string]struct {
		NameTable string
		Type      enum.ValidateType
	})

	for nameTable, rules := range filterRules {
		for nameColumn, typeColumn := range rules {
			columnRules[nameColumn] = struct {
				NameTable string
				Type      enum.ValidateType
			}{NameTable: nameTable, Type: typeColumn}
		}
	}

	for index, value := range o.Fields {
		switch columnRules[value.Name].Type {
		case enum.TYPE_INT:
			o.Fields[index].Name = columnRules[value.Name].NameTable + "." + value.Name
			o.Fields[index].Type = enum.TYPE_INT

		case enum.TYPE_STRING:
			o.Fields[index].Name = columnRules[value.Name].NameTable + "." + value.Name
			o.Fields[index].Type = enum.TYPE_STRING

		case enum.TYPE_BOOL:
			o.Fields[index].Name = columnRules[value.Name].NameTable + "." + value.Name
			o.Fields[index].Type = enum.TYPE_BOOL

		default:
			return fmt.Errorf("incorrect filtering field: %s", value.Name)
		}
	}

	return nil
}

func (o *Options) CreateConditionsFilter() (map[string]interface{}, error) {
	mapConditionsFilter := make(map[string]interface{})

	for _, field := range o.Fields {
		addCondition, value, err := conversionType(field.Value, field.Type)
		if err != nil {
			return nil, err
		}
		mapConditionsFilter[fmt.Sprintf("%s %s ?%s", field.Name, field.Operator, addCondition)] = value
	}
	return mapConditionsFilter, nil
}

func conversionType(value string, _type enum.ValidateType) (string, interface{}, error) {
	switch _type {
	case enum.TYPE_DATA:
		return "::timestamp", value, nil

	case enum.TYPE_INT:
		valueInt, err := strconv.ParseInt(value, 10, 64)
		if err != nil {
			return "", valueInt, nil
		} else {
			return "", nil, err
		}

	case enum.TYPE_STRING:
		return "", value, nil

	case enum.TYPE_BOOL:
		return "::boolean", value, nil

	default:
		return "", nil, errors.New("not type")
	}
}
