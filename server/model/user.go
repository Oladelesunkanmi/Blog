package model

type User struct {
	ID       uint   `json:"id" gorm:"primaryKey"`
	Email    string `json:"email" gorm:"not null;unique;column:email"`
	Password string `json:"password" gorm:"not null;column:password"`
}
