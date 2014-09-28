# Recipes:

## Description

This package allows you to create recipes for home brew.

## **Recipe** Model

- **Title:** Title of Recipe
	- type : String
- **Description:** Description of Beer
	- type : String
- **Type:** Type of Beer
	- type : String
- **ABV:** Alcohol By Volume
	- type : Number (Percentage)
- **O.G.:** Original Gravity
	- type : Number
- **F.G.:** Final Gravity
	- type : Number
- **Stages:**
	- type : [ Stage ]
- **Instructions:**
	- type : String

## **Stage** Model

- **Name:** Name of stage
	- type : String
- **Ingredients:**
	- type : [ Ingredient ]
- **Notes:**
	- type : String

## **Ingredient** Model

- **Name:** Name of ingredient
	- type : String
- **Type:** Type of ingredient
	- type : String
- **QTY:** QTY
	- number : Number
