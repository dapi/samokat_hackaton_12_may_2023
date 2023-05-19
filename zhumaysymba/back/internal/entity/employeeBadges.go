package entity

import "github.com/somnoynadno/zhumaysynba/internal/base"

type EmployeeBadges struct {
	base.Entity

	BadgeID    uint
	Badge      *Badge
	EmployeeID uint
	Employee   *Employee

	IssuerID uint // Кто выдал достижение, если выдает админ
	Issuer   *Employee
}
