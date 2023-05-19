package filter

import (
	"github.com/somnoynadno/zhumaysynba/internal/base"
	"github.com/somnoynadno/zhumaysynba/internal/server/processing/enum"
)

func GetFilterRules(
	baseStruct interface{},
	objectName string,
	customRules map[string]map[string]enum.ValidateType) map[string]map[string]enum.ValidateType {

	rulesMap := map[string]map[string]enum.ValidateType{}

	switch baseStruct.(type) {
	case base.Entity:
		rulesMap[objectName] = map[string]enum.ValidateType{
			"id":         enum.TYPE_INT,
			"created_at": enum.TYPE_DATA,
			"updated_at": enum.TYPE_DATA,
			"deleted_at": enum.TYPE_DATA,
		}
	}

	for key, value := range customRules {
		if key == objectName {
			for nameColumn, typeColumn := range value {
				rulesMap[objectName][nameColumn] = typeColumn
			}
		} else {
			rulesMap[key] = value
		}
	}

	return rulesMap
}
